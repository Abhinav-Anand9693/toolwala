export type CaseStatus =
  | "active"
  | "pending"
  | "closed";

export type CaseType =
  | "civil"
  | "criminal"
  | "corporate"
  | "family"
  | "property"
  | "other";

export type LawyerCase = {
  id: string;

  title: string;

  caseNumber: string;

  caseType: CaseType;

  court: string;

  clientName: string;

  oppositeParty: string;

  description: string;

  status: CaseStatus;

  createdAt: string;
};