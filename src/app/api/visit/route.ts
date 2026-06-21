import { NextRequest, NextResponse } from 'next/server';

const getRedis = () => {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  return { url, token };
};

async function redisCommand(url: string, token: string, command: any[]) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
  });
  return res.json();
}

export async function GET(req: NextRequest) {
  try {
    const { url, token } = getRedis();
    if (!url || !token) {
      return NextResponse.json({ success: false, error: 'KV Config Missing' }, { status: 500 });
    }

    // Get the list of recent session IDs (up to 200)
    const listRes = await redisCommand(url, token, ['LRANGE', 'portfolio_sessions_list', '0', '199']);
    const sessionIds: string[] = listRes.result || [];

    // Fetch all session data in parallel
    const sessions: any[] = [];
    if (sessionIds.length > 0) {
      const fetches = sessionIds.map((sid) =>
        fetch(`${url}/get/portfolio_session:${sid}`, {
          headers: { Authorization: `Bearer ${token}` },
        }).then((r) => r.json())
      );
      const results = await Promise.all(fetches);
      for (const r of results) {
        if (r.result) {
          try {
            sessions.push(JSON.parse(r.result));
          } catch {}
        }
      }
    }

    // Build stats
    const totalVisitors = sessions.length;

    // Country breakdown
    const countryMap: Record<string, number> = {};
    const cityMap: Record<string, number> = {};
    let totalDuration = 0;
    const sectionTotals: Record<string, number> = { about: 0, stack: 0, projects: 0 };

    for (const s of sessions) {
      const country = s.country || 'unknown';
      const city = s.city || 'unknown';
      countryMap[country] = (countryMap[country] || 0) + 1;
      cityMap[city] = (cityMap[city] || 0) + 1;
      totalDuration += s.duration || 0;

      if (s.sectionDurations) {
        for (const [sec, dur] of Object.entries(s.sectionDurations)) {
          if (sectionTotals[sec] !== undefined) {
            sectionTotals[sec] += (dur as number) || 0;
          }
        }
      }
    }

    const avgDuration = totalVisitors > 0 ? Math.round(totalDuration / totalVisitors) : 0;

    // Sort countries by count desc
    const countries = Object.entries(countryMap)
      .map(([code, count]) => ({ code, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);

    const cities = Object.entries(cityMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);

    // Recent sessions (last 20, sorted by lastActiveTime desc)
    const recent = [...sessions]
      .sort((a, b) => (b.lastActiveTime || 0) - (a.lastActiveTime || 0))
      .slice(0, 20)
      .map((s) => ({
        sessionId: s.sessionId,
        country: s.country || '??',
        city: s.city || '??',
        duration: s.duration || 0,
        sectionDurations: s.sectionDurations || {},
        lastActiveTime: s.lastActiveTime || 0,
        ua: s.ua || '',
      }));

    return NextResponse.json({
      success: true,
      totalVisitors,
      avgDuration,
      countries,
      cities,
      sectionTotals,
      recent,
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { sessionId, action, duration, sectionDurations, currentSection } = body;

    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const country = req.headers.get('x-vercel-ip-country') || 'unknown';
    const city = req.headers.get('x-vercel-ip-city') || 'unknown';
    const region = req.headers.get('x-vercel-ip-country-region') || 'unknown';
    const ua = req.headers.get('user-agent') || 'unknown';
    const timestamp = Date.now();

    const { url, token } = getRedis();

    if (!url || !token) {
      console.warn('Vercel KV credentials not set. Visit log skipped.');
      return NextResponse.json({ success: false, error: 'KV Config Missing' });
    }

    if (sessionId) {
      const sessionKey = `portfolio_session:${sessionId}`;

      // 1. Fetch existing session data
      const getRes = await fetch(`${url}/get/${sessionKey}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const getData = await getRes.json();
      let sessionData: any = null;

      if (getData.result) {
        try {
          sessionData = JSON.parse(getData.result);
        } catch (e) {}
      }

      if (sessionData) {
        // Update existing session
        sessionData.duration = duration !== undefined ? duration : sessionData.duration;
        sessionData.sectionDurations = sectionDurations || sessionData.sectionDurations || {};
        sessionData.currentSection = currentSection || sessionData.currentSection || 'unknown';
        sessionData.lastActiveTime = timestamp;
      } else {
        // Create new session
        sessionData = {
          sessionId,
          ip,
          country,
          city,
          region,
          ua,
          startTime: timestamp,
          lastActiveTime: timestamp,
          duration: duration || 0,
          sectionDurations: sectionDurations || { about: 0, stack: 0, projects: 0 },
          currentSection: currentSection || 'about'
        };

        // Add to the list of recent sessions
        await redisCommand(url, token, ['LPUSH', 'portfolio_sessions_list', sessionId]);

        // Keep only last 1000 sessions in the index list
        await redisCommand(url, token, ['LTRIM', 'portfolio_sessions_list', '0', '999']);

        // Fallback for backward compatibility (legacy simple log list)
        const visitData = { ip, country, city, region, ua, timestamp };
        await redisCommand(url, token, ['LPUSH', 'portfolio_visits', JSON.stringify(visitData)]);
        await redisCommand(url, token, ['LTRIM', 'portfolio_visits', '0', '4999']);
      }

      // Save updated session data back to Redis with a 48-hour expiration TTL (172800 seconds)
      await redisCommand(url, token, ['SET', sessionKey, JSON.stringify(sessionData), 'EX', '172800']);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking visit:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
