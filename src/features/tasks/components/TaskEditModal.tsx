import { useTaskForm } from "../hooks/useTaskForm";
import type { Task, TaskDraft } from "../types";
import { TaskFormModal } from "./TaskFormModal";

interface TaskEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: TaskDraft, taskId: string) => void;
  task: Task;
}

const TaskEditModal = ({
  isOpen,
  onClose,
  onSubmit,
  task,
}: TaskEditModalProps) => {
  const form = useTaskForm({
    onSubmit: (values, taskId) => {
      if (!taskId) {
        return;
      }

      onSubmit(values, taskId);
      onClose();
    },
    task,
  });

  return (
    <TaskFormModal
      form={form}
      isOpen={isOpen}
      onClose={onClose}
      submitLabel="Save changes"
      title="Edit task"
    />
  );
};

export { TaskEditModal };
