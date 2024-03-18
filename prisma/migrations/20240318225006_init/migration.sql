/*
  Warnings:

  - Made the column `shikiTheme` on table `Site` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Site" ALTER COLUMN "shikiTheme" SET NOT NULL,
ALTER COLUMN "shikiTheme" SET DEFAULT 'one-dark-pro';
