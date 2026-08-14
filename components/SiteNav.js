export default function SiteNav() {
  return (
    <nav>
      <div className="navrow">
        <a className="brand" href="/" aria-label="Huske — inicio">
          <img src="/logo-black.png" alt="Huske" />
        </a>
        <div className="navlinks">
          <a href="/#bodas">Bodas</a>
          <a href="/#xv">XV Años</a>
          <a href="/nosotros">Nosotros</a>
          <a href="/agenda">Agenda</a>
        </div>
        <a
          className="ig-btn"
          href="https://www.instagram.com/huske.producciones/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.2" cy="6.8" r="1" />
          </svg>
          Instagram
        </a>
      </div>
    </nav>
  );
}
