export const TASK_STATUSES = ["BACKLOG", "IN_PROGRESS", "DONE"] as const;
export const TASK_PRIORITIES = ["LOW", "MEDIUM", "HIGH"] as const;
export const TASK_SORT_OPTIONS = [
  "UPDATED_DESC",
  "CREATED_DESC",
  "PRIORITY_DESC",
] as const;

export type Status = (typeof TASK_STATUSES)[number];
export type Priority = (typeof TASK_PRIORITIES)[number];
export type TaskSort = (typeof TASK_SORT_OPTIONS)[number];

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignee: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TaskDraft {
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignee: string;
  tags: string[];
}

export interface TaskFiltersState {
  search: string;
  statuses: Status[];
  priority: Priority | "ALL";
  sort: TaskSort;
}

export interface TaskStats {
  total: number;
  inProgress: number;
  highPriority: number;
  completed: number;
}

export interface TaskStorageResult {
  tasks: Task[];
  migrationPerformed: boolean;
  storageError: string | null;
}

export interface LegacyTaskV1 {
  id: string;
  title: string;
  description: string;
  status: Status;
  assignee?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PersistedTaskEnvelopeV1 {
  schemaVersion?: 1;
  tasks: LegacyTaskV1[];
}

export interface PersistedTaskEnvelopeV2 {
  schemaVersion: 2;
  tasks: Task[];
}
