-- DropIndex
DROP INDEX "SensorData_time_key";

-- AlterTable
ALTER TABLE "SensorData" ADD CONSTRAINT "SensorData_pkey" PRIMARY KEY ("time");
