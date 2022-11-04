/*
  Warnings:

  - You are about to alter the column `title` on the `Todo` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `desc` on the `Todo` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.

*/
-- AlterTable
ALTER TABLE "Todo" ALTER COLUMN "title" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "desc" SET DATA TYPE VARCHAR(200);
