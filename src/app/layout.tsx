import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/lib/language-context'
import { Header } from '@/components/public/Header'
import { Footer } from '@/components/public/Footer'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ahammadshuvo.com'), // ← change to your real domain
  title: {
    default: 'Ahammad Shuvo — Portfolio',
    template: '%s | Ahammad Shuvo',
  },
  description:
    'Personal portfolio, blog, books, and academic profile of Ahammad Shuvo — Thinker, Builder, Writer.',
  keywords: [
    'Ahammad Shuvo',
    'portfolio',
    'developer',
    'writer',
    'blog',
    'research',
    'Bangladesh',
  ],
  authors: [{ name: 'Ahammad Shuvo' }],
  creator: 'Ahammad Shuvo',
  openGraph: {
    type: 'website',
    locale: 'bn_BD',
    alternateLocale: ['en_US'],
    url: 'https://ahammadshuvo.com',
    siteName: 'Ahammad Shuvo',
    title: 'Ahammad Shuvo — Thinker. Builder. Writer.',
    description:
      'Building things that matter, writing what I believe, and sharing the journey along the way.',
    // images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Ahammad Shuvo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ahammad Shuvo — Portfolio',
    description:
      'Thinker. Builder. Writer. Personal portfolio, blog, books & research.',
    // images: ['/og-image.jpg'],
    // creator: '@yourhandle',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // icons: {
  //   icon: '/favicon.ico',
  //   apple: '/apple-touch-icon.png',
  // },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f9fafb' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body
        className={`${jetbrainsMono.variable} font-en antialiased`}
      >
        <LanguageProvider>
          {/* Skip link for keyboard / screen-reader users */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white focus:outline-none"
          >
            Skip to content
          </a>

          <div className="flex min-h-screen flex-col">
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  )
}
