-- CreateEnum
CREATE TYPE "TimelineEventType" AS ENUM ('HEARING', 'FILING', 'EVIDENCE', 'MEETING', 'DEADLINE', 'NOTE');

-- CreateTable
CREATE TABLE "CaseTimelineEvent" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "type" "TimelineEventType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CaseTimelineEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CaseTimelineEvent_caseId_idx" ON "CaseTimelineEvent"("caseId");

-- CreateIndex
CREATE INDEX "CaseTimelineEvent_eventDate_idx" ON "CaseTimelineEvent"("eventDate");

-- AddForeignKey
ALTER TABLE "CaseTimelineEvent" ADD CONSTRAINT "CaseTimelineEvent_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;
