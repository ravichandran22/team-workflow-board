import { Badge } from "../../../components/ui/Badge";
import type { Status, Task } from "../types";
import { formatStatus } from "../utils/formatters";
import { TaskCard } from "./TaskCard";

interface TaskColumnProps {
  onEditTask: (taskId: string) => void;
  onStatusChange: (taskId: string, status: Status) => void;
  status: Status;
  tasks: Task[];
}

const TaskColumn = ({
  onEditTask,
  onStatusChange,
  status,
  tasks,
}: TaskColumnProps) => {
  return (
    <section aria-label={formatStatus(status)} className="board-column">
      <div className="board-column-header">
        <div>
          <h2 className="m-0 text-lg font-semibold text-[var(--color-ink-950)]">
            {formatStatus(status)}
          </h2>
          <p className="mt-1 text-sm text-[var(--color-ink-500)]">
            Keep this lane honest and current.
          </p>
        </div>
        <Badge tone="info">{tasks.length}</Badge>
      </div>

      <div className="board-column-body">
        {tasks.length ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              onEditTask={onEditTask}
              onStatusChange={onStatusChange}
              task={task}
            />
          ))
        ) : (
          <div className="empty-state min-h-[180px]">
            <h3 className="m-0 text-lg font-semibold">Nothing here yet</h3>
            <p className="m-0 text-sm">
              Move work into this column or create a new task to get started.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export { TaskColumn };
