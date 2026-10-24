import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DDC 2026 | Drink. Derive. Code. | ACM Bennett',
  description:
    'DDC 2026 by the ACM Student Chapter, Bennett University. Two players, one laptop, zero talking. 29 October 2026.',
  icons: { icon: '/assets/acm-bennett-logo.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Great+Vibes&family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="intro-open">{children}</body>
    </html>
  );
}
