import './globals.css';

export const metadata = {
  title: 'HUSKE — Producciones',
  description: 'Bodas, XV años y books — fotografía editorial en Argentina.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
