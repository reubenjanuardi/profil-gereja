import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Compass, History, BookOpen, Users2, Shield, Church } from 'lucide-react'
import { RichText } from '@/components/RichText'

export const metadata: Metadata = {
  title: 'Profil Gereja',
  description: 'Visi & Misi, Sejarah, Pemahaman Iman, Susunan PHMJ, dan Pelkat GPIB Jemaat Hosiana Jakarta.',
}

export const revalidate = 60

export default async function ProfilPage() {
  let profilData: any = null

  try {
    const payload = await getPayload({ config: configPromise })
    profilData = await payload.findGlobal({
      slug: 'profil-gereja',
    })
  } catch (error) {
    console.error('Error fetching profil-gereja:', error)
  }

  const sections = [
    {
      id: 'visi-misi',
      title: 'Visi & Misi',
      icon: Compass,
      content: profilData?.visi_misi,
      category: 'Landasan Pelayanan',
    },
    {
      id: 'sejarah',
      title: 'Sejarah Gereja',
      icon: History,
      content: profilData?.sejarah,
      category: 'Perjalanan Iman',
    },
    {
      id: 'pemahaman-iman',
      title: 'Pemahaman Iman',
      icon: BookOpen,
      content: profilData?.pemahaman_iman,
      category: 'Pengakuan Iman GPIB',
    },
    {
      id: 'susunan-phmj',
      title: 'Susunan PHMJ',
      fullTitle: 'Pelaksana Harian Majelis Jemaat (PHMJ)',
      icon: Shield,
      content: profilData?.susunan_phmj,
      category: 'Struktur Kepemimpinan',
    },
    {
      id: 'susunan-pelkat',
      title: 'Pelkat & Unit Missioner',
      fullTitle: 'Pelayanan Kategorial (Pelkat) & Unit Missioner',
      icon: Users2,
      content: profilData?.susunan_pelkat,
      category: 'Pembinaan Jemaat',
    },
  ]

  return (
    <main className="py-14 md:py-20">
      <div className="container max-w-6xl space-y-12">
        {/* Page Header (Architectural Editorial Style) */}
        <div className="space-y-3 max-w-2xl text-left border-b border-slate-200 dark:border-slate-800 pb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Mengenal Lebih Dekat
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Profil GPIB Hosiana Jakarta
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Visi, misi, sejarah jemaat, pengakuan iman, serta susunan kepengurusan gereja di bawah naungan Gereja Protestan di Indonesia bagian Barat.
          </p>
        </div>

        {/* 2-Column Editorial Magazine Layout (Sticky Sidebar TOC + Main Content) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Sticky Left Sidebar (3 cols on desktop) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-card p-5 space-y-4 shadow-xs">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-900 text-slate-50 dark:bg-slate-100 dark:text-slate-900">
                  <Church className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Daftar Bagian
                </span>
              </div>

              <nav className="flex flex-col space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-950 dark:hover:text-white transition-colors"
                  >
                    <span>{section.title}</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      #{section.id}
                    </span>
                  </a>
                ))}
              </nav>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 leading-relaxed">
                Tata Gereja berasaskan Presbiterial Sinodal berpusat pada Kristus sebagai Kepala Gereja.
              </div>
            </div>
          </aside>

          {/* Main Reading Canvas (8 cols on desktop) */}
          <div className="lg:col-span-8 space-y-14">
            {sections.map((section) => {
              const Icon = section.icon
              const displayTitle = section.fullTitle || section.title

              return (
                <article
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28 space-y-6 pb-12 border-b border-slate-200 dark:border-slate-800 last:border-b-0"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                        {section.category}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        {displayTitle}
                      </h2>
                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="pt-2">
                    <RichText content={section.content} />
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}
