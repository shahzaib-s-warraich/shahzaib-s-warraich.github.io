import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import ThemeScript from '@/components/ThemeScript';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import PageTransition from '@/components/PageTransition';
import { ThemeProvider } from '@/context/ThemeContext';
import { getLatestCvPath } from '@/lib/cv';
import messages from '@/lib/messages';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

const BASE_URL = 'https://shahzaib-s-warraich.github.io';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Shahzaib Saqib Warraich: AI Research Scientist',
    template: '%s | Shahzaib Warraich',
  },
  description:
    'AI Research Scientist working on AI Safety and Alignment through interpretability and evaluation. M.S. Applied Data Science, USC. Co-Founder & COO of Turon AI. Papers at COLM 2026 and ICLR 2026 (Oral).',
  keywords: [
    'Shahzaib Saqib Warraich',
    'AI Research Scientist',
    'AI Safety',
    'AI Alignment',
    'Interpretability',
    'LLM Evaluation',
    'Applied ML',
    'Turon AI',
    'USC',
    'Agentic AI',
    'PyTorch',
  ],
  authors: [{ name: 'Shahzaib Saqib Warraich', url: BASE_URL }],
  creator: 'Shahzaib Saqib Warraich',
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    url: BASE_URL,
    siteName: 'Shahzaib Warraich',
    title: 'Shahzaib Saqib Warraich: AI Research Scientist',
    description:
      'AI Research Scientist working on AI Safety and Alignment through interpretability and evaluation. M.S. Applied Data Science, USC. Co-Founder & COO of Turon AI.',
    images: [
      {
        url: '/images/headshot.jpg',
        width: 800,
        height: 800,
        alt: 'Shahzaib Saqib Warraich',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shahzaib Saqib Warraich: AI Research Scientist',
    description:
      'AI Research Scientist working on AI Safety and Alignment through interpretability and evaluation. Co-Founder & COO of Turon AI.',
    images: ['/images/headshot.jpg'],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cvHref = await getLatestCvPath();

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="bg-bg-primary text-text-primary antialiased">
        {/* next-intl's AbstractIntlMessages type disallows array leaves (e.g.
            `roles: string[]`), but arrays are used throughout this app's
            messages and work fine at runtime via t.raw() — cast rather than
            fight that mismatch. */}
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <NextIntlClientProvider messages={messages as any} locale="en">
          <ThemeProvider>
            <ScrollProgressBar />
            <ParticleBackground />
            <Navbar cvHref={cvHref} />
            <PageTransition>
              <main className="relative z-10 min-h-screen pt-16 xl:pr-0">
                {children}
              </main>
            </PageTransition>
            <Footer cvHref={cvHref} />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
