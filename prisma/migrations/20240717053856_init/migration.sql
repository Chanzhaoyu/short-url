-- CreateTable
CREATE TABLE "Urls" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "uniqueCode" TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "remark" TEXT NOT NULL,
    "extendsStr" TEXT NOT NULL,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,
    "expiredAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Urls_uniqueCode_key" ON "Urls"("uniqueCode");
