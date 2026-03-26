import type { Task, TaskStats } from "../types";

const getBoardStats = (tasks: Task[]): TaskStats => ({
  total: tasks.length,
  inProgress: tasks.filter((task) => task.status === "IN_PROGRESS").length,
  highPriority: tasks.filter((task) => task.priority === "HIGH").length,
  completed: tasks.filter((task) => task.status === "DONE").length,
});

export { getBoardStats };
