/*
  Warnings:

  - The primary key for the `SensorData` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "SensorData" DROP CONSTRAINT "SensorData_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "SensorData_pkey" PRIMARY KEY ("id");
