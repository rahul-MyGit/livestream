/*
  Warnings:

  - Made the column `isLive` on table `Stream` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isChatEnabled` on table `Stream` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isChatDelayed` on table `Stream` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Stream" ALTER COLUMN "isLive" SET NOT NULL,
ALTER COLUMN "isChatEnabled" SET NOT NULL,
ALTER COLUMN "isChatDelayed" SET NOT NULL;
