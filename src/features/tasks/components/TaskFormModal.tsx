import type { useTaskForm } from "../hooks/useTaskForm";
import { TASK_PRIORITIES, TASK_STATUSES, type Priority, type Status } from "../types";
import { formatPriority, formatStatus } from "../utils/formatters";
import { Alert } from "../../../components/ui/Alert";
import { Button } from "../../../components/ui/Button";
import { Field } from "../../../components/ui/Field";
import { Modal } from "../../../components/ui/Modal";
import { Select, SelectOption } from "../../../components/ui/Select";
import { TextArea } from "../../../components/ui/TextArea";
import { TextInput } from "../../../components/ui/TextInput";

interface TaskFormModalProps {
  form: ReturnType<typeof useTaskForm>;
  isOpen: boolean;
  onClose: () => void;
  submitLabel: string;
  title: string;
}

const TaskFormModal = ({
  form,
  isOpen,
  onClose,
  submitLabel,
  title,
}: TaskFormModalProps) => {
  const handleClose = () => {
    if (form.isDirty && !window.confirm("Discard unsaved changes?")) {
      return;
    }

    form.reset();
    onClose();
  };

  return (
    <Modal
      description="Provide enough detail so a teammate can pick this up without extra context."
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
    >
      <div className="stack">
        {form.hasErrors ? (
          <Alert
            description="Please correct the highlighted fields before saving this task."
            title="There are validation errors"
            tone="error"
          />
        ) : null}

        <div className="stack">
          <Field error={form.errors.title} htmlFor={`${title}-task-title`} label="Title">
            <TextInput
              aria-describedby={form.errors.title ? `${title}-task-title-error` : undefined}
              hasError={Boolean(form.errors.title)}
              id={`${title}-task-title`}
              onChange={(event) => form.updateField("title", event.currentTarget.value)}
              placeholder="Summarize the work in one line"
              value={form.values.title}
            />
          </Field>

          <Field
            error={form.errors.description}
            htmlFor={`${title}-task-description`}
            label="Description"
          >
            <TextArea
              aria-describedby={
                form.errors.description ? `${title}-task-description-error` : undefined
              }
              hasError={Boolean(form.errors.description)}
              id={`${title}-task-description`}
              onChange={(event) => form.updateField("description", event.currentTarget.value)}
              placeholder="Add enough detail for the next person to continue the work."
              value={form.values.description}
            />
          </Field>

          <div className="inline-fields">
            <Field error={form.errors.assignee} htmlFor={`${title}-task-assignee`} label="Assignee">
              <TextInput
                aria-describedby={
                  form.errors.assignee ? `${title}-task-assignee-error` : undefined
                }
                hasError={Boolean(form.errors.assignee)}
                id={`${title}-task-assignee`}
                onChange={(event) => form.updateField("assignee", event.currentTarget.value)}
                placeholder="Who owns this next?"
                value={form.values.assignee}
              />
            </Field>

            <Field htmlFor={`${title}-task-tags`} hint="Comma-separated" label="Tags">
              <TextInput
                id={`${title}-task-tags`}
                onChange={(event) => form.setTagInput(event.currentTarget.value)}
                placeholder="frontend, design-system"
                value={form.tagInput}
              />
            </Field>

            <Field htmlFor={`${title}-task-status`} label="Status">
              <Select
                id={`${title}-task-status`}
                onChange={(event) => form.updateField("status", event.currentTarget.value as Status)}
                value={form.values.status}
              >
                {TASK_STATUSES.map((status) => (
                  <SelectOption key={status} value={status}>
                    {formatStatus(status)}
                  </SelectOption>
                ))}
              </Select>
            </Field>

            <Field htmlFor={`${title}-task-priority`} label="Priority">
              <Select
                id={`${title}-task-priority`}
                onChange={(event) =>
                  form.updateField("priority", event.currentTarget.value as Priority)
                }
                value={form.values.priority}
              >
                {TASK_PRIORITIES.map((priority) => (
                  <SelectOption key={priority} value={priority}>
                    {formatPriority(priority)}
                  </SelectOption>
                ))}
              </Select>
            </Field>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button onClick={handleClose} variant="ghost">
            Cancel
          </Button>
          <Button
            onClick={() => {
              const isSuccessful = form.handleSubmit();

              if (isSuccessful) {
                form.reset();
              }
            }}
            variant="primary"
          >
            {submitLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export { TaskFormModal };
