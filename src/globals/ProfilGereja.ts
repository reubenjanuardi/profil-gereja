import type { GlobalConfig } from 'payload'

export const ProfilGereja: GlobalConfig = {
  slug: 'profil-gereja',
  label: 'Profil Gereja',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'visi_misi',
      type: 'richText',
      label: 'Visi & Misi',
    },
    {
      name: 'sejarah',
      type: 'richText',
      label: 'Sejarah Gereja (GPIB & Hosiana)',
    },
    {
      name: 'pemahaman_iman',
      type: 'richText',
      label: 'Pemahaman Iman',
    },
    {
      name: 'susunan_phmj',
      type: 'richText',
      label: 'Susunan Pelaksana Harian Majelis Jemaat (PHMJ)',
    },
    {
      name: 'susunan_pelkat',
      type: 'richText',
      label: 'Susunan Pelkat / Unit Missioner',
    },
  ],
}
