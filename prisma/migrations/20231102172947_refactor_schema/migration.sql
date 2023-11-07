/*
  Warnings:

  - You are about to drop the column `notificationId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `rate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Administrator` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Administrator" DROP CONSTRAINT "Administrator_companyId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_notificationId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "notificationId",
DROP COLUMN "rate";

-- DropTable
DROP TABLE "Administrator";

-- CreateTable
CREATE TABLE "_CompanyAdministrators" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UserNotifications" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CompanyAdministrators_AB_unique" ON "_CompanyAdministrators"("A", "B");

-- CreateIndex
CREATE INDEX "_CompanyAdministrators_B_index" ON "_CompanyAdministrators"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserNotifications_AB_unique" ON "_UserNotifications"("A", "B");

-- CreateIndex
CREATE INDEX "_UserNotifications_B_index" ON "_UserNotifications"("B");

-- AddForeignKey
ALTER TABLE "_CompanyAdministrators" ADD CONSTRAINT "_CompanyAdministrators_A_fkey" FOREIGN KEY ("A") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyAdministrators" ADD CONSTRAINT "_CompanyAdministrators_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserNotifications" ADD CONSTRAINT "_UserNotifications_A_fkey" FOREIGN KEY ("A") REFERENCES "Notification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserNotifications" ADD CONSTRAINT "_UserNotifications_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
