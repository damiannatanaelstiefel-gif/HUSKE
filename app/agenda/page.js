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

const BODAS_COMBOS = {
  basico: {
    name: 'Combo Básico',
    tagline: 'Un fotógrafo y un resumen dinámico del evento — la combinación esencial para no perderte nada.',
    specs: [
      { label: 'Fotografía', value: '1 fotógrafo profesional' },
      { label: 'Video', value: 'resumen de 6 a 10 minutos + videominuto' },
      { label: 'Entrega', value: 'fotos en 48h · video hasta 30 días · videominuto junto con el material final' },
    ],
  },
  estandar: {
    name: 'Combo Estándar',
    tagline: 'Dos fotógrafos en simultáneo y un video con montaje dedicado a cada etapa de la celebración.',
    specs: [
      { label: 'Fotografía', value: '2 fotógrafos profesionales' },
      { label: 'Video', value: 'cobertura completa mínimo 18 minutos + resumen mínimo 3 minutos + videominuto' },
      { label: 'Entrega', value: 'fotos en 24h · video hasta 45 días · videominuto junto con el material final' },
    ],
  },
  edicionEnVivo: {
    text: 'Sumá la edición en vivo a cualquiera de los combos: proyectamos un resumen del evento el mismo día, para compartirlo con todos los invitados al finalizar la fiesta.',
    note: 'Con el Básico se proyecta un resumen y se entrega el video de testigos en 30 días hábiles. Con el Estándar, además reciben el video completo de la celebración.',
  },
};

const XV_COMBOS = {
  basico: {
    name: 'Combo Básico',
    tagline: 'La combinación esencial para no perderte nada: un fotógrafo profesional durante todo el evento y un resumen audiovisual dinámico del día.',
    specs: [
      { label: 'Fotografía', value: '1 fotógrafo profesional' },
      { label: 'Video', value: 'resumen de 4 a 8 minutos' },
      { label: 'Entrega', value: 'fotos en 48h · video hasta 30 días hábiles' },
    ],
  },
  estandar: {
    name: 'Combo Estándar',
    tagline: 'Cobertura completa en ambos formatos: dos fotógrafos en simultáneo y un video que recorre cada etapa de la celebración.',
    specs: [
      { label: 'Fotografía', value: '2 fotógrafos profesionales' },
      { label: 'Video', value: 'mínimo 16 minutos' },
      { label: 'Entrega', value: 'fotos en 24h · video hasta 45 días hábiles' },
    ],
  },
  edicionEnVivo: {
    text: 'Sumá la edición en vivo a cualquiera de los combos: proyectamos un resumen del evento el mismo día, para compartirlo con todos los invitados al finalizar la fiesta.',
    note: 'Con el Básico se proyecta un resumen y se entrega el video de cartas en 15 días. Con el Estándar, además reciben el video completo de la celebración.',
  },
};

function EventAccordion({ icon, title, mood, questions, combos }) {
  return (
    <details className={`agenda-accordion ${mood}`}>
      <summary className="agenda-accordion-summary">
        <span>
          {icon} {title}
        </span>
        <span className="agenda-accordion-chevron" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </summary>

      <div className="agenda-accordion-body">
        <h3 className="agenda-accordion-subtitle">Contanos esto para armar tu propuesta</h3>
        <ul className="agenda-list">
          {questions.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>

        <h3 className="agenda-accordion-subtitle">Nuestros planes</h3>
        <div className="combo-grid">
          {[combos.basico, combos.estandar].map((combo) => (
            <div className={`combo-card ${mood}`} key={combo.name}>
              <div className="combo-name">{combo.name}</div>
              <p className="combo-tagline">{combo.tagline}</p>
              <ul className="combo-specs">
                {combo.specs.map((spec) => (
                  <li key={spec.label}>
                    <span className="combo-spec-label">{spec.label}</span>
                    {spec.value}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={`combo-addon ${mood}`}>
          <div className="combo-name">+ Edición en Vivo</div>
          <p>{combos.edicionEnVivo.text}</p>
          <p className="combo-addon-note">{combos.edicionEnVivo.note}</p>
        </div>
      </div>
    </details>
  );
}

export default function AgendaPage() {
  return (
    <>
      <SiteNav />

      <section className="agenda">
        <div className="wrap agenda-wrap">
          <h1 className="chapter-title reveal">Hablemos de tu evento</h1>
          <p className="agenda-intro reveal">
            ¿Querés que HUSKE sea parte de tu celebración? Desplegá tu categoría para ver qué
            info necesitamos y los planes disponibles.
          </p>

          <div className="reveal">
            <EventAccordion
              icon="💍"
              title="Si es una boda"
              mood="mood-bodas"
              questions={WEDDING_QUESTIONS}
              combos={BODAS_COMBOS}
            />
            <EventAccordion
              icon="✨"
              title="Si es un XV"
              mood="mood-xv"
              questions={XV_QUESTIONS}
              combos={XV_COMBOS}
            />
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
