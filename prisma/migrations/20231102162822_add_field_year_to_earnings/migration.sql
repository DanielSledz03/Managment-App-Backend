/*
  Warnings:

  - Added the required column `year` to the `Earning` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Earning" ADD COLUMN     "year" INTEGER NOT NULL;
