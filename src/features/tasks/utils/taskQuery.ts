import type { Task, TaskFiltersState } from "../types";
import { defaultTaskFilters } from "./defaults";
import { getPriorityWeight } from "./formatters";

const filterAndSortTasks = (
  tasks: Task[],
  filters: TaskFiltersState = defaultTaskFilters,
) => {
  const search = filters.search.trim().toLowerCase();

  return [...tasks]
    .filter((task) => {
      if (filters.statuses.length > 0 && !filters.statuses.includes(task.status)) {
        return false;
      }

      if (filters.priority !== "ALL" && task.priority !== filters.priority) {
        return false;
      }

      if (!search) {
        return true;
      }

      return `${task.title} ${task.description}`.toLowerCase().includes(search);
    })
    .sort((left, right) => {
      switch (filters.sort) {
        case "CREATED_DESC":
          return (
            new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()
          );
        case "PRIORITY_DESC":
          return getPriorityWeight(right.priority) - getPriorityWeight(left.priority);
        case "UPDATED_DESC":
        default:
          return (
            new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()
          );
      }
    });
};

export { filterAndSortTasks };
