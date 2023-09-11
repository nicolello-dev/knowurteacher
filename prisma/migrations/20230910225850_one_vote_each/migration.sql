/*
  Warnings:

  - The values [upvote,downvote] on the enum `voteType` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[reviewId,userId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "voteType_new" AS ENUM ('up', 'down');
ALTER TABLE "Vote" ALTER COLUMN "type" TYPE "voteType_new" USING ("type"::text::"voteType_new");
ALTER TYPE "voteType" RENAME TO "voteType_old";
ALTER TYPE "voteType_new" RENAME TO "voteType";
DROP TYPE "voteType_old";
COMMIT;

-- CreateIndex
CREATE UNIQUE INDEX "Vote_reviewId_userId_key" ON "Vote"("reviewId", "userId");
