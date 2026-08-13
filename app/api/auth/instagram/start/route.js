import { NextResponse } from 'next/server';

export async function GET(request) {
  const origin = new URL(request.url).origin;
  const redirectUri = `${origin}/api/auth/instagram/callback`;

  const authUrl = new URL('https://www.instagram.com/oauth/authorize');
  authUrl.searchParams.set('client_id', process.env.IG_APP_ID);
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', 'instagram_business_basic');

  return NextResponse.redirect(authUrl.toString());
}
