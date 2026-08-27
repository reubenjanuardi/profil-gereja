import type { CollectionConfig } from 'payload'

export const JadwalIbadah: CollectionConfig = {
  slug: 'jadwal-ibadah',
  labels: {
    singular: 'Jadwal Ibadah',
    plural: 'Jadwal Ibadah',
  },
  admin: {
    useAsTitle: 'nama_ibadah',
    defaultColumns: ['nama_ibadah', 'waktu', 'lokasi', 'pelayan_firman'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'nama_ibadah',
      type: 'text',
      label: 'Nama Ibadah',
      required: true,
    },
    {
      name: 'waktu',
      type: 'date',
      label: 'Waktu Ibadah',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'lokasi',
      type: 'text',
      label: 'Lokasi',
      required: true,
    },
    {
      name: 'pelayan_firman',
      type: 'text',
      label: 'Pelayan Firman',
      required: true,
    },
  ],
}
