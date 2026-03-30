export type WorkflowRole = "staff" | "officer" | "admin";
export type WorkflowStatus =
  | "draft"
  | "submitted"
  | "changes_requested"
  | "ready_for_decision"
  | "approved"
  | "archived";
export type WorkflowDocumentState = "missing" | "uploaded" | "approved" | "needs_update";

export interface WorkflowRoleOption {
  id: WorkflowRole;
  label: string;
  summary: string;
  responsibilities: string[];
}

export interface WorkflowStage {
  id: WorkflowStatus;
  label: string;
  note: string;
}

export interface WorkflowDocument {
  id: string;
  label: string;
  required: boolean;
  state: WorkflowDocumentState;
  note: string;
}

export interface WorkflowHistoryEntry {
  id: number;
  actor: string;
  action: string;
  detail: string;
}

export interface WorkflowDemoState {
  currentRole: WorkflowRole;
  status: WorkflowStatus;
  caseId: string;
  applicantName: string;
  faculty: string;
  destination: string;
  programme: string;
  plannedDays: number;
  visitedStages: WorkflowStatus[];
  nextHistoryId: number;
  documents: WorkflowDocument[];
  history: WorkflowHistoryEntry[];
}

export const workflowRoleOptions: WorkflowRoleOption[] = [
  {
    id: "staff",
    label: "Staff",
    summary: "Can prepare the case, upload missing documents, and resubmit after changes.",
    responsibilities: [
      "Owns the case content and required uploads.",
      "Can only submit once the required documents are on file.",
      "Cannot approve documents or make the final decision.",
    ],
  },
  {
    id: "officer",
    label: "Officer",
    summary: "Reviews submitted cases, checks documents, and sends complete cases to the decision stage.",
    responsibilities: [
      "Can approve uploaded documents that are waiting for review.",
      "Can request corrections and return the case to staff.",
      "Cannot make the final approval decision.",
    ],
  },
  {
    id: "admin",
    label: "Admin",
    summary: "Makes the final decision once officer review is complete and can archive closed cases.",
    responsibilities: [
      "Can approve a case only after it is ready for decision.",
      "Can archive a finished case for record keeping.",
      "Does not replace the staff or officer workflow steps.",
    ],
  },
];

export const workflowStages: WorkflowStage[] = [
  {
    id: "draft",
    label: "Draft",
    note: "Staff is still preparing the case and required documents.",
  },
  {
    id: "submitted",
    label: "Submitted",
    note: "The case is waiting for officer review and document checks.",
  },
  {
    id: "changes_requested",
    label: "Changes requested",
    note: "Officer review found something that needs to be corrected before the case can continue.",
  },
  {
    id: "ready_for_decision",
    label: "Ready for decision",
    note: "Officer review is complete and the case can move to the final decision stage.",
  },
  {
    id: "approved",
    label: "Approved",
    note: "The case has been approved and can be archived when the workflow is complete.",
  },
  {
    id: "archived",
    label: "Archived",
    note: "The case is closed in the demo. Reset the simulator to explore another path.",
  },
];

export const workflowDemoInitialState: WorkflowDemoState = {
  currentRole: "staff",
  status: "draft",
  caseId: "SM-2026-014",
  applicantName: "Elena Koleva",
  faculty: "Informatics",
  destination: "University of Graz",
  programme: "Erasmus+ Training",
  plannedDays: 5,
  visitedStages: ["draft"],
  nextHistoryId: 4,
  documents: [
    {
      id: "invitation_letter",
      label: "Invitation letter",
      required: true,
      state: "approved",
      note: "Already uploaded and reviewed.",
    },
    {
      id: "budget_form",
      label: "Budget form",
      required: true,
      state: "uploaded",
      note: "Uploaded by staff and waiting for officer review.",
    },
    {
      id: "signed_agreement",
      label: "Signed agreement",
      required: true,
      state: "missing",
      note: "Still missing at the start of the demo.",
    },
  ],
  history: [
    {
      id: 1,
      actor: "staff",
      action: "Created draft case",
      detail: "Started a mobility case for the University of Graz.",
    },
    {
      id: 2,
      actor: "staff",
      action: "Uploaded invitation letter",
      detail: "The host invitation is already on file and ready for review.",
    },
    {
      id: 3,
      actor: "staff",
      action: "Uploaded budget form",
      detail: "The budget estimate is ready for officer review.",
    },
  ],
};
