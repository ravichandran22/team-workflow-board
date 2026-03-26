import type { TaskStats } from "../../features/tasks/types";
import { Button } from "../ui/Button";

interface AppHeaderProps {
  hasTasks: boolean;
  onClearBoard: () => void;
  stats: TaskStats;
  onCreateTask: () => void;
  onLoadSampleTasks: () => void;
}

const AppHeader = ({
  hasTasks,
  onClearBoard,
  onCreateTask,
  onLoadSampleTasks,
  stats,
}: AppHeaderProps) => {
  return (
    <header className="hero-card">
      <p className="hero-kicker">Team Planning Workspace</p>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="hero-title">Team Workflow Board</h1>
          <p className="hero-subtitle">
            Track incoming work, keep delivery moving, and stay honest about
            what is blocked, active, or complete.
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-start lg:justify-end">
          {hasTasks ? (
            <Button onClick={onClearBoard} size="lg" variant="destructive">
              Clear board
            </Button>
          ) : (
            <Button onClick={onLoadSampleTasks} size="lg" variant="secondary">
              Load sample tasks
            </Button>
          )}
          <Button onClick={onCreateTask} size="lg" variant="primary">
            New task
          </Button>
        </div>
      </div>

      <div className="hero-meta">
        <div className="hero-stat">
          <span className="hero-stat-label">Total tasks</span>
          <span className="hero-stat-value">{stats.total}</span>
        </div>
        <div className="hero-stat">
          <span className="hero-stat-label">In progress</span>
          <span className="hero-stat-value">{stats.inProgress}</span>
        </div>
        <div className="hero-stat">
          <span className="hero-stat-label">High priority</span>
          <span className="hero-stat-value">{stats.highPriority}</span>
        </div>
        <div className="hero-stat">
          <span className="hero-stat-label">Done</span>
          <span className="hero-stat-value">{stats.completed}</span>
        </div>
      </div>
    </header>
  );
};

export { AppHeader };
