import { NextResponse } from 'next/server';
import { exchangeCodeForShortToken, exchangeForLongLivedToken } from '../../../../../lib/instagram';
import { setToken } from '../../../../../lib/kv';

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  if (error) {
    return NextResponse.redirect(`${url.origin}/?ig_error=${encodeURIComponent(error)}`);
  }
  if (!code) {
    return NextResponse.redirect(`${url.origin}/?ig_error=missing_code`);
  }

  try {
    const redirectUri = `${url.origin}/api/auth/instagram/callback`;
    const shortTokenData = await exchangeCodeForShortToken(code, redirectUri);
    const shortToken = shortTokenData.access_token || shortTokenData.data?.[0]?.access_token;

    if (!shortToken) {
      const detail = JSON.stringify(shortTokenData).slice(0, 300);
      return NextResponse.redirect(`${url.origin}/?ig_error=${encodeURIComponent(`no_short_token ${detail}`)}`);
    }

    const longTokenData = await exchangeForLongLivedToken(shortToken);
    const longToken = longTokenData.access_token;

    if (!longToken) {
      const detail = JSON.stringify(longTokenData).slice(0, 300);
      return NextResponse.redirect(`${url.origin}/?ig_error=${encodeURIComponent(`no_long_token ${detail}`)}`);
    }

    await setToken(longToken);
    return NextResponse.redirect(`${url.origin}/?ig_connected=1&len=${longToken.length}`);
  } catch (err) {
    return NextResponse.redirect(`${url.origin}/?ig_error=${encodeURIComponent(err.message)}`);
  }
}
