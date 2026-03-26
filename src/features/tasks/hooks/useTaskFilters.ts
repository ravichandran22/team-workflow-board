import { useSearchParams } from "react-router-dom";
import {
  TASK_PRIORITIES,
  TASK_SORT_OPTIONS,
  TASK_STATUSES,
  type Priority,
  type Status,
  type TaskFiltersState,
  type TaskSort,
} from "../types";
import { defaultTaskFilters } from "../utils/defaults";

const isStatus = (value: string): value is Status =>
  TASK_STATUSES.includes(value as Status);

const isPriority = (value: string): value is Priority =>
  TASK_PRIORITIES.includes(value as Priority);

const isSort = (value: string): value is TaskSort =>
  TASK_SORT_OPTIONS.includes(value as TaskSort);

const readFiltersFromParams = (searchParams: URLSearchParams): TaskFiltersState => {
  const statuses = (searchParams.get("status") ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(isStatus);

  const priorityValue = searchParams.get("priority");
  const sortValue = searchParams.get("sort");

  return {
    search: searchParams.get("q") ?? defaultTaskFilters.search,
    statuses,
    priority:
      priorityValue && isPriority(priorityValue)
        ? priorityValue
        : defaultTaskFilters.priority,
    sort:
      sortValue && isSort(sortValue)
        ? sortValue
        : defaultTaskFilters.sort,
  };
};

const useTaskFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = readFiltersFromParams(searchParams);

  const writeFilters = (next: TaskFiltersState) => {
    const params = new URLSearchParams();

    if (next.search) {
      params.set("q", next.search);
    }

    if (next.statuses.length > 0) {
      params.set("status", next.statuses.join(","));
    }

    if (next.priority !== "ALL") {
      params.set("priority", next.priority);
    }

    if (next.sort !== defaultTaskFilters.sort) {
      params.set("sort", next.sort);
    }

    setSearchParams(params, { replace: true });
  };

  return {
    filters,
    setSearch: (search: string) => writeFilters({ ...filters, search }),
    setPriority: (priority: Priority | "ALL") =>
      writeFilters({ ...filters, priority }),
    setSort: (sort: TaskSort) => writeFilters({ ...filters, sort }),
    toggleStatus: (status: Status) => {
      const statuses = filters.statuses.includes(status)
        ? filters.statuses.filter((value) => value !== status)
        : [...filters.statuses, status];

      writeFilters({ ...filters, statuses });
    },
  };
};

export { useTaskFilters };
