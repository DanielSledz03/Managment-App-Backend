/*
  Warnings:

  - You are about to drop the column `date` on the `Bonus` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Penalty` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bonus" DROP COLUMN "date";

-- AlterTable
ALTER TABLE "Penalty" DROP COLUMN "date";
