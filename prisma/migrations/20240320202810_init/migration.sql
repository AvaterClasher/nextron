-- AlterTable
ALTER TABLE "Site" ADD COLUMN     "docsFolder" TEXT NOT NULL DEFAULT 'docs';

-- CreateTable
CREATE TABLE "NavbarLink" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "linkText" TEXT NOT NULL,

    CONSTRAINT "NavbarLink_pkey" PRIMARY KEY ("id")
);
