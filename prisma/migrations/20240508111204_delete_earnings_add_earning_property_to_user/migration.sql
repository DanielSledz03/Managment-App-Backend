/*
  Warnings:

  - You are about to drop the `Earning` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Earning" DROP CONSTRAINT "Earning_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "earningPerHour" DOUBLE PRECISION;

-- DropTable
DROP TABLE "Earning";
