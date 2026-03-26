import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { ToastProvider } from "../components/ui/Toast";
import { createSampleTasks } from "../features/tasks/data/seedTasks";
import { useTaskStore } from "../features/tasks/store/useTaskStore";
import { BoardPage } from "./BoardPage";

const renderBoard = (initialEntry = "/") =>
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <ToastProvider>
        <BoardPage />
      </ToastProvider>
    </MemoryRouter>,
  );

describe("BoardPage", () => {
  beforeEach(() => {
    window.localStorage.clear();
    useTaskStore.setState({
      tasks: createSampleTasks(),
      migrationPerformed: false,
      storageError: null,
    });
  });

  it("creates a task and shows it on the board", async () => {
    const user = userEvent.setup();

    renderBoard();

    await user.click(screen.getByRole("button", { name: /new task/i }));

    await user.type(screen.getByLabelText(/^Title$/i), "Follow up with beta design partners");
    await user.type(
      screen.getByLabelText(/^Description$/i),
      "Collect feedback from this week's prototype review and summarize the top three improvements.",
    );
    await user.type(screen.getByLabelText(/^Assignee$/i), "Ravi");
    await user.type(screen.getByLabelText(/^Tags$/i), "research, customer");
    await user.click(screen.getByRole("button", { name: /create task/i }));

    expect(
      screen.getByRole("heading", { name: /follow up with beta design partners/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("#research").length).toBeGreaterThan(0);
  });

  it("filters the board down to matching tasks", async () => {
    const user = userEvent.setup();

    renderBoard();

    await user.type(screen.getByLabelText(/search/i), "analytics summary");

    expect(
      screen.getByRole("heading", {
        name: /ship analytics summary for delivery managers/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", {
        name: /audit onboarding friction for new workspace members/i,
      }),
    ).not.toBeInTheDocument();

    const inProgressColumn = screen.getByRole("region", { name: /in progress/i });
    expect(
      within(inProgressColumn).getByRole("heading", {
        name: /ship analytics summary for delivery managers/i,
      }),
    ).toBeInTheDocument();
  });
});
