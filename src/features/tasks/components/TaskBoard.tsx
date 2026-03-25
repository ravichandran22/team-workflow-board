import { TASK_STATUSES, type Status, type Task } from "../types";
import { TaskColumn } from "./TaskColumn";

interface TaskBoardProps {
  onEditTask: (taskId: string) => void;
  onStatusChange: (taskId: string, status: Status) => void;
  tasks: Task[];
  totalTasks: number;
}

const TaskBoard = ({
  onEditTask,
  onStatusChange,
  tasks,
  totalTasks,
}: TaskBoardProps) => {
  if (!totalTasks) {
    return (
      <div className="empty-state">
        <h2 className="m-0 text-xl font-semibold">No tasks yet</h2>
        <p className="m-0 max-w-lg">
          Create your first task to start managing workload across backlog,
          active delivery, and completed work.
        </p>
      </div>
    );
  }

  if (!tasks.length) {
    return (
      <div className="empty-state">
        <h2 className="m-0 text-xl font-semibold">No matches for these filters</h2>
        <p className="m-0 max-w-lg">
          Try widening the status filters or clearing your search to reveal more
          tasks on the board.
        </p>
      </div>
    );
  }

  return (
    <div className="board-columns">
      {TASK_STATUSES.map((status) => (
        <TaskColumn
          key={status}
          onEditTask={onEditTask}
          onStatusChange={onStatusChange}
          status={status}
          tasks={tasks.filter((task) => task.status === status)}
        />
      ))}
    </div>
  );
};

export { TaskBoard };
