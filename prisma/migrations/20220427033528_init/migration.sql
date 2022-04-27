-- CreateTable
CREATE TABLE "Sensordata" (
    "time" INTEGER NOT NULL,
    "direction" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Sensordata_time_key" ON "Sensordata"("time");
