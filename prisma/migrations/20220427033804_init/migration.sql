/*
  Warnings:

  - You are about to drop the `Sensordata` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Sensordata";

-- CreateTable
CREATE TABLE "Left" (
    "time" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Right" (
    "time" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Left_time_key" ON "Left"("time");

-- CreateIndex
CREATE UNIQUE INDEX "Right_time_key" ON "Right"("time");
