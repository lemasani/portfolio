import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Head from 'next/head'

import Navbar from './../components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lemasani',
  description: 'My portfolio website',
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
        <header className='relative top-0  p-3 flex items-center justify-center'>
          <Navbar />
        </header>
        {children}
        
      </body>
    </html>
  )
}
