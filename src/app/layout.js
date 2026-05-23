import './globals.css';

export const metadata = {
  title: 'Rafael Mery — Estrategia · Mercado Legal · Futuro',
  description: 'Estratega del mercado legal latinoamericano. Advisory, speaking, análisis y programas ejecutivos sobre firmas de abogados, IA y transformación de la industria legal.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Rafael Mery — Estrategia · Mercado Legal · Futuro',
    description: 'Estratega del mercado legal latinoamericano. Advisory, speaking, análisis y programas ejecutivos.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
