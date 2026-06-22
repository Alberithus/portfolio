import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';

function encrypt(text: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text: string): string {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift()!, 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

function sanitizeString(str: string): string {
  return str.replace(/[^a-zA-Z0-9\s.,()\-/:;]/g, '');
}

const getExpectedHashAndRedis = () => {
  const url = process.env.KV_REST_API_URL || '';
  const token = process.env.KV_REST_API_TOKEN || '';
  const passcode = process.env.ASCII_GALLERY_PASSCODE || 'Albert2026';
  const expectedHash = crypto.createHash('sha256').update(passcode).digest('hex');
  return { url, token, expectedHash };
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
    const { url, token } = getExpectedHashAndRedis();
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
    const id = 'img_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9);

    const uploadData = {
      id,
      image: encrypt(image),
      ip: sanitizeString(ip),
      country: sanitizeString(country),
      city: sanitizeString(city),
      region: sanitizeString(region),
      ua: sanitizeString(ua),
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
    const { url, token, expectedHash } = getExpectedHashAndRedis();
    if (!url || !token) {
      return NextResponse.json({ success: false, error: 'KV Config Missing' }, { status: 500 });
    }

    const authHeader = req.headers.get('Authorization');
    const clientToken = authHeader?.split(' ')[1];
    if (clientToken !== expectedHash) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const listRes = await redisCommand(url, token, ['LRANGE', 'portfolio_ascii_uploads', '0', '99']);
    const uploadsRaw: string[] = listRes.result || [];

    const uploads = uploadsRaw.map(raw => {
      try {
        const parsed = JSON.parse(raw);
        parsed.image = decrypt(parsed.image);
        return parsed;
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
    const { url, token, expectedHash } = getExpectedHashAndRedis();
    if (!url || !token) {
      return NextResponse.json({ success: false, error: 'KV Config Missing' }, { status: 500 });
    }

    const authHeader = req.headers.get('Authorization');
    const clientToken = authHeader?.split(' ')[1];
    if (clientToken !== expectedHash) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const { id } = body;

    if (id) {
      const listRes = await redisCommand(url, token, ['LRANGE', 'portfolio_ascii_uploads', '0', '99']);
      const uploadsRaw: string[] = listRes.result || [];

      let itemToRemoveRaw = '';
      for (const raw of uploadsRaw) {
        try {
          const parsed = JSON.parse(raw);
          if (parsed.id === id) {
            itemToRemoveRaw = raw;
            break;
          }
        } catch {}
      }

      if (itemToRemoveRaw) {
        await redisCommand(url, token, ['LREM', 'portfolio_ascii_uploads', '0', itemToRemoveRaw]);
      }
      return NextResponse.json({ success: true });
    } else {
      await redisCommand(url, token, ['DEL', 'portfolio_ascii_uploads']);
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
