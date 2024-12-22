import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Real Time Google Docs Clone',
  description: 'Clone coding of Google Docs in Real Time',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Real Time Google Docs Clone',
    description: 'Clone coding of Google Docs in Real Time',
    images: [
      { url: '/og-image.png', width: 1200, height: 630 },
      { url: '/og-image.png', width: 600, height: 315 },
    ],
    siteName: 'Real Time Google Docs Clone',
    locale: 'en-US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
