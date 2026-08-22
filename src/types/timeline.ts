export type TimelineEventType =
  | "HEARING"
  | "FILING"
  | "EVIDENCE"
  | "MEETING"
  | "DEADLINE"
  | "NOTE";

export type TimelineEvent = {
  id: string;
  caseId: string;
  type: TimelineEventType;
  title: string;
  description: string | null;
  eventDate: string;
  createdAt: string;
  updatedAt: string;
};