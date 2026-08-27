import type { CollectionConfig } from 'payload'

export const Pengumuman: CollectionConfig = {
  slug: 'pengumuman',
  labels: {
    singular: 'Pengumuman',
    plural: 'Pengumuman',
  },
  admin: {
    useAsTitle: 'judul',
    defaultColumns: ['judul', 'expiry_date', 'createdAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'judul',
      type: 'text',
      label: 'Judul Pengumuman',
      required: true,
    },
    {
      name: 'isi_ringkas',
      type: 'textarea',
      label: 'Isi Ringkas',
      required: true,
    },
    {
      name: 'expiry_date',
      type: 'date',
      label: 'Tanggal Berakhir (Expiry Date)',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
}
