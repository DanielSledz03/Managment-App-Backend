/*
  Warnings:

  - You are about to drop the column `isCompleted` on the `Task` table. All the data in the column will be lost.
  - Added the required column `status` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('completed', 'inprogress', 'rejected');

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "isCompleted",
ADD COLUMN     "status" "TaskStatus" NOT NULL;
