import { getToken } from './kv';

const GRAPH = 'https://graph.instagram.com';

// Publicaciones se clasifican por un hashtag en el caption.
// Ej: agregá #huskexv a un post de XV, #huskebodas a uno de bodas,
// o #huskebookxv a un book de fotos de XV.
const CATEGORY_TAGS = {
  xv: ['#huskexv'],
  bodas: ['#huskebodas'],
  bookxv: ['#huskebookxv'],
};

export async function exchangeCodeForShortToken(code, redirectUri) {
  const body = new URLSearchParams({
    client_id: process.env.IG_APP_ID,
    client_secret: process.env.IG_APP_SECRET,
    grant_type: 'authorization_code',
    redirect_uri: redirectUri,
    code,
  });
  const res = await fetch('https://api.instagram.com/oauth/access_token', {
    method: 'POST',
    body,
  });
  if (!res.ok) throw new Error(`Token exchange failed: ${await res.text()}`);
  return res.json();
}

export async function exchangeForLongLivedToken(shortToken) {
  const url = new URL(`${GRAPH}/access_token`);
  url.searchParams.set('grant_type', 'ig_exchange_token');
  url.searchParams.set('client_secret', process.env.IG_APP_SECRET);
  url.searchParams.set('access_token', shortToken);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Long-lived exchange failed: ${await res.text()}`);
  return res.json();
}

export async function refreshLongLivedToken(token) {
  const url = new URL(`${GRAPH}/refresh_access_token`);
  url.searchParams.set('grant_type', 'ig_refresh_token');
  url.searchParams.set('access_token', token);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Refresh failed: ${await res.text()}`);
  return res.json();
}

async function fetchMedia(token, limit = 50) {
  const url = new URL(`${GRAPH}/me/media`);
  url.searchParams.set('fields', 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp');
  url.searchParams.set('limit', String(limit));
  url.searchParams.set('access_token', token);
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`Media fetch failed: ${await res.text()}`);
  const data = await res.json();
  return data.data || [];
}

function categorize(caption) {
  const text = (caption || '').toLowerCase();
  for (const [category, tags] of Object.entries(CATEGORY_TAGS)) {
    if (tags.some((tag) => text.includes(tag))) return category;
  }
  return null;
}

// Trunca por puntos de codigo Unicode (no por unidades UTF-16), para no
// cortar a la mitad emojis/letras estilizadas de 2 unidades y dejar un
// caracter invalido que rompe la hidratacion de React en el cliente.
function truncateCaption(caption, maxLength = 80) {
  const firstLine = (caption || '').split('\n')[0];
  return Array.from(firstLine).slice(0, maxLength).join('');
}

export async function getCategorizedMedia() {
  const token = await getToken();
  if (!token) return { connected: false, xv: [], bodas: [], bookXv: [] };

  let items;
  try {
    items = await fetchMedia(token);
  } catch {
    // Token invalido/expirado: tratarlo como no conectado en vez de romper la pagina.
    return { connected: false, xv: [], bodas: [], bookXv: [] };
  }

  const xv = [];
  const bodas = [];
  const bookXv = [];

  for (const item of items) {
    const cover = item.thumbnail_url || item.media_url;
    if (!cover) continue;

    const category = categorize(item.caption);
    if (!category) continue;

    const card = {
      id: item.id,
      cover,
      permalink: item.permalink,
      caption: truncateCaption(item.caption),
      timestamp: item.timestamp,
    };

    if (category === 'xv') xv.push(card);
    else if (category === 'bodas') bodas.push(card);
    else if (category === 'bookxv') bookXv.push(card);
  }

  return { connected: true, xv, bodas, bookXv };
}
