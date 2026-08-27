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
    <footer className="bg-slate-900 text-slate-200 border-t border-slate-800">
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Church Info & Socials */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-church-700 text-white">
                <Church className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-base text-white tracking-tight">
                  GPIB HOSIANA
                </h4>
                <p className="text-xs text-slate-400">Jemaat Hosiana Jakarta</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Gereja Protestan di Indonesia bagian Barat (GPIB) Jemaat Hosiana Jakarta. Melayani dengan kasih, bertumbuh dalam iman dan firman Tuhan.
            </p>
            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {youtube && (
                <a
                  href={youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider">
              Tautan Cepat
            </h4>
            <ul className="space-y-2.5 text-sm">
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
              <li>
                <Link href="/admin" className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1">
                  Panel CMS Admin <ExternalLink className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Persembahan / Rekening Bank */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-church-400" />
              <h4 className="font-semibold text-white text-sm uppercase tracking-wider">
                Informasi Rekening
              </h4>
            </div>
            <div className="p-4 rounded-lg bg-slate-800/80 border border-slate-700/80 space-y-2">
              <p className="text-xs text-church-300 font-medium uppercase tracking-wide">
                Persembahan &amp; Donasi
              </p>
              <p className="text-sm text-slate-300 whitespace-pre-line font-mono">
                {rekening}
              </p>
            </div>
          </div>

          {/* Column 4: Alamat & Peta */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-church-400" />
              <h4 className="font-semibold text-white text-sm uppercase tracking-wider">
                Alamat &amp; Lokasi
              </h4>
            </div>
            <p className="text-sm text-slate-400 whitespace-pre-line leading-relaxed">
              {alamat}
            </p>
            {embedMapUrl && (
              <div className="mt-2 rounded-lg overflow-hidden border border-slate-700 aspect-video max-h-36">
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

        <Separator className="my-8 bg-slate-800" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} GPIB Jemaat Hosiana Jakarta. Hak Cipta Dilindungi.</p>
          <p className="text-slate-600">Built with Next.js &amp; Payload CMS</p>
        </div>
      </div>
    </footer>
  )
}
