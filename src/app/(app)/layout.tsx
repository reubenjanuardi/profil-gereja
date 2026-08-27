import type { Metadata } from 'next'
import React from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'GPIB Jemaat Hosiana Jakarta',
  description: 'Website Profil & Informasi Publik GPIB Jemaat Hosiana Jakarta',
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="antialiased font-sans bg-background text-foreground min-h-screen">
        {children}
      </body>
    </html>
  )
}
