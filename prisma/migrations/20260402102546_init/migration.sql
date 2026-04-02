-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "metrics" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "targetValue" INTEGER NOT NULL,
    "weight" DECIMAL(3,2) NOT NULL,

    CONSTRAINT "metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perfomance-reviews" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "metricId" INTEGER NOT NULL,
    "factValue" INTEGER NOT NULL,
    "period" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "perfomance-reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "perfomance-reviews" ADD CONSTRAINT "perfomance-reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perfomance-reviews" ADD CONSTRAINT "perfomance-reviews_metricId_fkey" FOREIGN KEY ("metricId") REFERENCES "metrics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
