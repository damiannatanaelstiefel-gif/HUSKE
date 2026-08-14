import { getCategorizedMedia } from '../lib/instagram';
import PostGrid from '../components/PostGrid';
import RevealScript from '../components/RevealScript';
import HeroVideo from '../components/HeroVideo';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';

export const revalidate = 300;

export default async function HomePage({ searchParams }) {
  const { connected, xv, bodas, bookXv } = await getCategorizedMedia();
  const igError = searchParams?.ig_error;

  return (
    <>
      <SiteNav />

      <header className="hero" id="top">
        <div className="wrap">
          <img className="logo-big reveal" src="/logo-black.png" alt="Huske" />
          <div className="eyebrow reveal">Rosario, Argentina</div>
          <p className="reveal">Recuerdos únicos, cuidado profesional.</p>
          <a className="btn-primary reveal" href="/nosotros">
            Conócenos
          </a>
          <div className="hero-video reveal">
            <HeroVideo />
          </div>
          <div className="contact-block reveal" id="contacto">
            <a className="btn-primary" href="/agenda">
              Agenda tu evento
            </a>
          </div>
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
      {igError && (
        <div className="wrap connect-note">
          <div className="connect-box">
            <span>No se pudo conectar Instagram: {igError}</span>
            <a href="/api/auth/instagram/start">Reintentar →</a>
          </div>
        </div>
      )}

      <section className="chapter mood-bodas" id="bodas">
        <div className="wrap">
          <div className="chapter-head reveal">
            <h1 className="chapter-title">Bodas</h1>
          </div>
          <PostGrid
            posts={bodas}
            emptyLabel="Todavía no hay publicaciones etiquetadas #huskebodas"
            preview={{ type: 'last', count: 4 }}
            size="medium"
          />
        </div>
      </section>

      <section className="chapter mood-xv" id="xv">
        <div className="wrap">
          <div className="chapter-head reveal">
            <h1 className="chapter-title">XV Años</h1>
          </div>
          <PostGrid
            posts={xv}
            emptyLabel="Todavía no hay publicaciones etiquetadas #huskexv"
            preview={{ type: 'last', count: 4 }}
            size="medium"
          />

          <div className="subsection reveal">
            <h2 className="subsection-title">Books</h2>
            <PostGrid
              posts={bookXv}
              emptyLabel="Todavía no hay publicaciones etiquetadas #huskebookxv"
              size="compact"
              scroll
            />
          </div>
        </div>
      </section>

      <section className="strip reveal" id="nosotros">
        <div className="wrap">
          <div className="tag">Nosotros</div>
          <a className="btn-primary" href="/nosotros">
            Conócenos
          </a>
        </div>
      </section>

      <SiteFooter />

      <RevealScript />
    </>
  );
}
