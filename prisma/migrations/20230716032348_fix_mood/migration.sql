/*
  Warnings:

  - You are about to drop the column `topicId` on the `Mood` table. All the data in the column will be lost.
  - Added the required column `moodId` to the `Topic` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Mood` DROP FOREIGN KEY `Mood_topicId_fkey`;

-- AlterTable
ALTER TABLE `Mood` DROP COLUMN `topicId`;

-- AlterTable
ALTER TABLE `Topic` ADD COLUMN `moodId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Topic` ADD CONSTRAINT `Topic_moodId_fkey` FOREIGN KEY (`moodId`) REFERENCES `Mood`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
