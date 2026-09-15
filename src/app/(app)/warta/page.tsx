import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { WartaFilterableList } from './WartaFilterableList'

export const metadata: Metadata = {
  title: 'Warta Jemaat & Tata Ibadah',
  description: 'Unduh dokumen PDF Warta Jemaat dan Tata Ibadah GPIB Jemaat Hosiana Jakarta.',
}

export const revalidate = 60

export default async function WartaPage() {
  let dokumenList: any[] = []

  try {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      collection: 'dokumen-gereja',
      sort: '-periode_tanggal',
      limit: 100,
    })
    dokumenList = res.docs
  } catch (error) {
    console.error('Error fetching dokumen-gereja:', error)
  }

  return (
    <main className="py-14 md:py-20">
      <div className="container max-w-5xl space-y-10">
        {/* Header (Left-Aligned Architectural Design) */}
        <div className="space-y-3 max-w-2xl text-left border-b border-slate-200 dark:border-slate-800 pb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Pusat Publikasi &amp; Arsip
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Warta &amp; Tata Ibadah
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Arsip digital resmi Warta Jemaat mingguan dan buku panduan Tata Ibadah Hari Minggu serta Ibadah Kategorial GPIB Jemaat Hosiana Jakarta.
          </p>
        </div>

        {/* Client Interactive Filter & Archive List */}
        <WartaFilterableList items={dokumenList} />
      </div>
    </main>
  )
}
