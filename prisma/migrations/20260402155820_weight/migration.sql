/*
  Warnings:

  - You are about to alter the column `weight` on the `metrics` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,2)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "metrics" ALTER COLUMN "weight" SET DATA TYPE DOUBLE PRECISION;
