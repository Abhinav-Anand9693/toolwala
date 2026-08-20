export type CaseStatus =
  | "ACTIVE"
  | "PENDING"
  | "CLOSED";

export type CaseType =
  | "CIVIL"
  | "CRIMINAL"
  | "CORPORATE"
  | "FAMILY"
  | "PROPERTY"
  | "OTHER";

export type LawyerCase = {
  id: string;
  userId: string;

  title: string;
  caseNumber: string | null;

  caseType: CaseType;

  court: string | null;
  clientName: string | null;
  oppositeParty: string | null;

  description: string | null;

  status: CaseStatus;

  createdAt: string;
  updatedAt: string;
};