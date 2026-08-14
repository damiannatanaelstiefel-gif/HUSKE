const CONTACTS = [
  { name: 'Damián', phone: '+54 9 341 584 0783', wa: '5493415840783' },
  { name: 'Darío', phone: '+54 9 341 353 9862', wa: '5493413539862' },
];

export default function WhatsAppLinks() {
  return (
    <div className="whatsapp-row">
      {CONTACTS.map((c) => (
        <a
          key={c.wa}
          className="whatsapp-link"
          href={`https://wa.me/${c.wa}?text=${encodeURIComponent('Hola! Vi la web de HUSKE y quería consultarte')}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.5 2.3.8 3.6.8.6 0 1 .4 1 1v3.4c0 .6-.4 1-1 1C11.9 21.2 2.8 12.1 2.8 1.9c0-.6.4-1 1-1H7.2c.6 0 1 .4 1 1 0 1.3.3 2.5.8 3.6.2.3.1.7-.2 1L6.6 10.8Z" />
          </svg>
          {c.name} — {c.phone}
        </a>
      ))}
    </div>
  );
}
