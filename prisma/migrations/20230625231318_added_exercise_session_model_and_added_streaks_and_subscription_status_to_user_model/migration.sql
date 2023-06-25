-- AlterTable
ALTER TABLE "User" ADD COLUMN     "currentStreak" DOUBLE PRECISION,
ADD COLUMN     "longestStreak" DOUBLE PRECISION,
ADD COLUMN     "subscription" TEXT,
ADD COLUMN     "totalTime" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "ExerciseSession" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'box-breathing',
    "totalTime" DOUBLE PRECISION NOT NULL DEFAULT 60000,
    "status" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ExerciseSession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExerciseSession" ADD CONSTRAINT "ExerciseSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
