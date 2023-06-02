/*
  Warnings:

  - Made the column `paymentIntentID` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "paymentIntentID" SET NOT NULL;
