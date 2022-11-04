/*
  Warnings:

  - Made the column `is_done` on table `Todo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Todo" ALTER COLUMN "is_done" SET NOT NULL,
ALTER COLUMN "is_done" SET DEFAULT false;
