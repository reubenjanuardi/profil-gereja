import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { FileText, Download, Calendar, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
    <main className="py-12 lg:py-16">
      <div className="container max-w-5xl">
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <Badge variant="church" className="px-3.5 py-1 text-xs">
            Arsip &amp; Publikasi
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Warta Jemaat &amp; Tata Ibadah
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            Akses dan unduh berkas digital PDF Warta Jemaat mingguan dan Tata Ibadah Hari Minggu maupun Ibadah Kategorial GPIB Jemaat Hosiana Jakarta.
          </p>
        </div>

        {/* Table of Documents */}
        {dokumenList.length > 0 ? (
          <Card className="overflow-hidden border-slate-200 dark:border-slate-800 shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[45%] font-semibold">Judul Dokumen</TableHead>
                  <TableHead className="w-[20%] font-semibold">Jenis Dokumen</TableHead>
                  <TableHead className="w-[20%] font-semibold">Periode Tanggal</TableHead>
                  <TableHead className="w-[15%] text-right font-semibold">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dokumenList.map((doc) => {
                  const pdfUrl =
                    typeof doc.file_pdf === 'object' && doc.file_pdf?.url
                      ? doc.file_pdf.url
                      : null
                  const filename =
                    typeof doc.file_pdf === 'object' && doc.file_pdf?.filename
                      ? doc.file_pdf.filename
                      : 'dokumen.pdf'

                  const isWarta = doc.jenis_dokumen === 'warta'

                  return (
                    <TableRow key={doc.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      {/* Judul */}
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2.5">
                          <FileText className="h-4 w-4 text-church-600 shrink-0" />
                          <span className="text-slate-900 dark:text-white font-semibold">
                            {doc.judul}
                          </span>
                        </div>
                      </TableCell>

                      {/* Jenis Dokumen */}
                      <TableCell>
                        <Badge
                          variant={isWarta ? 'default' : 'secondary'}
                          className={isWarta ? 'bg-church-700 hover:bg-church-800' : ''}
                        >
                          {isWarta ? 'Warta Jemaat' : 'Tata Ibadah'}
                        </Badge>
                      </TableCell>

                      {/* Periode Tanggal */}
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          {formatDateIndonesian(doc.periode_tanggal)}
                        </div>
                      </TableCell>

                      {/* Aksi Download */}
                      <TableCell className="text-right">
                        {pdfUrl ? (
                          <Button size="sm" variant="outline" asChild className="gap-1.5 text-xs font-medium">
                            <a
                              href={pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              download={filename}
                            >
                              <Download className="h-3.5 w-3.5" />
                              Unduh PDF
                            </a>
                          </Button>
                        ) : (
                          <span className="text-xs text-muted-foreground italic">
                            Tidak tersedia
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </Card>
        ) : (
          <Card className="p-12 text-center bg-slate-50 dark:bg-slate-900">
            <div className="flex justify-center mb-3">
              <FileText className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
              Belum Ada Dokumen
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Saat ini belum ada berkas Warta Jemaat atau Tata Ibadah yang diunggah. Silakan periksa kembali nanti.
            </p>
          </Card>
        )}
      </div>
    </main>
  )
}
