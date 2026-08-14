import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';
import RevealScript from '../../components/RevealScript';
import WhatsAppLinks from '../../components/WhatsAppLinks';

export const metadata = {
  title: 'Agenda tu evento — HUSKE Producciones',
  description: 'Contanos sobre tu boda o tus XV y armamos una propuesta a medida.',
};

const WEDDING_QUESTIONS = [
  '¿Buscás fotografía, video o ambas?',
  'Fecha del evento',
  'Lugar de la celebración',
  'Cantidad aproximada de invitados',
  'Horario de inicio',
  'Si habrá preparación previa de los novios, como maquillaje, peinado, vestimenta, etc.',
  'Si habrá ceremonia religiosa en iglesia',
  'Si habrá ceremonia civil',
  'Lugares donde se realizará cada parte del evento',
  'Si contará con algún show, banda o momento puntual que quieras que quede registrado',
  'Cualquier otro detalle que consideres importante',
];

const XV_QUESTIONS = [
  '¿Buscás fotografía, video o ambas?',
  'Fecha del evento',
  'Lugar del evento',
  'Cantidad aproximada de invitados',
  'Horario de inicio',
  'Si habrá preparación previa de la quinceañera, como maquillaje, peinado y vestimenta',
  'Si contará con algún show, banda o momento puntual que quieras que quede registrado',
  'Cualquier otro detalle que quieras contarnos',
];

export default function AgendaPage() {
  return (
    <>
      <SiteNav />

      <section className="agenda">
        <div className="wrap agenda-wrap">
          <h1 className="chapter-title reveal">Hablemos de tu evento</h1>
          <p className="agenda-intro reveal">
            ¿Querés que HUSKE sea parte de tu celebración? Escribinos por WhatsApp y contanos un
            poco sobre el evento. Estos datos nos ayudan a entender lo que necesitás y preparar
            una propuesta a medida.
          </p>

          <div className="agenda-block mood-bodas reveal">
            <h2 className="agenda-block-title">💍 Si es una boda</h2>
            <ul className="agenda-list">
              {WEDDING_QUESTIONS.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          </div>

          <div className="agenda-block mood-xv reveal">
            <h2 className="agenda-block-title">✨ Si es un XV</h2>
            <ul className="agenda-list">
              {XV_QUESTIONS.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          </div>

          <p className="agenda-note reveal">
            Si tu evento es diferente, también podemos acompañarte. Contanos tu idea y vemos
            juntos la mejor manera de llevarla a cabo.
          </p>

          <div className="agenda-cta reveal">
            <p className="agenda-cta-text">
              📲 Escribinos por WhatsApp. Nos encantaría conocer tu evento y ser parte de ese
              momento.
            </p>
            <WhatsAppLinks />
          </div>
        </div>
      </section>

      <SiteFooter />
      <RevealScript />
    </>
  );
}
