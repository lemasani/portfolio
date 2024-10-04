import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Head from 'next/head'

import Navbar from './../components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lemasani',
  description: 'My portfolio website',
  keywords: ['web development', 'branding', 'next.js', 'tailwind css'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="logo.svg"   type="image/svg+xml"/>
      </Head>
      <body className={inter.className}>
        <header className='relative top-0 bg-background  p-3 flex flex-col items-center justify-center'>
          <Navbar />
        </header>
        {children}
        <footer className='container relative bottom-0 h-100 flex justify-around items-center p-2 text-white bg-primary '>
          <p>© {new Date().getFullYear()} Lemasani</p>

          <div className="social-links flex justify-center items-center gap-5">
            <a href="https://twitter.com/lemasani" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
            <a href="https://instagram.com/lemasani" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="https://github.com/lemasani" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </footer>
      </body>
    </html>
  )
}
