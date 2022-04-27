/*
  Warnings:

  - You are about to drop the `Left` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Right` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Direction" AS ENUM ('Entering', 'Leaving');

-- DropTable
DROP TABLE "Left";

-- DropTable
DROP TABLE "Right";

-- CreateTable
CREATE TABLE "SensorData" (
    "time" INTEGER NOT NULL,
    "direction" "Direction" NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SensorData_time_key" ON "SensorData"("time");
