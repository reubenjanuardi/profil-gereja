import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Church, Compass, History, BookOpen, Users2, Shield } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
      badge: 'Landasan Pelayanan',
    },
    {
      id: 'sejarah',
      title: 'Sejarah Gereja',
      icon: History,
      content: profilData?.sejarah,
      badge: 'Perjalanan Iman',
    },
    {
      id: 'pemahaman-iman',
      title: 'Pemahaman Iman',
      icon: BookOpen,
      content: profilData?.pemahaman_iman,
      badge: 'Pengakuan Iman GPIB',
    },
    {
      id: 'susunan-phmj',
      title: 'Susunan Pelaksana Harian Majelis Jemaat (PHMJ)',
      icon: Shield,
      content: profilData?.susunan_phmj,
      badge: 'Struktur Organisasi',
    },
    {
      id: 'susunan-pelkat',
      title: 'Pelayanan Kategorial (Pelkat) & Unit Missioner',
      icon: Users2,
      content: profilData?.susunan_pelkat,
      badge: 'Unit Pembinaan',
    },
  ]

  return (
    <main className="py-12 lg:py-16">
      <div className="container max-w-5xl">
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <Badge variant="church" className="px-3.5 py-1 text-xs">
            Tentang Kami
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Profil GPIB Jemaat Hosiana Jakarta
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            Mengenal visi, misi, sejarah perjalanan jemaat, pengakuan iman, serta struktur pelayanan presbiterial sinodal GPIB Jemaat Hosiana Jakarta.
          </p>
        </div>

        {/* Navigation Shortcut Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-church-100 hover:text-church-900 dark:hover:bg-slate-700 transition"
            >
              {section.title}
            </a>
          ))}
        </div>

        {/* Content Sections */}
        <div className="space-y-10">
          {sections.map((section) => {
            const Icon = section.icon

            return (
              <Card
                key={section.id}
                id={section.id}
                className="scroll-mt-24 border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <CardHeader className="p-6 pb-4 border-b bg-slate-50/70 dark:bg-slate-900/50">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-church-800 text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        {section.title}
                      </CardTitle>
                    </div>
                    <Badge variant="outline" className="hidden sm:inline-flex text-xs text-church-800 border-church-300">
                      {section.badge}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 sm:p-8">
                  <RichText content={section.content} />
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </main>
  )
}
