/*
  Warnings:

  - You are about to drop the column `admin_id` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_admin_id_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "admin_id",
ADD COLUMN     "admin_user_id" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_admin_user_id_fkey" FOREIGN KEY ("admin_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
