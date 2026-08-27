import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "profil"."enum_dokumen_gereja_jenis_dokumen" AS ENUM('warta', 'tata_ibadah');
  CREATE TABLE "profil"."users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "profil"."users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "profil"."media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "profil"."jadwal_ibadah" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nama_ibadah" varchar NOT NULL,
  	"waktu" timestamp(3) with time zone NOT NULL,
  	"lokasi" varchar NOT NULL,
  	"pelayan_firman" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "profil"."dokumen_gereja" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"judul" varchar NOT NULL,
  	"jenis_dokumen" "profil"."enum_dokumen_gereja_jenis_dokumen" NOT NULL,
  	"periode_tanggal" timestamp(3) with time zone NOT NULL,
  	"file_pdf_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "profil"."pengumuman" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"judul" varchar NOT NULL,
  	"isi_ringkas" varchar NOT NULL,
  	"expiry_date" timestamp(3) with time zone NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "profil"."hero_carousel" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"gambar_id" integer NOT NULL,
  	"teks_sambutan" varchar NOT NULL,
  	"urutan" numeric DEFAULT 1 NOT NULL,
  	"is_active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "profil"."payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "profil"."payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "profil"."payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"jadwal_ibadah_id" integer,
  	"dokumen_gereja_id" integer,
  	"pengumuman_id" integer,
  	"hero_carousel_id" integer
  );
  
  CREATE TABLE "profil"."payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "profil"."payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "profil"."payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "profil"."profil_gereja" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"visi_misi" jsonb,
  	"sejarah" jsonb,
  	"pemahaman_iman" jsonb,
  	"susunan_phmj" jsonb,
  	"susunan_pelkat" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "profil"."tema_gereja" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tema_tahunan" varchar,
  	"tema_jangka_panjang" varchar,
  	"tema_jangka_pendek" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "profil"."general_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nomor_rekening" varchar,
  	"alamat_gereja" varchar,
  	"embed_map_url" varchar,
  	"link_instagram" varchar,
  	"link_youtube" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "profil"."users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "profil"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "profil"."dokumen_gereja" ADD CONSTRAINT "dokumen_gereja_file_pdf_id_media_id_fk" FOREIGN KEY ("file_pdf_id") REFERENCES "profil"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "profil"."hero_carousel" ADD CONSTRAINT "hero_carousel_gambar_id_media_id_fk" FOREIGN KEY ("gambar_id") REFERENCES "profil"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "profil"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "profil"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "profil"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "profil"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "profil"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "profil"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "profil"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_jadwal_ibadah_fk" FOREIGN KEY ("jadwal_ibadah_id") REFERENCES "profil"."jadwal_ibadah"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "profil"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_dokumen_gereja_fk" FOREIGN KEY ("dokumen_gereja_id") REFERENCES "profil"."dokumen_gereja"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "profil"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pengumuman_fk" FOREIGN KEY ("pengumuman_id") REFERENCES "profil"."pengumuman"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "profil"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_hero_carousel_fk" FOREIGN KEY ("hero_carousel_id") REFERENCES "profil"."hero_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "profil"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "profil"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "profil"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "profil"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "profil"."users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "profil"."users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "profil"."users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "profil"."users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "profil"."users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "profil"."media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "profil"."media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "profil"."media" USING btree ("filename");
  CREATE INDEX "jadwal_ibadah_updated_at_idx" ON "profil"."jadwal_ibadah" USING btree ("updated_at");
  CREATE INDEX "jadwal_ibadah_created_at_idx" ON "profil"."jadwal_ibadah" USING btree ("created_at");
  CREATE INDEX "dokumen_gereja_file_pdf_idx" ON "profil"."dokumen_gereja" USING btree ("file_pdf_id");
  CREATE INDEX "dokumen_gereja_updated_at_idx" ON "profil"."dokumen_gereja" USING btree ("updated_at");
  CREATE INDEX "dokumen_gereja_created_at_idx" ON "profil"."dokumen_gereja" USING btree ("created_at");
  CREATE INDEX "pengumuman_updated_at_idx" ON "profil"."pengumuman" USING btree ("updated_at");
  CREATE INDEX "pengumuman_created_at_idx" ON "profil"."pengumuman" USING btree ("created_at");
  CREATE INDEX "hero_carousel_gambar_idx" ON "profil"."hero_carousel" USING btree ("gambar_id");
  CREATE INDEX "hero_carousel_updated_at_idx" ON "profil"."hero_carousel" USING btree ("updated_at");
  CREATE INDEX "hero_carousel_created_at_idx" ON "profil"."hero_carousel" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "profil"."payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "profil"."payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "profil"."payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "profil"."payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "profil"."payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "profil"."payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "profil"."payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "profil"."payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "profil"."payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_jadwal_ibadah_id_idx" ON "profil"."payload_locked_documents_rels" USING btree ("jadwal_ibadah_id");
  CREATE INDEX "payload_locked_documents_rels_dokumen_gereja_id_idx" ON "profil"."payload_locked_documents_rels" USING btree ("dokumen_gereja_id");
  CREATE INDEX "payload_locked_documents_rels_pengumuman_id_idx" ON "profil"."payload_locked_documents_rels" USING btree ("pengumuman_id");
  CREATE INDEX "payload_locked_documents_rels_hero_carousel_id_idx" ON "profil"."payload_locked_documents_rels" USING btree ("hero_carousel_id");
  CREATE INDEX "payload_preferences_key_idx" ON "profil"."payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "profil"."payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "profil"."payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "profil"."payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "profil"."payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "profil"."payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "profil"."payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "profil"."payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "profil"."payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "profil"."users_sessions" CASCADE;
  DROP TABLE "profil"."users" CASCADE;
  DROP TABLE "profil"."media" CASCADE;
  DROP TABLE "profil"."jadwal_ibadah" CASCADE;
  DROP TABLE "profil"."dokumen_gereja" CASCADE;
  DROP TABLE "profil"."pengumuman" CASCADE;
  DROP TABLE "profil"."hero_carousel" CASCADE;
  DROP TABLE "profil"."payload_kv" CASCADE;
  DROP TABLE "profil"."payload_locked_documents" CASCADE;
  DROP TABLE "profil"."payload_locked_documents_rels" CASCADE;
  DROP TABLE "profil"."payload_preferences" CASCADE;
  DROP TABLE "profil"."payload_preferences_rels" CASCADE;
  DROP TABLE "profil"."payload_migrations" CASCADE;
  DROP TABLE "profil"."profil_gereja" CASCADE;
  DROP TABLE "profil"."tema_gereja" CASCADE;
  DROP TABLE "profil"."general_settings" CASCADE;
  DROP TYPE "profil"."enum_dokumen_gereja_jenis_dokumen";`)
}
