import { NextResponse } from 'next/server';
import { getToken, setToken } from '../../../../lib/kv';
import { refreshLongLivedToken } from '../../../../lib/instagram';

export async function GET(request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const token = await getToken();
  if (!token) {
    return NextResponse.json({ skipped: true, reason: 'no token stored yet' });
  }

  const { access_token } = await refreshLongLivedToken(token);
  await setToken(access_token);
  return NextResponse.json({ refreshed: true });
}
