/*
  Warnings:

  - You are about to drop the column `date` on the `contacts` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `contacts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "date",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
