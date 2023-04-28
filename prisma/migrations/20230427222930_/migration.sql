/*
  Warnings:

  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "wear" DROP NOT NULL;
ALTER TABLE "Product" ALTER COLUMN "description" DROP NOT NULL;
ALTER TABLE "Product" ALTER COLUMN "float" DROP NOT NULL;
ALTER TABLE "Product" ALTER COLUMN "statTrak" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" STRING;
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "email" SET NOT NULL;
