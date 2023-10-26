/*
  Warnings:

  - Added the required column `year` to the `Earnings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Earnings" ADD COLUMN     "year" INTEGER NOT NULL;
