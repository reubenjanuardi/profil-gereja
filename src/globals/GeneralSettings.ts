import type { GlobalConfig } from 'payload'

export const GeneralSettings: GlobalConfig = {
  slug: 'general-settings',
  label: 'Pengaturan Umum (General Settings)',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'nomor_rekening',
      type: 'textarea',
      label: 'Informasi Nomor Rekening Bank & QRIS',
    },
    {
      name: 'alamat_gereja',
      type: 'textarea',
      label: 'Alamat Lengkap Gereja',
    },
    {
      name: 'embed_map_url',
      type: 'text',
      label: 'Google Maps Embed URL',
    },
    {
      name: 'link_instagram',
      type: 'text',
      label: 'Link Akun Instagram',
    },
    {
      name: 'link_youtube',
      type: 'text',
      label: 'Link Channel YouTube',
    },
  ],
}
