import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { MapPin, CreditCard, Instagram, Youtube, Church, ExternalLink } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

export async function Footer() {
  let generalSettings: any = null
  try {
    const payload = await getPayload({ config: configPromise })
    generalSettings = await payload.findGlobal({ slug: 'general-settings' })
  } catch (error) {
    console.error('Error fetching general-settings in Footer:', error)
  }

  const alamat = generalSettings?.alamat_gereja || 'Jl. Raya GPIB Hosiana, DKI Jakarta'
  const rekening = generalSettings?.nomor_rekening || 'Bank BCA: 1234567890\na.n. GPIB Jemaat Hosiana'
  const instagram = generalSettings?.link_instagram
  const youtube = generalSettings?.link_youtube
  const embedMapUrl = generalSettings?.embed_map_url

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="container py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Column 1: Church Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-900 border border-slate-800 text-slate-100 shadow-xs">
                <Church className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div>
                <h4 className="font-bold text-base text-white tracking-tight">
                  GPIB JEMAAT HOSIANA
                </h4>
                <p className="text-xs text-slate-400">DKI Jakarta</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Gereja Protestan di Indonesia bagian Barat (GPIB). Berakar dalam firman, bertumbuh dalam persekutuan, dan berbuah bagi sesama.
            </p>
            {/* Social Channels */}
            {(instagram || youtube) && (
              <div className="flex items-center gap-2.5 pt-1">
                {instagram && (
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-600 transition-colors tactile-press"
                    aria-label="Instagram Resmi"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                )}
                {youtube && (
                  <a
                    href={youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-600 transition-colors tactile-press"
                    aria-label="Kanal YouTube"
                  >
                    <Youtube className="h-4 w-4" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Column 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider text-slate-400">
              Navigasi
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-slate-400 hover:text-white transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/jadwal" className="text-slate-400 hover:text-white transition-colors">
                  Jadwal Ibadah
                </Link>
              </li>
              <li>
                <Link href="/warta" className="text-slate-400 hover:text-white transition-colors">
                  Warta &amp; Tata Ibadah
                </Link>
              </li>
              <li>
                <Link href="/profil" className="text-slate-400 hover:text-white transition-colors">
                  Profil Gereja
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/admin" className="text-slate-500 hover:text-slate-300 transition-colors inline-flex items-center gap-1.5 text-xs">
                  CMS Admin <ExternalLink className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Persembahan / Rekening Bank (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-slate-400" />
              <h4 className="font-semibold text-xs uppercase tracking-wider text-slate-400">
                Informasi Rekening
              </h4>
            </div>
            <div className="p-4 rounded-md bg-slate-900/90 border border-slate-800/90 space-y-1.5">
              <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">
                Persembahan Jemaat
              </p>
              <div className="text-xs text-slate-200 whitespace-pre-line font-mono leading-relaxed">
                {rekening}
              </div>
            </div>
          </div>

          {/* Column 4: Alamat & Peta (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-slate-400" />
              <h4 className="font-semibold text-xs uppercase tracking-wider text-slate-400">
                Alamat Gedung Gereja
              </h4>
            </div>
            <p className="text-xs text-slate-400 whitespace-pre-line leading-relaxed">
              {alamat}
            </p>
            {embedMapUrl && (
              <div className="mt-2 rounded-md overflow-hidden border border-slate-800 aspect-video max-h-32 bg-slate-900">
                <iframe
                  src={embedMapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Gereja"
                />
              </div>
            )}
          </div>
        </div>

        <Separator className="my-8 bg-slate-800/80" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} GPIB Jemaat Hosiana Jakarta. Seluruh hak cipta dilindungi.</p>
          <p className="text-slate-600">Pelayanan Berbasis Digital &amp; Terbuka</p>
        </div>
      </div>
    </footer>
  )
}
