/*
  Warnings:

  - Made the column `currentStreak` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `longestStreak` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `totalTime` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ExerciseSession" ADD COLUMN     "breatheLength" DOUBLE PRECISION NOT NULL DEFAULT 5.5,
ADD COLUMN     "roundsCompleted" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "totalTime" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "totalSessions" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "currentStreak" SET NOT NULL,
ALTER COLUMN "currentStreak" SET DEFAULT 0,
ALTER COLUMN "longestStreak" SET NOT NULL,
ALTER COLUMN "longestStreak" SET DEFAULT 0,
ALTER COLUMN "totalTime" SET NOT NULL,
ALTER COLUMN "totalTime" SET DEFAULT 0;
