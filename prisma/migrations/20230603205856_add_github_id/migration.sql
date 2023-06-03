/*
  Warnings:

  - A unique constraint covering the columns `[gitHubId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gitHubId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `gitHubId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_gitHubId_key` ON `User`(`gitHubId`);
