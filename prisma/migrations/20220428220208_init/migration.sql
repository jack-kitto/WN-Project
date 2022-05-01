/*
  Warnings:

  - You are about to drop the column `direction` on the `area1` table. All the data in the column will be lost.
  - You are about to drop the column `direction` on the `area2` table. All the data in the column will be lost.
  - You are about to drop the column `direction` on the `area3` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "area1" DROP COLUMN "direction";

-- AlterTable
ALTER TABLE "area2" DROP COLUMN "direction";

-- AlterTable
ALTER TABLE "area3" DROP COLUMN "direction";
