import React from 'react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-slate-50 dark:bg-slate-900">
      <div className="max-w-2xl bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
          GPIB Jemaat Hosiana Jakarta
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-6">
          Website Profil &amp; Informasi Publik terintegrasi dengan Payload CMS v3
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/admin"
            className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg shadow transition"
          >
            Buka Payload CMS Admin (/admin)
          </Link>
        </div>
      </div>
    </main>
  )
}
