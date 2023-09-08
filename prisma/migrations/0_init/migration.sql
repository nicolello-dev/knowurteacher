-- CreateTable
CREATE TABLE "Teacher" (
    "id" TEXT NOT NULL,
    "added_date" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "school" TEXT NOT NULL,
    "photoURL" TEXT,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "join_date" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "school" TEXT,
    "photoURL" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "authorID" TEXT NOT NULL,
    "teacherID" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "reports" INTEGER NOT NULL DEFAULT 0,
    "points" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Teacher_name_school_idx" ON "Teacher"("name", "school");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_name_school_key" ON "Teacher"("name", "school");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_username_idx" ON "User"("email", "username");

-- CreateIndex
CREATE UNIQUE INDEX "Review_authorID_teacherID_key" ON "Review"("authorID", "teacherID");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_teacherID_fkey" FOREIGN KEY ("teacherID") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

