import { useMemo, useState } from "react";
import { AppHeader } from "../components/layout/AppHeader";
import { useToast } from "../components/ui/useToast";
import {
  TaskBoard,
  TaskCreateModal,
  TaskEditModal,
  TaskFilters,
} from "../features/tasks/components";
import { useTaskFilters } from "../features/tasks/hooks/useTaskFilters";
import { useTaskStore } from "../features/tasks/store/useTaskStore";
import { filterAndSortTasks } from "../features/tasks/utils/taskQuery";
import { getBoardStats } from "../features/tasks/utils/taskStats";

const BoardPage = () => {
  const { pushToast } = useToast();
  const tasks = useTaskStore((state) => state.tasks);
  const storageError = useTaskStore((state) => state.storageError);
  const migrationPerformed = useTaskStore((state) => state.migrationPerformed);
  const dismissMigrationNotice = useTaskStore(
    (state) => state.dismissMigrationNotice,
  );
  const createTask = useTaskStore((state) => state.createTask);
  const clearTasks = useTaskStore((state) => state.clearTasks);
  const loadSampleTasks = useTaskStore((state) => state.loadSampleTasks);
  const updateTask = useTaskStore((state) => state.updateTask);
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);
  const { filters, setPriority, setSearch, setSort, toggleStatus } =
    useTaskFilters();
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filteredTasks = useMemo(
    () => filterAndSortTasks(tasks, filters),
    [filters, tasks],
  );
  const stats = useMemo(() => getBoardStats(tasks), [tasks]);
  const editingTask = useMemo(
    () => tasks.find((task) => task.id === editingTaskId) ?? null,
    [editingTaskId, tasks],
  );

  return (
    <div className="app-shell">
      <div className="app-frame">
        <AppHeader
          hasTasks={tasks.length > 0}
          onClearBoard={() => {
            if (!window.confirm("Clear all tasks from the board?")) {
              return;
            }

            clearTasks();
            pushToast({
              title: "Board cleared",
              description: "All tasks were removed from local storage.",
              tone: "warning",
            });
          }}
          onCreateTask={() => setIsCreateOpen(true)}
          onLoadSampleTasks={() => {
            loadSampleTasks();
            pushToast({
              title: "Sample tasks loaded",
              description: "Restored the demo board so you can explore the flows.",
              tone: "info",
            });
          }}
          stats={stats}
        />

        <div className="board-layout">
          <aside className="toolbar-card">
            <TaskFilters
              filters={filters}
              onPriorityChange={setPriority}
              onSearchChange={setSearch}
              onSortChange={setSort}
              onStatusToggle={toggleStatus}
              taskCount={filteredTasks.length}
              totalTaskCount={tasks.length}
            />
          </aside>

          <section className="content-card">
            {migrationPerformed ? (
              <div className="mb-4 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-900">
                We updated older task data to the latest board schema.
                <button
                  className="ml-3 font-semibold text-sky-700 underline-offset-2 hover:underline"
                  onClick={dismissMigrationNotice}
                  type="button"
                >
                  Dismiss
                </button>
              </div>
            ) : null}

            {storageError ? (
              <div className="empty-state">
                <h2 className="m-0 text-xl font-semibold">Storage unavailable</h2>
                <p className="m-0 max-w-lg">
                  {storageError}. You can still review the interface, but task
                  changes will not persist until browser storage is available.
                </p>
              </div>
            ) : (
              <TaskBoard
                onEditTask={setEditingTaskId}
                onStatusChange={(taskId, status) => {
                  updateTaskStatus(taskId, status);
                  pushToast({
                    title: "Status updated",
                    description: `Moved task to ${status.replace("_", " ").toLowerCase()}.`,
                    tone: "info",
                  });
                }}
                tasks={filteredTasks}
                totalTasks={tasks.length}
              />
            )}
          </section>
        </div>
      </div>

      {isCreateOpen ? (
        <TaskCreateModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onSubmit={(values) => {
            createTask(values);
            pushToast({
              title: "Task created",
              description: `Added "${values.title}" to the board.`,
              tone: "success",
            });
          }}
        />
      ) : null}

      {editingTask ? (
        <TaskEditModal
          isOpen={Boolean(editingTask)}
          onClose={() => setEditingTaskId(null)}
          onSubmit={(values, taskId) => {
            updateTask(taskId, values);
            pushToast({
              title: "Task updated",
              description: `Saved changes to "${values.title}".`,
              tone: "info",
            });
          }}
          task={editingTask}
        />
      ) : null}
    </div>
  );
};

export { BoardPage };
