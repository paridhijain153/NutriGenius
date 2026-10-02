/*
  Warnings:

  - You are about to drop the column `dailyCalorieTarget` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `dailyCarbTarget` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `dailyFatTarget` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `dailyProteinTarget` on the `Profile` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AnalysisStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "MealSource" AS ENUM ('CAMERA', 'GALLERY', 'MANUAL', 'BARCODE', 'OCR');

-- AlterTable
ALTER TABLE "Food" ADD COLUMN     "foodGroup" TEXT,
ADD COLUMN     "glycemicIndex" DOUBLE PRECISION,
ADD COLUMN     "isJainFriendly" BOOLEAN,
ADD COLUMN     "isVegan" BOOLEAN,
ADD COLUMN     "isVegetarian" BOOLEAN;

-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "analysisStatus" "AnalysisStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "healthScore" DOUBLE PRECISION,
ADD COLUMN     "source" "MealSource" NOT NULL DEFAULT 'CAMERA',
ADD COLUMN     "totalCarbs" DOUBLE PRECISION,
ADD COLUMN     "totalFat" DOUBLE PRECISION,
ADD COLUMN     "totalProtein" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "MealImage" ADD COLUMN     "fileSize" INTEGER,
ADD COLUMN     "height" INTEGER,
ADD COLUMN     "mimeType" TEXT,
ADD COLUMN     "width" INTEGER,
ALTER COLUMN "cloudinaryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "dailyCalorieTarget",
DROP COLUMN "dailyCarbTarget",
DROP COLUMN "dailyFatTarget",
DROP COLUMN "dailyProteinTarget";

-- CreateTable
CREATE TABLE "FoodRecognition" (
    "id" TEXT NOT NULL,
    "mealId" TEXT NOT NULL,
    "aiProvider" TEXT NOT NULL,
    "modelVersion" TEXT,
    "promptVersion" TEXT,
    "rawResponse" JSONB NOT NULL,
    "confidence" DOUBLE PRECISION,
    "processingTime" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FoodRecognition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedRecipe" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "recipe" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedRecipe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FoodRecognition" ADD CONSTRAINT "FoodRecognition_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedRecipe" ADD CONSTRAINT "SavedRecipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
