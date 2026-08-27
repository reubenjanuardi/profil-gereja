import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Calendar, Clock, MapPin, User, Church } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

  return (
    <main className="py-12 lg:py-16">
      <div className="container max-w-5xl">
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <Badge variant="church" className="px-3.5 py-1 text-xs">
            Pelayanan Ibadah
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Jadwal Ibadah Jemaat
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            Informasi waktu, lokasi, dan pelayan firman untuk seluruh rangkaian ibadah Hari Minggu, Ibadah Keluarga, dan Ibadah Pelkat di GPIB Jemaat Hosiana Jakarta.
          </p>
        </div>

        {/* Schedule List / Grid */}
        {jadwalList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jadwalList.map((jadwal) => (
              <Card key={jadwal.id} className="border-slate-200 dark:border-slate-800 shadow-sm hover:border-church-400 hover:shadow-md transition-all">
                <CardHeader className="p-6 pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                        {jadwal.nama_ibadah}
                      </CardTitle>
                    </div>
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-church-50 text-church-800 dark:bg-church-950 dark:text-church-200">
                      <Church className="h-5 w-5" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-2 space-y-4">
                  <div className="space-y-2.5 text-sm">
                    <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                      <Clock className="h-4 w-4 text-church-600 shrink-0" />
                      <span className="font-medium">{formatDateTimeIndonesian(jadwal.waktu)}</span>
                    </div>

                    <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                      <MapPin className="h-4 w-4 text-church-600 shrink-0" />
                      <span>{jadwal.lokasi}</span>
                    </div>

                    <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                      <User className="h-4 w-4 text-church-600 shrink-0" />
                      <span>
                        Pelayan Firman:{' '}
                        <strong className="text-slate-900 dark:text-white font-semibold">
                          {jadwal.pelayan_firman}
                        </strong>
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center bg-slate-50 dark:bg-slate-900">
            <div className="flex justify-center mb-3">
              <Calendar className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
              Belum Ada Jadwal Ibadah
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Saat ini belum ada jadwal ibadah yang dipublikasikan. Silakan periksa kembali beberapa saat lagi.
            </p>
          </Card>
        )}
      </div>
    </main>
  )
}
