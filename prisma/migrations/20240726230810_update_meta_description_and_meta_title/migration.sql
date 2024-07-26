/*
  Warnings:

  - You are about to drop the column `description` on the `stories` table. All the data in the column will be lost.
  - You are about to drop the column `metaTitle` on the `stories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "stories" DROP COLUMN "description",
DROP COLUMN "metaTitle",
ADD COLUMN     "meta_description" VARCHAR DEFAULT '',
ADD COLUMN     "meta_title" VARCHAR DEFAULT '';
