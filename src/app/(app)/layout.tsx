import type { Metadata } from 'next'
import React from 'react'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'GPIB Jemaat Hosiana Jakarta',
    template: '%s | GPIB Jemaat Hosiana Jakarta',
  },
  description: 'Website Profil & Informasi Publik Resmi GPIB Jemaat Hosiana Jakarta. Temukan jadwal ibadah, warta jemaat, tata ibadah, pengumuman, dan profil gereja.',
  keywords: ['GPIB', 'Hosiana Jakarta', 'Gereja Protestan', 'Jadwal Ibadah', 'Warta Jemaat', 'Tata Ibadah'],
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="antialiased font-sans bg-background text-foreground min-h-screen flex flex-col selection:bg-church-100 selection:text-church-900">
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
