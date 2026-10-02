/*
  Warnings:

  - You are about to drop the column `cuisinePreference` on the `Meal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "cuisinePreference";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "cuisinePreference" TEXT;
