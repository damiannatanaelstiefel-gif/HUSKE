const TOKEN_KEY = 'ig:long_lived_token';

async function upstashFetch(path, options = {}) {
  const url = `${process.env.KV_REST_API_URL}${path}`;
  const res = await fetch(url, {
    ...options,
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    throw new Error(`Upstash request failed (${res.status}): ${await res.text()}`);
  }
  return res.json();
}

export async function getToken() {
  try {
    const data = await upstashFetch(`/get/${encodeURIComponent(TOKEN_KEY)}`);
    return data.result || null;
  } catch {
    return null;
  }
}

export async function setToken(token) {
  const data = await upstashFetch(`/set/${encodeURIComponent(TOKEN_KEY)}`, {
    method: 'POST',
    body: token,
  });
  return data.result;
}
