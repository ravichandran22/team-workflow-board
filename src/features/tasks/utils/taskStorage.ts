import { createSampleTasks } from "../data/seedTasks";
import type {
  LegacyTaskV1,
  PersistedTaskEnvelopeV1,
  PersistedTaskEnvelopeV2,
  Task,
  TaskStorageResult,
} from "../types";

const STORAGE_KEY = "team-workflow-board.tasks";
const CURRENT_SCHEMA_VERSION = 2;

const isStorageAvailable = () => {
  try {
    const testKey = "__team-workflow-board__";
    window.localStorage.setItem(testKey, "ok");
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

const normalizeLegacyTask = (task: LegacyTaskV1): Task => ({
  id: task.id,
  title: task.title,
  description: task.description,
  status: task.status,
  priority: "MEDIUM",
  assignee: task.assignee ?? "",
  tags: [],
  createdAt: task.createdAt,
  updatedAt: task.updatedAt,
});

const writeTasksToStorage = (tasks: Task[]) => {
  const envelope: PersistedTaskEnvelopeV2 = {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    tasks,
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(envelope));
};

const readTasksFromStorage = (): TaskStorageResult => {
  if (typeof window === "undefined") {
    return { tasks: createSampleTasks(), migrationPerformed: false, storageError: null };
  }

  if (!isStorageAvailable()) {
    return {
      tasks: createSampleTasks(),
      migrationPerformed: false,
      storageError: "Local storage is blocked in this browser context",
    };
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    const sampleTasks = createSampleTasks();
    writeTasksToStorage(sampleTasks);
    return { tasks: sampleTasks, migrationPerformed: false, storageError: null };
  }

  try {
    const parsed = JSON.parse(raw) as PersistedTaskEnvelopeV1 | PersistedTaskEnvelopeV2;

    if ("schemaVersion" in parsed && parsed.schemaVersion === 2) {
      return {
        tasks: parsed.tasks,
        migrationPerformed: false,
        storageError: null,
      };
    }

    const migratedTasks = parsed.tasks.map(normalizeLegacyTask);
    writeTasksToStorage(migratedTasks);
    return {
      tasks: migratedTasks,
      migrationPerformed: true,
      storageError: null,
    };
  } catch {
    return {
      tasks: createSampleTasks(),
      migrationPerformed: false,
      storageError: "Stored task data could not be read",
    };
  }
};

export {
  CURRENT_SCHEMA_VERSION,
  STORAGE_KEY,
  readTasksFromStorage,
  writeTasksToStorage,
};
