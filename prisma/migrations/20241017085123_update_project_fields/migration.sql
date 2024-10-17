/*
  Warnings:

  - Made the column `githubUrl` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Project` MODIFY `githubUrl` VARCHAR(191) NOT NULL;
