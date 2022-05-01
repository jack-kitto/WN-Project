/*
  Warnings:

  - You are about to drop the column `time` on the `area1` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `area2` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `area3` table. All the data in the column will be lost.
  - Added the required column `epochTime` to the `area1` table without a default value. This is not possible if the table is not empty.
  - Added the required column `humanTime` to the `area1` table without a default value. This is not possible if the table is not empty.
  - Added the required column `epochTime` to the `area2` table without a default value. This is not possible if the table is not empty.
  - Added the required column `humanTime` to the `area2` table without a default value. This is not possible if the table is not empty.
  - Added the required column `epochTime` to the `area3` table without a default value. This is not possible if the table is not empty.
  - Added the required column `humanTime` to the `area3` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "area1" DROP COLUMN "time",
ADD COLUMN     "epochTime" INTEGER NOT NULL,
ADD COLUMN     "humanTime" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "area2" DROP COLUMN "time",
ADD COLUMN     "epochTime" INTEGER NOT NULL,
ADD COLUMN     "humanTime" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "area3" DROP COLUMN "time",
ADD COLUMN     "epochTime" INTEGER NOT NULL,
ADD COLUMN     "humanTime" TEXT NOT NULL;
