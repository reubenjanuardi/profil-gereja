import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Calendar, Clock, MapPin, User, Church, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDateTimeIndonesian } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Jadwal Ibadah',
  description: 'Jadwal Ibadah Hari Minggu, Ibadah Kategorial (Pelkat), dan Ibadah Khusus di GPIB Jemaat Hosiana Jakarta.',
}

export const revalidate = 60

export default async function JadwalPage() {
  let jadwalList: any[] = []

  try {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      collection: 'jadwal-ibadah',
      sort: 'waktu',
      limit: 50,
    })
    jadwalList = res.docs
  } catch (error) {
    console.error('Error fetching jadwal-ibadah:', error)
  }

  const primaryJadwal = jadwalList[0] || null
  const otherJadwal = jadwalList.slice(1)

  return (
    <main className="py-14 md:py-20">
      <div className="container max-w-5xl space-y-12">
        {/* Page Header (Left-Aligned Dignified Architecture) */}
        <div className="space-y-3 max-w-2xl text-left border-b border-slate-200 dark:border-slate-800 pb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Pelayanan Peribadahan
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Jadwal Ibadah Jemaat
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Informasi waktu, lokasi pelaksanaan, dan pelayan firman untuk seluruh ibadah Hari Minggu dan persekutuan kategorial GPIB Jemaat Hosiana Jakarta.
          </p>
        </div>

        {/* Schedule Presentation */}
        {jadwalList.length > 0 ? (
          <div className="space-y-8">
            {/* Featured Primary Schedule Card */}
            {primaryJadwal && (
              <div className="rounded-xl border border-slate-900/10 dark:border-slate-800 bg-slate-900 text-white p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/15 text-slate-100 border border-white/20">
                        Ibadah Terdekat
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        Gedung Gereja
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {primaryJadwal.nama_ibadah}
                    </h2>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-300">
                      <div className="flex items-center gap-2 font-mono text-white font-medium">
                        <Clock className="h-4 w-4 text-slate-400" />
                        {formatDateTimeIndonesian(primaryJadwal.waktu)}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-slate-400" />
                        {primaryJadwal.lokasi}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-white/15 md:pl-8 text-left space-y-1 shrink-0">
                    <span className="text-xs text-slate-400">Pelayan Firman:</span>
                    <p className="text-base sm:text-lg font-bold text-white">
                      {primaryJadwal.pelayan_firman}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Other Schedules in a Clean Asymmetric Grid */}
            {otherJadwal.length > 0 && (
              <div className="space-y-4 pt-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  Jadwal Ibadah Lainnya
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {otherJadwal.map((jadwal) => (
                    <Card
                      key={jadwal.id}
                      className="border-slate-200 dark:border-slate-800 bg-card hover:border-slate-400 dark:hover:border-slate-600 transition-colors shadow-xs"
                    >
                      <CardContent className="p-6 space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                              Persekutuan
                            </span>
                            <h4 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                              {jadwal.nama_ibadah}
                            </h4>
                          </div>
                          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0">
                            <Church className="h-4 w-4" />
                          </div>
                        </div>

                        <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
                          <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-mono font-medium">
                            <Clock className="h-4 w-4 text-slate-500 shrink-0" />
                            {formatDateTimeIndonesian(jadwal.waktu)}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-slate-500 shrink-0" />
                            <span>{jadwal.lokasi}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-semibold pt-1">
                            <User className="h-4 w-4 text-slate-500 shrink-0" />
                            <span>Pelayan: {jadwal.pelayan_firman}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-12 text-center rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
            <div className="flex justify-center mb-3 text-slate-400">
              <Calendar className="h-10 w-10" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              Belum Ada Jadwal Ibadah
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Jadwal ibadah saat ini belum ditambahkan oleh pengurus gereja. Silakan hubungi sekretariat atau kunjungi kembali nanti.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
