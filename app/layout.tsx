import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Navigation from './components/Navigation';

// Atkinson Hyperlegible Next: a typeface the Braille Institute designed for
// readers with low vision. Hosted with the site (no Google Fonts request).
const atkinson = localFont({
  src: [
    { path: './fonts/AtkinsonHyperlegibleNext.woff2', style: 'normal', weight: '200 800' },
    { path: './fonts/AtkinsonHyperlegibleNext-Italic.woff2', style: 'italic', weight: '200 800' },
  ],
  variable: '--font-atkinson',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Leticia Diniz · Assistive technology & product design',
  description:
    'Computer engineering student at Northwestern who designs and builds assistive devices, from patented lab instruments to robots.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={atkinson.variable}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-violet focus:px-4 focus:py-2 focus:font-bold focus:text-paper"
        >
          Skip to content
        </a>
        <Navigation />
        <div id="main">{children}</div>
      </body>
    </html>
  );
}
