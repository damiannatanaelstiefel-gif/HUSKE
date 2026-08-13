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
    const { access_token: shortToken } = await exchangeCodeForShortToken(code, redirectUri);
    const { access_token: longToken } = await exchangeForLongLivedToken(shortToken);
    await setToken(longToken);
    return NextResponse.redirect(`${url.origin}/?ig_connected=1`);
  } catch (err) {
    return NextResponse.redirect(`${url.origin}/?ig_error=${encodeURIComponent(err.message)}`);
  }
}
