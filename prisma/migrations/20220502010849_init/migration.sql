-- CreateTable
CREATE TABLE "area1" (
    "id" SERIAL NOT NULL,
    "epochTime" INTEGER NOT NULL,
    "humanTime" TEXT NOT NULL,

    CONSTRAINT "area1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "area2" (
    "id" SERIAL NOT NULL,
    "epochTime" INTEGER NOT NULL,
    "humanTime" TEXT NOT NULL,

    CONSTRAINT "area2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "area3" (
    "id" SERIAL NOT NULL,
    "epochTime" INTEGER NOT NULL,
    "humanTime" TEXT NOT NULL,

    CONSTRAINT "area3_pkey" PRIMARY KEY ("id")
);
