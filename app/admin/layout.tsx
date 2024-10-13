// app/admin/layout.tsx
import React from 'react'
import Sidebar from './Sidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-12 min-h-screen">
      <aside className="col-span-2 bg-gray-800 text-white h-screen">
        <Sidebar />
      </aside>
      <main className="col-span-10 pl-4 w-full">
        {children}
      </main>
    </div>
  )
}