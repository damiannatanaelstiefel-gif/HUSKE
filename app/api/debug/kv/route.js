import { NextResponse } from 'next/server';
import { getToken, setToken } from '../../../../lib/kv';

export const dynamic = 'force-dynamic';

export async function GET() {
  const envVars = ['KV_REST_API_URL', 'KV_REST_API_TOKEN'];
  const present = {};
  for (const name of envVars) {
    present[name] = Boolean(process.env[name]);
  }

  const tokenBefore = await getToken();

  let tokenAfterTestWrite = 'skipped (real token already present)';
  if (!tokenBefore) {
    await setToken('debug-test-value-123');
    tokenAfterTestWrite = await getToken();
  }

  return NextResponse.json({
    present,
    tokenBefore: Boolean(tokenBefore),
    tokenAfterTestWrite,
  });
}
