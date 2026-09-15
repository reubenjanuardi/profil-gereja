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
  Church,
  ShieldCheck,
  Compass,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDateIndonesian, formatDateTimeIndonesian } from '@/lib/utils'

export const revalidate = 60

export default async function HomePage() {
  let heroCarousels: any[] = []
  let pengumumanList: any[] = []
  let temaGereja: any = null
  let upcomingJadwal: any[] = []
  let latestDokumen: any[] = []

  try {
    const payload = await getPayload({ config: configPromise })

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

    temaGereja = await payload.findGlobal({
      slug: 'tema-gereja',
    })

    const jadwalRes = await payload.find({
      collection: 'jadwal-ibadah',
      sort: 'waktu',
      limit: 3,
    })
    upcomingJadwal = jadwalRes.docs

    const dokumenRes = await payload.find({
      collection: 'dokumen-gereja',
      sort: '-periode_tanggal',
      limit: 3,
    })
    latestDokumen = dokumenRes.docs
  } catch (error) {
    console.error('Error fetching data for Homepage:', error)
  }

  const heroSlide = heroCarousels[0] || null
  const heroImageUrl =
    typeof heroSlide?.gambar === 'object' && heroSlide?.gambar?.url
      ? heroSlide.gambar.url
      : null
  const heroText =
    heroSlide?.teks_sambutan ||
    'Melayani dengan Kasih, Bersekutu dalam Terang Firman'

  const featuredNotice = pengumumanList[0] || null
  const secondaryNotices = pengumumanList.slice(1)

  return (
    <main className="min-h-screen">
      {/* 1. ASYMMETRIC SPLIT HERO SECTION */}
      <section className="relative w-full border-b border-slate-200 dark:border-slate-800 bg-slate-950 text-white overflow-hidden">
        {/* Subtle architectural gradient base */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950 opacity-95" />

        {/* Church Image Ambient Underlay */}
        {heroImageUrl && (
          <div className="absolute inset-0 opacity-20 mix-blend-luminosity pointer-events-none">
            <Image
              src={heroImageUrl}
              alt={heroSlide?.gambar?.alt || 'Gedung Gereja GPIB Hosiana Jakarta'}
              fill
              priority
              className="object-cover object-center"
            />
          </div>
        )}

        <div className="container relative z-10 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column (7 cols): Asymmetric Left-Aligned Typography */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 border border-white/15 text-xs font-semibold text-slate-200">
                <Church className="h-3.5 w-3.5 text-slate-300" />
                GPIB Jemaat Hosiana Jakarta
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
                {heroText}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-[54ch] font-normal leading-relaxed">
                Pusat informasi warta jemaat, tata ibadah digital, jadwal persekutuan hari Minggu, dan pelayanan kategorial di Jakarta.
              </p>

              {/* Dual Primary CTAs (No Wrapping) */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  size="lg"
                  asChild
                  className="bg-white text-slate-950 hover:bg-slate-100 font-semibold shadow-sm tactile-press px-6"
                >
                  <Link href="/jadwal" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Jadwal Ibadah
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-white/25 text-white hover:bg-white/10 font-semibold backdrop-blur-xs tactile-press px-6"
                >
                  <Link href="/warta" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Warta &amp; Tata Ibadah
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Column (5 cols): Live Ministry Schedule Card Preview */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-white/15 bg-white/5 backdrop-blur-md p-6 sm:p-7 space-y-5 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Ibadah Terdekat
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Terbuka untuk Jemaat
                  </span>
                </div>

                {upcomingJadwal.length > 0 ? (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <p className="text-lg font-bold text-white">
                        {upcomingJadwal[0].nama_ibadah}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span>{formatDateTimeIndonesian(upcomingJadwal[0].waktu)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span>{upcomingJadwal[0].lokasi}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-200 pt-1 font-medium">
                        <User className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span>Pelayan: {upcomingJadwal[0].pelayan_firman}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="text-slate-400">
                        {upcomingJadwal.length > 1 ? `+${upcomingJadwal.length - 1} jadwal lainnya` : 'Gedung Gereja'}
                      </span>
                      <Link
                        href="/jadwal"
                        className="text-white font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        Semua Jadwal <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="py-6 text-center text-xs text-slate-400">
                    Belum ada jadwal terdaftar. Kunjungi halaman Jadwal untuk informasi terkini.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ASYMMETRIC NOTICE BOARD (PENGUMUMAN MENDESAK) */}
      {pengumumanList.length > 0 && (
        <section className="bg-amber-500/10 border-b border-amber-500/20 py-8">
          <div className="container">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-600 text-white shadow-xs">
                <BellRing className="h-4 w-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                Papan Pengumuman &amp; Warta Terkini
              </h2>
            </div>

            {/* Asymmetric layout: 1 wide featured bulletin + right stack */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {featuredNotice && (
                <div className={secondaryNotices.length > 0 ? 'lg:col-span-7' : 'lg:col-span-12'}>
                  <Card className="h-full border-amber-300/80 bg-white dark:bg-slate-900 shadow-sm p-6 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300">
                        Penting
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Berlaku hingga: {formatDateIndonesian(featuredNotice.expiry_date)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {featuredNotice.judul}
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                      {featuredNotice.isi_ringkas}
                    </p>
                  </Card>
                </div>
              )}

              {secondaryNotices.length > 0 && (
                <div className="lg:col-span-5 space-y-4">
                  {secondaryNotices.map((notice) => (
                    <Card key={notice.id} className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                          {notice.judul}
                        </h4>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 shrink-0">
                          {formatDateIndonesian(notice.expiry_date)}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                        {notice.isi_ringkas}
                      </p>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 3. TEMA GEREJA STATEMENT BLOCK (ARCHITECTURAL MONOLITH) */}
      {temaGereja?.tema_tahunan && (
        <section className="py-14 bg-slate-900 text-white border-b border-slate-800">
          <div className="container max-w-4xl mx-auto text-center space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
              Tema Tahunan GPIB
            </span>
            <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-50 tracking-tight leading-snug">
              &ldquo;{temaGereja.tema_tahunan}&rdquo;
            </blockquote>
            {temaGereja?.tema_jangka_pendek && (
              <p className="text-sm text-slate-400 italic max-w-2xl mx-auto pt-1">
                {temaGereja.tema_jangka_pendek}
              </p>
            )}
          </div>
        </section>
      )}

      {/* 4. ASYMMETRIC BENTO: UPCOMING JADWAL & LATEST WARTA */}
      <section className="py-16 md:py-20 container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left Block (7 cols): Jadwal Ibadah */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-end justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Jadwal Ibadah Minggu
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Informasi pelaksanaan ibadah jemaat dan kategorial.
                </p>
              </div>
              <Button variant="ghost" size="sm" asChild className="text-xs font-semibold gap-1">
                <Link href="/jadwal">
                  Lihat Semua <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>

            {upcomingJadwal.length > 0 ? (
              <div className="space-y-3">
                {upcomingJadwal.map((jadwal) => (
                  <div
                    key={jadwal.id}
                    className="p-5 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-card hover:border-slate-400 dark:hover:border-slate-600 transition-colors shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="church">{jadwal.nama_ibadah}</Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-300 pt-1">
                        <span className="flex items-center gap-1 font-mono">
                          <Clock className="h-3.5 w-3.5 text-slate-500" />
                          {formatDateTimeIndonesian(jadwal.waktu)}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-slate-500" />
                          {jadwal.lokasi}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 font-medium pt-0.5">
                        Pelayan Firman: {jadwal.pelayan_firman}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-lg border border-dashed text-center text-xs text-slate-500">
                Belum ada jadwal ibadah yang ditambahkan.
              </div>
            )}
          </div>

          {/* Right Block (5 cols): Warta & Dokumen PDF Unduh Cepat */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-end justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Warta &amp; Dokumen
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Unduh berkas PDF Warta Jemaat dan Tata Ibadah.
                </p>
              </div>
              <Button variant="ghost" size="sm" asChild className="text-xs font-semibold gap-1">
                <Link href="/warta">
                  Arsip <ArrowRight className="h-3.5 w-3.5" />
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

                  const isWarta = doc.jenis_dokumen === 'warta'

                  return (
                    <div
                      key={doc.id}
                      className="p-4 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-card hover:border-slate-400 dark:hover:border-slate-600 transition-colors shadow-xs flex items-center justify-between gap-3"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              isWarta
                                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                                : 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200'
                            }`}
                          >
                            {isWarta ? 'Warta Jemaat' : 'Tata Ibadah'}
                          </span>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400">
                            {formatDateIndonesian(doc.periode_tanggal)}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                          {doc.judul}
                        </p>
                      </div>

                      {pdfUrl ? (
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                          className="shrink-0 gap-1.5 text-xs font-semibold border-slate-300 dark:border-slate-700 tactile-press"
                        >
                          <a href={pdfUrl} target="_blank" rel="noopener noreferrer" download>
                            <Download className="h-3.5 w-3.5" />
                            PDF
                          </a>
                        </Button>
                      ) : (
                        <span className="text-xs text-slate-400 italic shrink-0">
                          Belum ada file
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="p-8 rounded-lg border border-dashed text-center text-xs text-slate-500">
                Belum ada dokumen yang diunggah.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. TENTANG GEREJA CALLOUT (ARCHITECTURAL INVITATION TILE) */}
      <section className="bg-slate-100 dark:bg-slate-900/50 py-16 border-t border-slate-200 dark:border-slate-800">
        <div className="container max-w-4xl mx-auto">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-card p-8 sm:p-10 shadow-xs space-y-6 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Mengenal GPIB Hosiana
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Pelayanan, Visi, dan Pemahaman Iman
                </h3>
              </div>
              <Button asChild className="bg-slate-900 text-slate-50 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 font-semibold tactile-press shrink-0">
                <Link href="/profil" className="flex items-center gap-2">
                  Profil Lengkap <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-600 dark:text-slate-300">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                  <ShieldCheck className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                  Presbiterial Sinodal
                </div>
                <p className="leading-relaxed">
                  Tata gereja terpimpin dalam musyawarah para presbiter (Penatua dan Diaken) bersama jemaat.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                  <Compass className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                  6 Pelkat Kategorial
                </div>
                <p className="leading-relaxed">
                  Pelayanan untuk seluruh usia dari Anak (PA), Teruna (PT), Pemuda (GP), Perempuan (PKP), Kaum Bapak (PKB), hingga Lanjut Usia (PKLU).
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                  <Church className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                  Gereja Terbuka
                </div>
                <p className="leading-relaxed">
                  Terbuka bagi seluruh umat yang rindu bersekutu, mendengarkan firman, dan bertumbuh dalam kasih Kristus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
