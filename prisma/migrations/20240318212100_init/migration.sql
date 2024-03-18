/*
  Warnings:

  - A unique constraint covering the columns `[siteSlug]` on the table `Site` will be added. If there are existing duplicate values, this will fail.
  - The required column `siteSlug` was added to the `Site` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Site" ADD COLUMN     "siteSlug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Site_siteSlug_key" ON "Site"("siteSlug");
