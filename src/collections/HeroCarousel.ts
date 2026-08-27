import type { CollectionConfig } from 'payload'

export const HeroCarousel: CollectionConfig = {
  slug: 'hero-carousel',
  labels: {
    singular: 'Hero Carousel',
    plural: 'Hero Carousel',
  },
  admin: {
    useAsTitle: 'teks_sambutan',
    defaultColumns: ['teks_sambutan', 'urutan', 'is_active'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'gambar',
      type: 'upload',
      relationTo: 'media',
      label: 'Gambar Banner / Carousel',
      required: true,
    },
    {
      name: 'teks_sambutan',
      type: 'text',
      label: 'Teks Sambutan / Judul Hero',
      required: true,
    },
    {
      name: 'urutan',
      type: 'number',
      label: 'Urutan Tampil',
      required: true,
      defaultValue: 1,
    },
    {
      name: 'is_active',
      type: 'checkbox',
      label: 'Status Aktif',
      defaultValue: true,
    },
  ],
}
