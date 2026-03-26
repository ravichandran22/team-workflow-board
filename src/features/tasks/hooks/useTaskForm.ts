import { useEffect, useMemo, useState } from "react";
import type { Task, TaskDraft } from "../types";
import { defaultTaskDraft } from "../utils/defaults";

interface TaskFormErrors {
  assignee?: string;
  description?: string;
  title?: string;
}

interface UseTaskFormOptions {
  onSubmit: (values: TaskDraft, taskId?: string) => void;
  task?: Task | null;
}

const buildFormState = (task?: Task | null): TaskDraft =>
  task
    ? {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        assignee: task.assignee,
        tags: task.tags,
      }
    : defaultTaskDraft;

const parseTags = (value: string) =>
  value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

const validateTask = (values: TaskDraft): TaskFormErrors => {
  const errors: TaskFormErrors = {};

  if (!values.title.trim()) {
    errors.title = "Title is required.";
  }

  if (values.title.trim().length > 80) {
    errors.title = "Keep the title under 80 characters.";
  }

  if (!values.description.trim()) {
    errors.description = "Description is required.";
  }

  if (!values.assignee.trim()) {
    errors.assignee = "Assignee is required.";
  }

  return errors;
};

const useTaskForm = ({ onSubmit, task }: UseTaskFormOptions) => {
  const [values, setValues] = useState<TaskDraft>(buildFormState(task));
  const [tagInput, setTagInput] = useState(task?.tags.join(", ") ?? "");
  const [errors, setErrors] = useState<TaskFormErrors>({});
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (!isDirty) {
      return undefined;
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  const updateField = <Key extends keyof TaskDraft>(field: Key, value: TaskDraft[Key]) => {
    setValues((current) => ({ ...current, [field]: value }));
    setIsDirty(true);
  };

  const handleSubmit = () => {
    const nextValues = {
      ...values,
      title: values.title.trim(),
      description: values.description.trim(),
      assignee: values.assignee.trim(),
      tags: parseTags(tagInput),
    };

    const nextErrors = validateTask(nextValues);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return false;
    }

    onSubmit(nextValues, task?.id);
    return true;
  };

  const reset = () => {
    setValues(buildFormState(task));
    setTagInput(task?.tags.join(", ") ?? "");
    setErrors({});
    setIsDirty(false);
  };

  return {
    errors,
    hasErrors,
    handleSubmit,
    isDirty,
    reset,
    setTagInput: (nextTagInput: string) => {
      setTagInput(nextTagInput);
      setIsDirty(true);
    },
    tagInput,
    updateField,
    values,
  };
};

export { useTaskForm };
