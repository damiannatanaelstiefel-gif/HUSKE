import { kv } from '@vercel/kv';

const TOKEN_KEY = 'ig:long_lived_token';

export async function getToken() {
  try {
    return await kv.get(TOKEN_KEY);
  } catch {
    // KV store not provisioned/connected yet — treat as "not connected".
    return null;
  }
}

export async function setToken(token) {
  return kv.set(TOKEN_KEY, token);
}
