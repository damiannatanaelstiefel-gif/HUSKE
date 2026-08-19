'use client';

import { useState } from 'react';

export default function ClickToPlayVideo({ src, poster, label }) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <div className="summary-video">
        <video src={src} poster={poster} controls autoPlay playsInline />
      </div>
    );
  }

  return (
    <button type="button" className="summary-video-trigger" onClick={() => setActive(true)}>
      {poster && <img src={poster} alt="" />}
      <span className="play-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
      <span className="summary-video-label">{label}</span>
    </button>
  );
}
