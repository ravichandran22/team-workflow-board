import { Button } from "../../../components/ui/Button";
import { Field } from "../../../components/ui/Field";
import { Select, SelectOption } from "../../../components/ui/Select";
import { TextInput } from "../../../components/ui/TextInput";
import {
  TASK_PRIORITIES,
  TASK_STATUSES,
  type Priority,
  type Status,
  type TaskFiltersState,
  type TaskSort,
} from "../types";
import { formatPriority, formatStatus } from "../utils/formatters";

interface TaskFiltersProps {
  filters: TaskFiltersState;
  onPriorityChange: (priority: Priority | "ALL") => void;
  onSearchChange: (search: string) => void;
  onSortChange: (sort: TaskSort) => void;
  onStatusToggle: (status: Status) => void;
  taskCount: number;
  totalTaskCount: number;
}

const TaskFilters = ({
  filters,
  onPriorityChange,
  onSearchChange,
  onSortChange,
  onStatusToggle,
  taskCount,
  totalTaskCount,
}: TaskFiltersProps) => {
  return (
    <div className="stack">
      <div className="rounded-[24px] border border-[rgba(205,214,227,0.8)] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(244,248,252,0.8))] px-4 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
        <p className="m-0 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-600)]">
          Search and refine
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-[var(--color-ink-950)]">
          Focus the board
        </h2>
        <p className="mt-2 text-sm leading-7 text-[var(--color-ink-700)]">
          Showing {taskCount} of {totalTaskCount} task{totalTaskCount === 1 ? "" : "s"}.
        </p>
      </div>

      <div className="filters-grid">
        <Field htmlFor="task-search" label="Search">
          <TextInput
            id="task-search"
            onChange={(event) => onSearchChange(event.currentTarget.value)}
            placeholder="Search title or description"
            value={filters.search}
          />
        </Field>

        <Field htmlFor="task-priority-filter" label="Priority">
          <Select
            id="task-priority-filter"
            onChange={(event) => onPriorityChange(event.currentTarget.value as Priority | "ALL")}
            value={filters.priority}
          >
            <SelectOption value="ALL">All priorities</SelectOption>
            {TASK_PRIORITIES.map((priority) => (
              <SelectOption key={priority} value={priority}>
                {formatPriority(priority)}
              </SelectOption>
            ))}
          </Select>
        </Field>

        <Field htmlFor="task-sort" label="Sort by">
          <Select
            id="task-sort"
            onChange={(event) => onSortChange(event.currentTarget.value as TaskSort)}
            value={filters.sort}
          >
            <SelectOption value="UPDATED_DESC">Recently updated</SelectOption>
            <SelectOption value="CREATED_DESC">Recently created</SelectOption>
            <SelectOption value="PRIORITY_DESC">Priority</SelectOption>
          </Select>
        </Field>

        <div className="stack gap-3 rounded-[24px] border border-[rgba(205,214,227,0.8)] bg-[rgba(255,255,255,0.66)] px-4 py-4">
          <span className="text-sm font-semibold text-[var(--color-ink-900)]">
            Status
          </span>
          <div className="status-filter-row">
            {TASK_STATUSES.map((status) => (
              <Button
                aria-pressed={filters.statuses.includes(status)}
                isActive={filters.statuses.includes(status)}
                key={status}
                onClick={() => onStatusToggle(status)}
                size="sm"
                variant="secondary"
              >
                {formatStatus(status)}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { TaskFilters };
