import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import type { Status, Task, TaskDraft } from "../types";
import { readTasksFromStorage, writeTasksToStorage } from "../utils/taskStorage";

interface TaskStore {
  createTask: (draft: TaskDraft) => void;
  dismissMigrationNotice: () => void;
  migrationPerformed: boolean;
  storageError: string | null;
  tasks: Task[];
  updateTask: (taskId: string, draft: TaskDraft) => void;
  updateTaskStatus: (taskId: string, status: Status) => void;
}

const initialStorage = readTasksFromStorage();

const buildTask = (draft: TaskDraft): Task => {
  const timestamp = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    ...draft,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
};

const persistTasks = (tasks: Task[]) => {
  writeTasksToStorage(tasks);
  return tasks;
};

const useTaskStore = create<TaskStore>()(
  subscribeWithSelector((set) => ({
    createTask: (draft) =>
      set((state) => ({
        tasks: persistTasks([buildTask(draft), ...state.tasks]),
      })),
    dismissMigrationNotice: () => set({ migrationPerformed: false }),
    migrationPerformed: initialStorage.migrationPerformed,
    storageError: initialStorage.storageError,
    tasks: initialStorage.tasks,
    updateTask: (taskId, draft) =>
      set((state) => ({
        tasks: persistTasks(
          state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  ...draft,
                  updatedAt: new Date().toISOString(),
                }
              : task,
          ),
        ),
      })),
    updateTaskStatus: (taskId, status) =>
      set((state) => ({
        tasks: persistTasks(
          state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  status,
                  updatedAt: new Date().toISOString(),
                }
              : task,
          ),
        ),
      })),
  })),
);

export { useTaskStore };
