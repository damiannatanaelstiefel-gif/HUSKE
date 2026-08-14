'use client';

import { useState } from 'react';

const PATTERN = ['tall', 'normal', 'tall', 'wide'];

function Card({ post, index, reveal, compact }) {
  const shape = compact ? 'normal' : PATTERN[index % PATTERN.length];
  const className = `card${reveal ? ' reveal' : ''}${shape === 'tall' ? ' tall' : ''}${shape === 'wide' ? ' wide' : ''}`;

  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={post.caption ? `Ver "${post.caption}" en Instagram` : 'Ver publicación en Instagram'}
    >
      <span className="frame" style={{ backgroundImage: `url(${post.cover})` }} />
      <span className="veil" />
      <span className="card-info">
        {post.caption && <span className="cap">{post.caption}</span>}
        <span className="meta">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
          </svg>
          Ver en Instagram
        </span>
      </span>
    </a>
  );
}

// preview: { type: 'firstLast' | 'last', count: number }
// 'firstLast' muestra las N mas recientes + las N mas antiguas
// 'last' muestra solo las N mas recientes
// size: 'compact' para miniaturas mas chicas (ej. books)
// scroll: true para tira horizontal con scroll en vez de grid + boton Ver mas
export default function PostGrid({ posts, emptyLabel, preview, size, scroll }) {
  const [expanded, setExpanded] = useState(false);
  const compact = size === 'compact';

  if (!posts.length) {
    return <p className="empty-note reveal">{emptyLabel}</p>;
  }

  if (scroll) {
    return (
      <div className="grid-scroll">
        {posts.map((post, i) => (
          <Card key={post.id} post={post} index={i} reveal compact={compact} />
        ))}
      </div>
    );
  }

  let initialVisible = posts;
  if (preview) {
    const { type, count } = preview;
    if (type === 'firstLast' && posts.length > count * 2) {
      initialVisible = [...posts.slice(0, count), ...posts.slice(-count)];
    } else if (type === 'last' && posts.length > count) {
      initialVisible = posts.slice(0, count);
    }
  }

  const hiddenCount = posts.length - initialVisible.length;
  const displayed = expanded ? posts : initialVisible;
  const initialVisibleIds = new Set(initialVisible.map((p) => p.id));

  return (
    <>
      <div className={`grid${compact ? ' grid-compact' : ''}`}>
        {displayed.map((post, i) => (
          <Card key={post.id} post={post} index={i} reveal={initialVisibleIds.has(post.id)} compact={compact} />
        ))}
      </div>
      {hiddenCount > 0 && !expanded && (
        <div className="grid-more">
          <button type="button" className="btn-more" onClick={() => setExpanded(true)}>
            Ver más
          </button>
        </div>
      )}
    </>
  );
}
