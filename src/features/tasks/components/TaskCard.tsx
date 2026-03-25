import { memo } from "react";
import { Badge } from "../../../components/ui/Badge";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import { Select, SelectOption } from "../../../components/ui/Select";
import { TASK_STATUSES, type Status, type Task } from "../types";
import {
  formatPriority,
  formatRelativeTime,
  formatStatus,
} from "../utils/formatters";

interface TaskCardProps {
  onEditTask: (taskId: string) => void;
  onStatusChange: (taskId: string, status: Status) => void;
  task: Task;
}

const priorityTone = {
  LOW: "success",
  MEDIUM: "warning",
  HIGH: "danger",
} as const;

const TaskCard = memo(({ onEditTask, onStatusChange, task }: TaskCardProps) => {
  return (
    <Card className="task-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="m-0 text-base font-semibold text-[var(--color-ink-950)]">
            {task.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-[var(--color-ink-700)]">
            {task.description}
          </p>
        </div>
        <Badge tone={priorityTone[task.priority]}>{formatPriority(task.priority)}</Badge>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {task.tags.map((tag) => (
          <Badge key={tag} tone="neutral">
            #{tag}
          </Badge>
        ))}
      </div>

      <dl className="mt-4 grid gap-2 text-sm text-[var(--color-ink-700)]">
        <div className="flex items-center justify-between gap-3">
          <dt className="font-medium text-[var(--color-ink-500)]">Assignee</dt>
          <dd className="m-0 font-semibold text-[var(--color-ink-900)]">
            {task.assignee}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="font-medium text-[var(--color-ink-500)]">Last update</dt>
          <dd className="m-0">{formatRelativeTime(task.updatedAt)}</dd>
        </div>
      </dl>

      <div className="mt-4 grid gap-3">
        <Select
          aria-label={`Change status for ${task.title}`}
          onChange={(event) => onStatusChange(task.id, event.currentTarget.value as Status)}
          value={task.status}
        >
          {TASK_STATUSES.map((status) => (
            <SelectOption key={status} value={status}>
              {formatStatus(status)}
            </SelectOption>
          ))}
        </Select>

        <Button onClick={() => onEditTask(task.id)} variant="secondary">
          Edit task
        </Button>
      </div>
    </Card>
  );
});

TaskCard.displayName = "TaskCard";

export { TaskCard };
