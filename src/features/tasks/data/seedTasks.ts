import type { Task } from "../types";

const now = new Date();

const minutesAgo = (minutes: number) =>
  new Date(now.getTime() - minutes * 60 * 1000).toISOString();

const daysAgo = (days: number) =>
  new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString();

const seedTasks: Task[] = [
  {
    id: "task-website-audit",
    title: "Audit onboarding friction for new workspace members",
    description:
      "Capture current onboarding steps, identify drop-off points, and turn the findings into a short recommendation deck for product and support.",
    status: "BACKLOG",
    priority: "HIGH",
    assignee: "Ava",
    tags: ["research", "ux"],
    createdAt: daysAgo(3),
    updatedAt: minutesAgo(95),
  },
  {
    id: "task-analytics-panel",
    title: "Ship analytics summary for delivery managers",
    description:
      "Add weekly throughput and blocked-item counts to the operations overview so team leads can spot risk earlier in the sprint.",
    status: "IN_PROGRESS",
    priority: "HIGH",
    assignee: "Maya",
    tags: ["dashboard", "reporting"],
    createdAt: daysAgo(5),
    updatedAt: minutesAgo(22),
  },
  {
    id: "task-accessibility-pass",
    title: "Accessibility pass on settings modals",
    description:
      "Review focus order, labels, and escape routes for settings dialogs. Document any keyboard traps and patch the highest-impact issues.",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
    assignee: "Noah",
    tags: ["a11y", "frontend"],
    createdAt: daysAgo(2),
    updatedAt: minutesAgo(180),
  },
  {
    id: "task-release-notes",
    title: "Prepare release notes for March workflow update",
    description:
      "Summarize the workflow board improvements, migration caveats, and rollout sequencing for customer success and internal stakeholders.",
    status: "DONE",
    priority: "LOW",
    assignee: "Ishita",
    tags: ["ops", "documentation"],
    createdAt: daysAgo(8),
    updatedAt: daysAgo(1),
  },
];

export { seedTasks };
