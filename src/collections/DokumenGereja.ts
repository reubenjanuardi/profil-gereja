import type { CollectionConfig } from 'payload'

export const DokumenGereja: CollectionConfig = {
  slug: 'dokumen-gereja',
  labels: {
    singular: 'Dokumen Gereja',
    plural: 'Dokumen Gereja',
  },
  admin: {
    useAsTitle: 'judul',
    defaultColumns: ['judul', 'jenis_dokumen', 'periode_tanggal'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'judul',
      type: 'text',
      label: 'Judul Dokumen',
      required: true,
    },
    {
      name: 'jenis_dokumen',
      type: 'select',
      label: 'Jenis Dokumen',
      required: true,
      options: [
        {
          label: 'Warta Jemaat',
          value: 'warta',
        },
        {
          label: 'Tata Ibadah',
          value: 'tata_ibadah',
        },
      ],
    },
    {
      name: 'periode_tanggal',
      type: 'date',
      label: 'Periode Tanggal',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'file_pdf',
      type: 'upload',
      relationTo: 'media',
      label: 'File PDF (Warta / Tata Ibadah)',
      required: true,
    },
  ],
}
