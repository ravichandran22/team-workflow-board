import { create } from "zustand";
import type { Task } from "../types";

interface TaskState {
  tasks: Task[];
  addTask: (task: Task) => void;
}

export const useTasks = create<TaskState>((set) => ({
  tasks: [],
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),
}));