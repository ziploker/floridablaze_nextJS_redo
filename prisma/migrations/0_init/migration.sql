-- CreateTable
CREATE TABLE "active_storage_attachments" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "record_type" VARCHAR NOT NULL,
    "record_id" BIGINT NOT NULL,
    "blob_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "active_storage_attachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "active_storage_blobs" (
    "id" BIGSERIAL NOT NULL,
    "key" VARCHAR NOT NULL,
    "filename" VARCHAR NOT NULL,
    "content_type" VARCHAR,
    "metadata" TEXT,
    "service_name" VARCHAR NOT NULL,
    "byte_size" BIGINT NOT NULL,
    "checksum" VARCHAR,
    "created_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "active_storage_blobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "active_storage_variant_records" (
    "id" BIGSERIAL NOT NULL,
    "blob_id" BIGINT NOT NULL,
    "variation_digest" VARCHAR NOT NULL,

    CONSTRAINT "active_storage_variant_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ar_internal_metadata" (
    "key" VARCHAR NOT NULL,
    "value" VARCHAR,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "ar_internal_metadata_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" BIGSERIAL NOT NULL,
    "edit_history" TEXT DEFAULT '',
    "commentable_id" INTEGER,
    "commentable_type" VARCHAR,
    "user_id" BIGINT NOT NULL,
    "reply" BOOLEAN DEFAULT false,
    "comment_number" INTEGER,
    "body" TEXT,
    "date" VARCHAR,
    "author_nick" VARCHAR,
    "author_avatar" VARCHAR,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "original_comment_author" VARCHAR,
    "parent_id" VARCHAR,
    "ancestry" VARCHAR,
    "total_upvotes" INTEGER DEFAULT 0,
    "total_downvotes" INTEGER DEFAULT 0,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "communications" (
    "id" BIGSERIAL NOT NULL,
    "date" VARCHAR,
    "com_type" VARCHAR,
    "recipient" VARCHAR,
    "status" VARCHAR,
    "user_id" BIGINT,
    "postgrid_id" VARCHAR,
    "paypal_full_object" JSON DEFAULT '{}',
    "postgrid_full_object" JSON DEFAULT '{}',
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "formatted_date" VARCHAR,
    "mailgun_id" VARCHAR,
    "mailgun_recipient_email" VARCHAR,

    CONSTRAINT "communications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dislikes" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "comment_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "dislikes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "comment_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "newsletters" (
    "id" BIGSERIAL NOT NULL,
    "email" VARCHAR,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "newsletters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schema_migrations" (
    "version" VARCHAR NOT NULL,

    CONSTRAINT "schema_migrations_pkey" PRIMARY KEY ("version")
);

-- CreateTable
CREATE TABLE "stories" (
    "id" BIGSERIAL NOT NULL,
    "title" VARCHAR,
    "keywords" VARCHAR,
    "body" TEXT,
    "url" VARCHAR,
    "date" VARCHAR,
    "topic" VARCHAR,
    "slug" VARCHAR,
    "author_nick" VARCHAR,
    "author_avatar" VARCHAR,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "caption" TEXT,
    "urls" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "alt" VARCHAR DEFAULT '',
    "description" VARCHAR DEFAULT '',

    CONSTRAINT "stories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "email" VARCHAR,
    "full_name" VARCHAR,
    "password_digest" VARCHAR,
    "confirm_token" VARCHAR,
    "isAdmin" BOOLEAN,
    "email_confirmed" VARCHAR,
    "opt_in" BOOLEAN,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "avatar_url" VARCHAR,
    "nick" VARCHAR,
    "auth_token" VARCHAR,
    "number_of_comments" INTEGER DEFAULT 0,
    "userCreatedAutomatically" BOOLEAN DEFAULT false,
    "first_name" VARCHAR,
    "last_name" VARCHAR,
    "reset_password_token" VARCHAR,
    "reset_password_sent_at" TIMESTAMP(6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "index_active_storage_attachments_on_blob_id" ON "active_storage_attachments"("blob_id");

-- CreateIndex
CREATE UNIQUE INDEX "index_active_storage_attachments_uniqueness" ON "active_storage_attachments"("record_type", "record_id", "name", "blob_id");

-- CreateIndex
CREATE UNIQUE INDEX "index_active_storage_blobs_on_key" ON "active_storage_blobs"("key");

-- CreateIndex
CREATE UNIQUE INDEX "index_active_storage_variant_records_uniqueness" ON "active_storage_variant_records"("blob_id", "variation_digest");

-- CreateIndex
CREATE INDEX "index_comments_on_ancestry" ON "comments"("ancestry");

-- CreateIndex
CREATE INDEX "index_comments_on_user_id" ON "comments"("user_id");

-- CreateIndex
CREATE INDEX "index_communications_on_user_id" ON "communications"("user_id");

-- CreateIndex
CREATE INDEX "index_dislikes_on_comment_id" ON "dislikes"("comment_id");

-- CreateIndex
CREATE INDEX "index_dislikes_on_user_id" ON "dislikes"("user_id");

-- CreateIndex
CREATE INDEX "index_likes_on_comment_id" ON "likes"("comment_id");

-- CreateIndex
CREATE INDEX "index_likes_on_user_id" ON "likes"("user_id");

-- AddForeignKey
ALTER TABLE "active_storage_attachments" ADD CONSTRAINT "fk_rails_c3b3935057" FOREIGN KEY ("blob_id") REFERENCES "active_storage_blobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "active_storage_variant_records" ADD CONSTRAINT "fk_rails_993965df05" FOREIGN KEY ("blob_id") REFERENCES "active_storage_blobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "fk_rails_03de2dc08c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "communications" ADD CONSTRAINT "fk_rails_ec1e4a87d6" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "dislikes" ADD CONSTRAINT "fk_rails_4381bad317" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "dislikes" ADD CONSTRAINT "fk_rails_6b4ce69b85" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "fk_rails_1e09b5dabf" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "fk_rails_e92b21943f" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

