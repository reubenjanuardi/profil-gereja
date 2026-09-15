'use client'

import * as React from 'react'
import { FileText, Download, Calendar, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatDateIndonesian } from '@/lib/utils'

type DokumenItem = {
  id: number | string
  judul: string
  jenis_dokumen: 'warta' | 'tata_ibadah' | string
  periode_tanggal: string
  file_pdf?: {
    url?: string
    filename?: string
    filesize?: number
  } | any
}

export function WartaFilterableList({ items }: { items: DokumenItem[] }) {
  const [filter, setFilter] = React.useState<'all' | 'warta' | 'tata_ibadah'>('all')
  const [search, setSearch] = React.useState('')

  const filteredItems = React.useMemo(() => {
    return items.filter((item) => {
      const matchFilter = filter === 'all' || item.jenis_dokumen === filter
      const matchSearch =
        search.trim() === '' ||
        item.judul.toLowerCase().includes(search.toLowerCase())
      return matchFilter && matchSearch
    })
  }, [items, filter, search])

  const latestWarta = items.find((i) => i.jenis_dokumen === 'warta')
  const latestTataIbadah = items.find((i) => i.jenis_dokumen === 'tata_ibadah')

  return (
    <div className="space-y-8">
      {/* Featured Quick Cards (Warta Terakhir & Tata Ibadah Terakhir) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {latestWarta && (
          <div className="rounded-xl border border-slate-900 dark:border-slate-800 bg-slate-900 text-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/15 text-slate-100 border border-white/20">
                Warta Jemaat Edisi Terbaru
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {formatDateIndonesian(latestWarta.periode_tanggal)}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight line-clamp-1">
              {latestWarta.judul}
            </h3>
            {latestWarta.file_pdf?.url ? (
              <Button
                size="sm"
                asChild
                className="w-full bg-white text-slate-950 hover:bg-slate-100 font-semibold tactile-press gap-2"
              >
                <a
                  href={latestWarta.file_pdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={latestWarta.file_pdf?.filename || 'warta-jemaat.pdf'}
                >
                  <Download className="h-4 w-4" />
                  Unduh Warta Jemaat (PDF)
                </a>
              </Button>
            ) : (
              <Button size="sm" disabled className="w-full">
                File Belum Tersedia
              </Button>
            )}
          </div>
        )}

        {latestTataIbadah && (
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-card p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                Tata Ibadah Minggu Ini
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {formatDateIndonesian(latestTataIbadah.periode_tanggal)}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight line-clamp-1">
              {latestTataIbadah.judul}
            </h3>
            {latestTataIbadah.file_pdf?.url ? (
              <Button
                size="sm"
                variant="outline"
                asChild
                className="w-full font-semibold tactile-press gap-2 border-slate-300 dark:border-slate-700"
              >
                <a
                  href={latestTataIbadah.file_pdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={latestTataIbadah.file_pdf?.filename || 'tata-ibadah.pdf'}
                >
                  <Download className="h-4 w-4" />
                  Unduh Tata Ibadah (PDF)
                </a>
              </Button>
            ) : (
              <Button size="sm" variant="outline" disabled className="w-full">
                File Belum Tersedia
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg w-fit border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all tactile-press ${
              filter === 'all'
                ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Semua Arsip ({items.length})
          </button>
          <button
            onClick={() => setFilter('warta')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all tactile-press ${
              filter === 'warta'
                ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Warta Jemaat
          </button>
          <button
            onClick={() => setFilter('tata_ibadah')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all tactile-press ${
              filter === 'tata_ibadah'
                ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Tata Ibadah
          </button>
        </div>

        {/* Live Search Filter */}
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Cari judul dokumen..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-background text-foreground placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100"
          />
        </div>
      </div>

      {/* Archive Table */}
      {filteredItems.length > 0 ? (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-card overflow-hidden shadow-xs">
          <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-900/80">
              <TableRow className="border-b border-slate-200 dark:border-slate-800">
                <TableHead className="w-[50%] font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Judul Dokumen
                </TableHead>
                <TableHead className="w-[18%] font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Kategori
                </TableHead>
                <TableHead className="w-[18%] font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Periode
                </TableHead>
                <TableHead className="w-[14%] text-right font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((doc) => {
                const pdfUrl = doc.file_pdf?.url || null
                const filename = doc.file_pdf?.filename || 'dokumen.pdf'
                const isWarta = doc.jenis_dokumen === 'warta'

                return (
                  <TableRow
                    key={doc.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800/60"
                  >
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-slate-400 shrink-0" />
                        <span className="font-semibold text-slate-900 dark:text-white text-sm">
                          {doc.judul}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="py-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isWarta
                            ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                            : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                        }`}
                      >
                        {isWarta ? 'Warta Jemaat' : 'Tata Ibadah'}
                      </span>
                    </TableCell>

                    <TableCell className="py-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-mono">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        {formatDateIndonesian(doc.periode_tanggal)}
                      </div>
                    </TableCell>

                    <TableCell className="py-4 text-right">
                      {pdfUrl ? (
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                          className="h-8 gap-1.5 text-xs font-semibold border-slate-300 dark:border-slate-700 tactile-press"
                        >
                          <a
                            href={pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            download={filename}
                          >
                            <Download className="h-3.5 w-3.5" />
                            PDF
                          </a>
                        </Button>
                      ) : (
                        <span className="text-xs text-slate-400 italic">Kosong</span>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="p-12 text-center rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Tidak ditemukan dokumen yang sesuai dengan pencarian atau filter.
          </p>
        </div>
      )}
    </div>
  )
}
