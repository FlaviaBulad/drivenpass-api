/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Cards` table. All the data in the column will be lost.
  - You are about to drop the column `cvc` on the `Cards` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Cards` table. All the data in the column will be lost.
  - You are about to drop the column `tag` on the `Cards` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Credentials` table. All the data in the column will be lost.
  - You are about to drop the column `tag` on the `Credentials` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `SafeNotes` table. All the data in the column will be lost.
  - You are about to drop the column `safeNotesTag` on the `SafeNotes` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `SafeNotes` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `SafeNotes` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to drop the column `createdAt` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Wifi` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Wifi` table. All the data in the column will be lost.
  - You are about to drop the column `wifiTag` on the `Wifi` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title,userId]` on the table `Cards` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title,userId]` on the table `Credentials` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title,userId]` on the table `SafeNotes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title,userId]` on the table `Wifi` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cardHolderName` to the `Cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `securityCode` to the `Cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Credentials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `note` to the `SafeNotes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `networkName` to the `Wifi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Wifi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cards" DROP COLUMN "createdAt",
DROP COLUMN "cvc",
DROP COLUMN "name",
DROP COLUMN "tag",
ADD COLUMN     "cardHolderName" TEXT NOT NULL,
ADD COLUMN     "securityCode" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Credentials" DROP COLUMN "createdAt",
DROP COLUMN "tag",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SafeNotes" DROP COLUMN "createdAt",
DROP COLUMN "safeNotesTag",
DROP COLUMN "text",
ADD COLUMN     "note" VARCHAR(1000) NOT NULL,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "Wifi" DROP COLUMN "createdAt",
DROP COLUMN "name",
DROP COLUMN "wifiTag",
ADD COLUMN     "networkName" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Cards_title_userId_key" ON "Cards"("title", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Credentials_title_userId_key" ON "Credentials"("title", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "SafeNotes_title_userId_key" ON "SafeNotes"("title", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Wifi_title_userId_key" ON "Wifi"("title", "userId");
