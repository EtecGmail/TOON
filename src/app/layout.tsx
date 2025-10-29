import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'TOON Learning System',
  description:
    'Aprenda e use TOON (Token-Oriented Object Notation) de forma interativa',
}

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Learn', href: '/learn' },
  { label: 'Playground', href: '/playground' },
  { label: 'Validator', href: '/validator' },
  { label: 'Benchmarks', href: '/benchmarks' },
  { label: 'Templates', href: '/templates' },
]

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="h-full font-sans antialiased bg-background text-foreground">
        <div className="flex min-h-full flex-col">
          <header className="border-b border-primary-200 bg-primary-50">
            <div className="mx-auto flex max-w-7xl flex-col gap-tatami-sm px-tatami-md py-tatami-sm md:flex-row md:items-center md:justify-between">
              <h1 className="text-xl font-semibold text-primary-800">TOON System</h1>
              <nav className="flex flex-wrap gap-tatami-md" aria-label="Navegação principal">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-primary-600 transition-colors duration-200 hover:text-primary-800"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>

          <main className="flex-1 py-tatami-xl">{children}</main>

          <footer className="border-t border-primary-200 bg-primary-50 py-tatami-md">
            <div className="mx-auto max-w-7xl px-tatami-md text-center text-sm text-primary-600">
              TOON Learning System - Desenvolvido com princípios de design oriental
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
