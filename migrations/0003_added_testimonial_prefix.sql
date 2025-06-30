-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Account";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Source";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Status";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Tag";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "TestimonialAccount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "notificationEmail" TEXT,
    "notifyNewTestimonials" BOOLEAN NOT NULL DEFAULT false,
    "notifyWeeklyDigest" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "TestimonialSource" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TestimonialStatus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TestimonialTagging" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "testimonialId" TEXT NOT NULL,
    "tagId" INTEGER NOT NULL,
    CONSTRAINT "TestimonialTagging_testimonialId_fkey" FOREIGN KEY ("testimonialId") REFERENCES "Testimonial" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TestimonialTagging_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "TestimonialTag" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

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
    "sourceId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Testimonial_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "TestimonialSource" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Testimonial_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "TestimonialStatus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Testimonial" ("avatar", "company", "content", "createdAt", "date", "email", "featured", "fullName", "id", "jobTitle", "rating", "sourceId", "statusId", "updatedAt") SELECT "avatar", "company", "content", "createdAt", "date", "email", "featured", "fullName", "id", "jobTitle", "rating", "sourceId", "statusId", "updatedAt" FROM "Testimonial";
DROP TABLE "Testimonial";
ALTER TABLE "new_Testimonial" RENAME TO "Testimonial";
CREATE TABLE "new_TestimonialTag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_TestimonialTag" ("id") SELECT "id" FROM "TestimonialTag";
DROP TABLE "TestimonialTag";
ALTER TABLE "new_TestimonialTag" RENAME TO "TestimonialTag";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
