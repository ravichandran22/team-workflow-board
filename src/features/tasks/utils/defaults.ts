import type { TaskDraft, TaskFiltersState } from "../types";

const defaultTaskDraft: TaskDraft = {
  title: "",
  description: "",
  status: "BACKLOG",
  priority: "MEDIUM",
  assignee: "",
  tags: [],
};

const defaultTaskFilters: TaskFiltersState = {
  search: "",
  statuses: [],
  priority: "ALL",
  sort: "UPDATED_DESC",
};

export { defaultTaskDraft, defaultTaskFilters };
