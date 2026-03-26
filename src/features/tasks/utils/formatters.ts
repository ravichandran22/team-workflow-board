import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import type { Priority, Status } from "../types";

dayjs.extend(relativeTime);

const STATUS_LABELS: Record<Status, string> = {
  BACKLOG: "Backlog",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};

const PRIORITY_LABELS: Record<Priority, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
};

const PRIORITY_WEIGHT: Record<Priority, number> = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
};

const formatRelativeTime = (isoDate: string) => `Updated ${dayjs(isoDate).fromNow()}`;
const formatStatus = (status: Status) => STATUS_LABELS[status];
const formatPriority = (priority: Priority) => PRIORITY_LABELS[priority];
const getPriorityWeight = (priority: Priority) => PRIORITY_WEIGHT[priority];

export {
  formatPriority,
  formatRelativeTime,
  formatStatus,
  getPriorityWeight,
};
