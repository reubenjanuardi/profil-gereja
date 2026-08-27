import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import {
  Calendar,
  FileText,
  BellRing,
  ArrowRight,
  Clock,
  MapPin,
  User,
  Download,
  Quote,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDateIndonesian, formatDateTimeIndonesian } from '@/lib/utils'

export const revalidate = 60 // Revalidate cache every 60 seconds

export default async function HomePage() {
  let heroCarousels: any[] = []
  let pengumumanList: any[] = []
  let temaGereja: any = null
  let upcomingJadwal: any[] = []
  let latestDokumen: any[] = []

  try {
    const payload = await getPayload({ config: configPromise })

    // 1. Fetch Active Hero Carousels
    const heroRes = await payload.find({
      collection: 'hero-carousel',
      where: {
        is_active: {
          equals: true,
        },
      },
      sort: 'urutan',
      limit: 5,
    })
    heroCarousels = heroRes.docs

    // 2. Fetch Active Pengumuman (expiry_date >= now)
    const nowIso = new Date().toISOString()
    const pengumumanRes = await payload.find({
      collection: 'pengumuman',
      where: {
        expiry_date: {
          greater_than_equal: nowIso,
        },
      },
      sort: '-createdAt',
      limit: 3,
    })
    pengumumanList = pengumumanRes.docs

    // 3. Fetch Tema Gereja Global
    temaGereja = await payload.findGlobal({
      slug: 'tema-gereja',
    })

    // 4. Fetch Jadwal Ibadah (upcoming)
    const jadwalRes = await payload.find({
      collection: 'jadwal-ibadah',
      sort: 'waktu',
      limit: 3,
    })
    upcomingJadwal = jadwalRes.docs

    // 5. Fetch Latest Dokumen (Warta & Tata Ibadah)
    const dokumenRes = await payload.find({
      collection: 'dokumen-gereja',
      sort: '-periode_tanggal',
      limit: 4,
    })
    latestDokumen = dokumenRes.docs
  } catch (error) {
    console.error('Error fetching data for Homepage:', error)
  }

  // Active Hero Slide (Default or First)
  const heroSlide = heroCarousels[0] || null
  const heroImageUrl =
    typeof heroSlide?.gambar === 'object' && heroSlide?.gambar?.url
      ? heroSlide.gambar.url
      : null
  const heroText =
    heroSlide?.teks_sambutan ||
    'Selamat Datang di Website Resmi GPIB Jemaat Hosiana Jakarta'

  return (
    <main className="min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[480px] lg:min-h-[560px] flex items-center justify-center bg-slate-950 text-white overflow-hidden">
        {/* Background Image with Dark Gradient Overlay */}
        {heroImageUrl ? (
          <Image
            src={heroImageUrl}
            alt={heroSlide?.gambar?.alt || 'Gedung GPIB Jemaat Hosiana Jakarta'}
            fill
            priority
            className="object-cover object-center opacity-40 scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-church-950 via-slate-900 to-slate-950" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

        {/* Hero Content */}
        <div className="container relative z-10 py-16 text-center max-w-4xl mx-auto space-y-6">
          <Badge variant="secondary" className="px-4 py-1.5 text-xs font-semibold bg-white/10 text-church-200 border-white/20 backdrop-blur">
            Gereja Protestan di Indonesia bagian Barat
          </Badge>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {heroText}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Menyajikan informasi jadwal ibadah, warta jemaat, tata ibadah, dan kegiatan pelayanan secara terbuka, ringkas, dan informatif.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <Button size="lg" asChild className="bg-church-600 hover:bg-church-700 text-white font-semibold shadow-lg">
              <Link href="/jadwal" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Jadwal Ibadah
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white/30 text-white hover:bg-white/10 font-semibold backdrop-blur">
              <Link href="/warta" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Warta &amp; Tata Ibadah
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. NOTICE BOARD (PENGUMUMAN MENDESAK/TERKINI) */}
      {pengumumanList.length > 0 && (
        <section className="bg-amber-500/10 border-y border-amber-500/20 py-6">
          <div className="container">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-500 text-slate-950 font-bold">
                <BellRing className="h-4 w-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-amber-400">
                Papan Pengumuman &amp; Warta Terkini
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pengumumanList.map((item) => (
                <Card key={item.id} className="border-amber-200/80 bg-white dark:bg-slate-900 shadow-sm">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between gap-2">
                      <CardTitle className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">
                        {item.judul}
                      </CardTitle>
                      <Badge variant="outline" className="text-[10px] text-amber-700 border-amber-300 shrink-0">
                        Hingga: {formatDateIndonesian(item.expiry_date)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-1">
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 whitespace-pre-line">
                      {item.isi_ringkas}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. TEMA GEREJA BLOK */}
      {temaGereja?.tema_tahunan && (
        <section className="py-12 bg-slate-100 dark:bg-slate-900/50 border-b">
          <div className="container max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-church-100 text-church-900 text-xs font-semibold uppercase tracking-wider">
              <Quote className="h-3.5 w-3.5" />
              Tema Tahunan GPIB
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
              &ldquo;{temaGereja.tema_tahunan}&rdquo;
            </h3>
            {temaGereja?.tema_jangka_pendek && (
              <p className="text-sm text-slate-600 dark:text-slate-300 italic max-w-2xl mx-auto">
                {temaGereja.tema_jangka_pendek}
              </p>
            )}
          </div>
        </section>
      )}

      {/* 4. UPCOMING JADWAL IBADAH & LATEST DOKUMEN SECTION */}
      <section className="py-16 container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Jadwal Ibadah Terdekat (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Jadwal Ibadah
                </h2>
                <p className="text-sm text-muted-foreground">
                  Informasi pelaksanaan ibadah jemaat dan kategorial.
                </p>
              </div>
              <Button variant="ghost" size="sm" asChild className="gap-1 text-church-700 hover:text-church-900">
                <Link href="/jadwal">
                  Lihat Semua <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {upcomingJadwal.length > 0 ? (
              <div className="space-y-3.5">
                {upcomingJadwal.map((jadwal) => (
                  <Card key={jadwal.id} className="hover:border-church-300 transition-colors">
                    <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <Badge variant="church">{jadwal.nama_ibadah}</Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-muted-foreground pt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-church-600" />
                            {formatDateTimeIndonesian(jadwal.waktu)}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-church-600" />
                            {jadwal.lokasi}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-700 dark:text-slate-300 font-medium">
                          <User className="h-3.5 w-3.5 text-muted-foreground" />
                          Pelayan Firman: {jadwal.pelayan_firman}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center bg-slate-50 dark:bg-slate-900">
                <p className="text-sm text-muted-foreground">
                  Belum ada jadwal ibadah yang ditambahkan. Silakan periksa kembali nanti.
                </p>
              </Card>
            )}
          </div>

          {/* Right Column: Warta & Tata Ibadah Terkini (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Warta &amp; Dokumen
                </h2>
                <p className="text-sm text-muted-foreground">
                  Unduh berkas PDF Warta Jemaat &amp; Tata Ibadah.
                </p>
              </div>
              <Button variant="ghost" size="sm" asChild className="gap-1 text-church-700 hover:text-church-900">
                <Link href="/warta">
                  Arsip <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {latestDokumen.length > 0 ? (
              <div className="space-y-3">
                {latestDokumen.map((doc) => {
                  const pdfUrl =
                    typeof doc.file_pdf === 'object' && doc.file_pdf?.url
                      ? doc.file_pdf.url
                      : null

                  return (
                    <Card key={doc.id} className="hover:border-church-300 transition-colors">
                      <CardContent className="p-4 flex items-center justify-between gap-3">
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={doc.jenis_dokumen === 'warta' ? 'default' : 'secondary'}
                              className="text-[10px]"
                            >
                              {doc.jenis_dokumen === 'warta' ? 'Warta Jemaat' : 'Tata Ibadah'}
                            </Badge>
                            <span className="text-[11px] text-muted-foreground">
                              {formatDateIndonesian(doc.periode_tanggal)}
                            </span>
                          </div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                            {doc.judul}
                          </p>
                        </div>

                        {pdfUrl ? (
                          <Button size="sm" variant="outline" asChild className="shrink-0 gap-1 text-xs">
                            <a href={pdfUrl} target="_blank" rel="noopener noreferrer" download>
                              <Download className="h-3.5 w-3.5" />
                              PDF
                            </a>
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" disabled className="shrink-0 text-xs">
                            Tidak Ada File
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <Card className="p-8 text-center bg-slate-50 dark:bg-slate-900">
                <p className="text-sm text-muted-foreground">
                  Belum ada dokumen yang diunggah.
                </p>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* 5. PROFIL GEREJA CALLOUT */}
      <section className="bg-slate-100 dark:bg-slate-900/60 py-16 border-t">
        <div className="container text-center max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-church-700 text-white text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            Tentang GPIB Jemaat Hosiana Jakarta
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Mengenal Lebih Dekat Pelayanan &amp; Visi Gereja
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Pelajari sejarah perjalanan jemaat, pemahaman iman, susunan Pelaksana Harian Majelis Jemaat (PHMJ), serta unit-unit kategorial (Pelkat) yang melayani di tengah jemaat dan masyarakat.
          </p>
          <Button asChild size="lg" className="bg-church-800 hover:bg-church-900 text-white font-semibold">
            <Link href="/profil" className="flex items-center gap-2">
              Baca Profil Lengkap <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
