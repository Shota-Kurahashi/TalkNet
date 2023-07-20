/*
  Warnings:

  - You are about to drop the column `intoroduction` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `introduction` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Profile` DROP COLUMN `intoroduction`,
    ADD COLUMN `introduction` VARCHAR(191) NOT NULL;
