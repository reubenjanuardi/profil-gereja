import type { GlobalConfig } from 'payload'

export const TemaGereja: GlobalConfig = {
  slug: 'tema-gereja',
  label: 'Tema Gereja (GPIB)',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'tema_tahunan',
      type: 'textarea',
      label: 'Tema Tahunan',
    },
    {
      name: 'tema_jangka_panjang',
      type: 'textarea',
      label: 'Tema Jangka Panjang',
    },
    {
      name: 'tema_jangka_pendek',
      type: 'textarea',
      label: 'Tema Jangka Pendek',
    },
  ],
}
