/*
  Warnings:

  - You are about to drop the `SensorData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "SensorData";

-- CreateTable
CREATE TABLE "area1" (
    "id" SERIAL NOT NULL,
    "time" INTEGER NOT NULL,
    "direction" "Direction" NOT NULL,

    CONSTRAINT "area1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "area2" (
    "id" SERIAL NOT NULL,
    "time" INTEGER NOT NULL,
    "direction" "Direction" NOT NULL,

    CONSTRAINT "area2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "area3" (
    "id" SERIAL NOT NULL,
    "time" INTEGER NOT NULL,
    "direction" "Direction" NOT NULL,

    CONSTRAINT "area3_pkey" PRIMARY KEY ("id")
);
