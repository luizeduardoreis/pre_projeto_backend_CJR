/*
  Warnings:

  - Added the required column `isDone` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "isDone" BOOLEAN NOT NULL;
