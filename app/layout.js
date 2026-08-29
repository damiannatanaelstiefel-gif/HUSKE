import './globals.css';

export const metadata = {
  metadataBase: new URL('https://www.huske.com.ar'),
  title: 'HUSKE — Producciones',
  description: 'EVENTOS SOCIALES — Recuerdos únicos, cuidado profesional.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
