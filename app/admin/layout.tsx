'use client'
import React from 'react'
import Sidebar from './Sidebar'

import { SessionProvider  } from 'next-auth/react'


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="grid grid-cols-12 min-h-screen">
        <aside className="col-span-2 bg-gray-800 text-white h-screen">
          <Sidebar />
        </aside>
        <main className="col-span-10 pl-4 w-full">
          {children}
        </main>
      </div>
    </SessionProvider>
  )
}