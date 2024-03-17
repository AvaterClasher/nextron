/*
  Warnings:

  - You are about to drop the `Sites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Sites";

-- CreateTable
CREATE TABLE "Site" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "repoLink" TEXT NOT NULL,
    "siteName" TEXT NOT NULL,
    "siteDescription" TEXT NOT NULL,
    "ogImageUrl" TEXT NOT NULL,
    "web3formsKey" TEXT,
    "customHead" TEXT,
    "homePage" TEXT,
    "navbar" TEXT,
    "shikiTheme" TEXT,

    CONSTRAINT "Site_pkey" PRIMARY KEY ("id")
);
