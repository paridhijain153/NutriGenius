/*
  Warnings:

  - You are about to drop the column `age` on the `Profile` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "BudgetPreference" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "cuisinePreference" TEXT;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "age",
ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "budgetPreference" "BudgetPreference",
ADD COLUMN     "phone" TEXT;

-- AlterTable
ALTER TABLE "RefreshToken" ADD COLUMN     "lastUsedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "MealImage" (
    "id" TEXT NOT NULL,
    "mealId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "cloudinaryId" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MealImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MealImage" ADD CONSTRAINT "MealImage_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
