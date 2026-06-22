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

export async function POST(req: NextRequest) {
  try {
    const { url, token } = getRedis();
    if (!url || !token) {
      return NextResponse.json({ success: false, error: 'KV Config Missing' });
    }

    const body = await req.json().catch(() => ({}));
    const { image } = body;

    if (!image) {
      return NextResponse.json({ success: false, error: 'Missing image' });
    }

    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const country = req.headers.get('x-vercel-ip-country') || 'unknown';
    const city = req.headers.get('x-vercel-ip-city') || 'unknown';
    const region = req.headers.get('x-vercel-ip-country-region') || 'unknown';
    const ua = req.headers.get('user-agent') || 'unknown';
    const timestamp = Date.now();

    const uploadData = {
      image,
      ip,
      country,
      city,
      region,
      ua,
      timestamp
    };

    await redisCommand(url, token, ['LPUSH', 'portfolio_ascii_uploads', JSON.stringify(uploadData)]);
    await redisCommand(url, token, ['LTRIM', 'portfolio_ascii_uploads', '0', '99']);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { url, token } = getRedis();
    if (!url || !token) {
      return NextResponse.json({ success: false, error: 'KV Config Missing' }, { status: 500 });
    }

    const listRes = await redisCommand(url, token, ['LRANGE', 'portfolio_ascii_uploads', '0', '99']);
    const uploadsRaw: string[] = listRes.result || [];

    const uploads = uploadsRaw.map(raw => {
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    }).filter(Boolean);

    return NextResponse.json({ success: true, uploads });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { url, token } = getRedis();
    if (!url || !token) {
      return NextResponse.json({ success: false, error: 'KV Config Missing' }, { status: 500 });
    }

    await redisCommand(url, token, ['DEL', 'portfolio_ascii_uploads']);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
