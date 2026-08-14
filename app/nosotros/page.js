import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';
import RevealScript from '../../components/RevealScript';

export const metadata = {
  title: 'Nosotros — HUSKE Producciones',
  description: 'Conocé a Damián y Darío, los fundadores de HUSKE Producciones.',
};

export default function NosotrosPage() {
  return (
    <>
      <SiteNav />

      <section className="about">
        <div className="wrap about-grid">
          <div className="about-photo reveal">
            <img src="/nosotros.jpg" alt="Damián y Darío, fundadores de HUSKE Producciones" />
          </div>
          <div className="about-text reveal">
            <h1 className="chapter-title">Nosotros</h1>
            <p>
              HUSKE nació hace casi tres años a partir de una amistad y una pasión compartida:
              contar historias a través de imágenes.
            </p>
            <p>
              Somos Damián, de Funes, y Darío, de Roldán. Cada uno construyó su experiencia en
              distintos ámbitos del audiovisual: Damián desde los videoclips y la producción
              musical, y Darío desde el mundo deportivo y automovilístico. A su vez, ambos
              trabajamos durante años en eventos sociales junto a distintas productoras.
            </p>
            <p>
              Con el tiempo sentimos que era momento de unir nuestra experiencia y crear algo
              propio. Así nació HUSKE, con la idea de hacer las cosas de una manera cercana,
              profesional y, sobre todo, humana.
            </p>
            <p>
              Entendemos que cada celebración representa un momento único e irrepetible. Por eso
              nos involucramos en cada producción para acompañar a quienes nos eligen y
              transformar todo lo vivido en una historia que puedan volver a sentir una y otra
              vez.
            </p>
            <p>
              Trabajamos principalmente en Funes, Roldán y todo el Gran Rosario, aunque también
              viajamos a donde nos lleve cada historia. No dudes en consultarnos, estés donde
              estés.
            </p>
            <p>
              Contamos con equipamiento audiovisual profesional, cámaras, iluminación y drones,
              pero creemos que lo más importante es saber mirar, estar presentes y encontrar esos
              momentos que hacen que cada historia sea verdaderamente única.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
      <RevealScript />
    </>
  );
}
