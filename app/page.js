import { getCategorizedMedia } from '../lib/instagram';
import PostGrid from '../components/PostGrid';
import RevealScript from '../components/RevealScript';

export const revalidate = 3600;

export default async function HomePage({ searchParams }) {
  const { connected, xv, bodas } = await getCategorizedMedia();
  const igError = searchParams?.ig_error;
  const igConnected = searchParams?.ig_connected;

  return (
    <>
      <nav>
        <div className="navrow">
          <a className="brand" href="#top" aria-label="Huske — inicio">
            <img src="/logo-black.png" alt="Huske" />
          </a>
          <div className="navlinks">
            <a href="#xv">XV Años</a>
            <a href="#bodas">Bodas</a>
            <a href="#nosotros">Nosotros</a>
            <a href="#contacto">Contacto</a>
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

      <header className="hero" id="top">
        <div className="wrap">
          <img className="logo-big reveal" src="/logo-black.png" alt="Huske" />
          <div className="eyebrow reveal">Buenos Aires · Argentina</div>
          <p className="reveal">
            Recuerdos únicos, cuidado profesional. Documentamos XV años, bodas y books con una
            mirada editorial — cada imagen de este sitio está enlazada a su publicación original
            en Instagram.
          </p>
          <div className="hero-scroll reveal">
            <span>Explorar</span>
            <span className="line" />
          </div>
        </div>
      </header>

      {!connected && (
        <div className="wrap connect-note">
          <div className="connect-box">
            <span>Todavía no conectaste la cuenta de Instagram — las secciones de abajo van a estar vacías hasta hacerlo.</span>
            <a href="/api/auth/instagram/start">Conectar Instagram →</a>
          </div>
        </div>
      )}
      {igConnected && (
        <div className="wrap connect-note">
          <div className="connect-box">
            <span>Cuenta conectada correctamente. Etiquetá tus posts con #huskexv o #huskebodas para que aparezcan abajo.</span>
          </div>
        </div>
      )}
      {igError && (
        <div className="wrap connect-note">
          <div className="connect-box">
            <span>No se pudo conectar Instagram: {igError}</span>
            <a href="/api/auth/instagram/start">Reintentar →</a>
          </div>
        </div>
      )}

      <section className="chapter mood-xv" id="xv">
        <div className="wrap">
          <div className="chapter-head reveal">
            <div>
              <div className="chapter-num">Capítulo I</div>
              <h1 className="chapter-title">
                XV <em>Años</em>
              </h1>
            </div>
            <p className="chapter-desc">
              Fiestas, books previos y el minuto a minuto de una noche que se cuenta una sola vez.
            </p>
          </div>
          <PostGrid posts={xv} emptyLabel="Todavía no hay publicaciones etiquetadas #huskexv" />
        </div>
      </section>

      <section className="chapter mood-bodas" id="bodas">
        <div className="wrap">
          <div className="chapter-head reveal">
            <div>
              <div className="chapter-num">Capítulo II</div>
              <h1 className="chapter-title">
                Bodas <em>&amp; Books</em>
              </h1>
            </div>
            <p className="chapter-desc">
              Editorial de casamientos: previa, ceremonia y fiesta, con una estética atemporal.
            </p>
          </div>
          <PostGrid posts={bodas} emptyLabel="Todavía no hay publicaciones etiquetadas #huskebodas" />
        </div>
      </section>

      <section className="strip reveal" id="nosotros">
        <div className="wrap">
          <div className="tag">Nosotros</div>
          <a
            className="btn-primary"
            href="https://www.instagram.com/huske.producciones/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.2" cy="6.8" r="1" />
            </svg>
            @huske.producciones
          </a>
        </div>
      </section>

      <footer id="contacto">
        <div className="wrap footrow">
          <span>HUSKE Producciones © 2026 — Bodas · XV · Eventos sociales</span>
          <a href="https://www.instagram.com/huske.producciones/" target="_blank" rel="noopener noreferrer">
            Escribinos por Instagram →
          </a>
        </div>
      </footer>

      <RevealScript />
    </>
  );
}
