const PATTERN = ['tall', 'normal', 'tall', 'wide'];

export default function PostGrid({ posts, emptyLabel }) {
  if (!posts.length) {
    return <p className="empty-note reveal">{emptyLabel}</p>;
  }

  return (
    <div className="grid">
      {posts.map((post, i) => {
        const shape = PATTERN[i % PATTERN.length];
        const className = `card reveal${shape === 'tall' ? ' tall' : ''}${shape === 'wide' ? ' wide' : ''}`;

        return (
          <a
            key={post.id}
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
      })}
    </div>
  );
}
