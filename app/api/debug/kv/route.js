import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export const dynamic = 'force-dynamic';

export async function GET() {
  const envVars = [
    'KV_URL',
    'KV_REST_API_URL',
    'KV_REST_API_TOKEN',
    'KV_REST_API_READ_ONLY_TOKEN',
    'REDIS_URL',
    'UPSTASH_REDIS_REST_URL',
    'UPSTASH_REDIS_REST_TOKEN',
  ];
  const present = {};
  for (const name of envVars) {
    present[name] = Boolean(process.env[name]);
  }

  let readError = null;
  let tokenPresent = false;
  let writeReadRoundtrip = null;

  try {
    const value = await kv.get('ig:long_lived_token');
    tokenPresent = Boolean(value);
  } catch (err) {
    readError = err.message;
  }

  try {
    await kv.set('debug:roundtrip', 'ok');
    writeReadRoundtrip = await kv.get('debug:roundtrip');
  } catch (err) {
    writeReadRoundtrip = `error: ${err.message}`;
  }

  return NextResponse.json({ present, tokenPresent, readError, writeReadRoundtrip });
}
