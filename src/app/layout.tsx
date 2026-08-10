import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import ThemeScript from '@/components/ThemeScript';
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="bg-bg-primary text-text-primary antialiased">{children}</body>
    </html>
  );
}
