import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { JadwalIbadah } from './collections/JadwalIbadah'
import { DokumenGereja } from './collections/DokumenGereja'
import { Pengumuman } from './collections/Pengumuman'
import { HeroCarousel } from './collections/HeroCarousel'

import { ProfilGereja } from './globals/ProfilGereja'
import { TemaGereja } from './globals/TemaGereja'
import { GeneralSettings } from './globals/GeneralSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    JadwalIbadah,
    DokumenGereja,
    Pengumuman,
    HeroCarousel,
  ],
  globals: [
    ProfilGereja,
    TemaGereja,
    GeneralSettings,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    schemaName: process.env.DB_SCHEMA || undefined,
  }),
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        endpoint: process.env.S3_ENDPOINT,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION || 'auto',
        forcePathStyle: true,
      },
    }),
  ],
})
