/*
  Warnings:

  - You are about to drop the column `totalSessions` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "totalSessions",
ADD COLUMN     "totalRounds" DOUBLE PRECISION NOT NULL DEFAULT 0;
