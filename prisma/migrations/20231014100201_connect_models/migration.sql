/*
  Warnings:

  - You are about to drop the column `administrator_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Administrator` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_administrator_id_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "administrator_id",
ADD COLUMN     "graphic" TEXT,
ALTER COLUMN "is_admin" SET DEFAULT false;

-- DropTable
DROP TABLE "Administrator";
