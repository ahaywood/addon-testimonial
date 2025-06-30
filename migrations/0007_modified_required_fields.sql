-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Testimonial" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "email" TEXT,
    "company" TEXT,
    "jobTitle" TEXT,
    "avatar" TEXT,
    "rating" INTEGER,
    "content" TEXT,
    "date" DATETIME,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "url" TEXT,
    "sourceId" INTEGER,
    "statusId" INTEGER NOT NULL DEFAULT 3,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Testimonial_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "TestimonialSource" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Testimonial_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "TestimonialStatus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Testimonial" ("avatar", "company", "content", "createdAt", "date", "email", "featured", "fullName", "id", "jobTitle", "rating", "sourceId", "statusId", "updatedAt", "url") SELECT "avatar", "company", "content", "createdAt", "date", "email", "featured", "fullName", "id", "jobTitle", "rating", "sourceId", "statusId", "updatedAt", "url" FROM "Testimonial";
DROP TABLE "Testimonial";
ALTER TABLE "new_Testimonial" RENAME TO "Testimonial";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
