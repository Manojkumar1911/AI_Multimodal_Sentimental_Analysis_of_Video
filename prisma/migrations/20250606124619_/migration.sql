/*
  Warnings:

  - You are about to drop the column `apiQuotaId` on the `User` table. All the data in the column will be lost.
  - Added the required column `userId` to the `ApiQuota` table without a default value. This is not possible if the table is not empty.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "VideoFile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "analyzed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "VideoFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ApiQuota" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "requestsUsed" INTEGER NOT NULL DEFAULT 0,
    "maxRequests" INTEGER NOT NULL DEFAULT 10000,
    "lastResetDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "secretKey" TEXT NOT NULL,
    CONSTRAINT "ApiQuota_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ApiQuota" ("id", "secretKey") SELECT "id", "secretKey" FROM "ApiQuota";
DROP TABLE "ApiQuota";
ALTER TABLE "new_ApiQuota" RENAME TO "ApiQuota";
CREATE UNIQUE INDEX "ApiQuota_userId_key" ON "ApiQuota"("userId");
CREATE UNIQUE INDEX "ApiQuota_secretKey_key" ON "ApiQuota"("secretKey");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT,
    "password" TEXT NOT NULL
);
INSERT INTO "new_User" ("email", "emailVerified", "id", "image", "name", "password") SELECT "email", "emailVerified", "id", "image", "name", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "VideoFile_key_key" ON "VideoFile"("key");
