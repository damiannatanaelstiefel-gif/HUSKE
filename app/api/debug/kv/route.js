import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export const dynamic = 'force-dynamic';

export async function GET() {
  const hasUrl = Boolean(process.env.KV_REST_API_URL);
  const hasToken = Boolean(process.env.KV_REST_API_TOKEN);

  let readError = null;
  let tokenPresent = false;

  try {
    const value = await kv.get('ig:long_lived_token');
    tokenPresent = Boolean(value);
  } catch (err) {
    readError = err.message;
  }

  return NextResponse.json({ hasUrl, hasToken, tokenPresent, readError });
}
