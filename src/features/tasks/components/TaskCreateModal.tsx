import { useTaskForm } from "../hooks/useTaskForm";
import type { TaskDraft } from "../types";
import { TaskFormModal } from "./TaskFormModal";

interface TaskCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: TaskDraft) => void;
}

const TaskCreateModal = ({
  isOpen,
  onClose,
  onSubmit,
}: TaskCreateModalProps) => {
  const form = useTaskForm({
    onSubmit: (values) => {
      onSubmit(values);
      onClose();
    },
  });

  return (
    <TaskFormModal
      form={form}
      isOpen={isOpen}
      onClose={onClose}
      submitLabel="Create task"
      title="Create task"
    />
  );
};

export { TaskCreateModal };
