/*
  Warnings:

  - Added the required column `width` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "width" INTEGER NOT NULL,
ADD COLUMN     "height" INTEGER NOT NULL;
