# Team Workflow Board

A small React + TypeScript workflow board with a reusable component library, local-first persistence, URL-backed filters, and tests.

## How to Run

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal. The board persists data in browser `localStorage`.

## Scripts

```bash
npm run build
npm run lint
npm run test
```

## Architecture Overview

### Structure

- `src/components/ui` contains the reusable design-system primitives: `Button`, `TextInput`, `TextArea`, `Select`, `Badge`, `Card`, `Modal`, `Alert`, and `Toast`.
- `src/components/layout` contains shared page-level presentation.
- `src/features/tasks` contains the task domain model, Zustand store, custom hooks, storage utilities, and task-specific UI.
- `src/pages` contains route-level screens.

### Key Decisions

- Zustand handles task state because the board has shared mutations across multiple UI surfaces, but the state model is still small enough that Redux would have been heavier than needed.
- Filter and sort state lives in the URL, not the store, because it is navigation state that should survive refreshes and be shareable.
- UI primitives are intentionally small and composable rather than building one large opinionated form system up front.
- Tailwind is used for implementation speed, while design tokens in `src/index.css` keep the styling language consistent.

### Data Layer

- Tasks are stored in `localStorage` under `team-workflow-board.tasks`.
- The current storage schema is version `2`.
- Older version `1` payloads are migrated on read by adding the missing `priority` and `tags` fields and then writing back the normalized result.
- A small migration banner appears the first time old data is upgraded.

## Features Covered

- Board view grouped by `Backlog`, `In Progress`, and `Done`
- Create and edit task flows with client-side validation
- Dirty-state warning when the user tries to leave an in-progress form
- Status updates directly from the task card
- Search, status, priority, and sort controls
- URL query-string synchronization for filters and sorting
- Empty, filtered-empty, validation, migration, and storage-failure states
- Reusable UI component library used throughout the app
- Tests for task creation and filtering

## Accessibility and UX Notes

- Form labels are explicitly associated with inputs.
- The modal sets ARIA dialog attributes, focuses the first field on open, traps tab navigation, restores focus on close, and supports `Escape`.
- Toasts use an `aria-live` region so updates are announced non-intrusively.

## Performance Notes

- `TaskCard` is memoized to avoid unnecessary rerenders when modal and toast state changes.
- Zustand selectors in `BoardPage` were split into stable field-level subscriptions after profiling and test-driven debugging exposed over-broad subscriptions.

## Known Limitations / Trade-offs

- Task movement is done through a status select instead of drag-and-drop to keep the implementation smaller and more accessible within the assignment timebox.
- There is no backend or multi-user sync by design; all persistence is local to the browser.
- The board includes sample tasks for easier evaluation, but can also be cleared to reach the empty state.
- The modal uses a lightweight focus trap rather than a fully battle-tested dialog library because the assignment required implementing core components directly.

## AI Assistance Disclosure

- AI assistance was used for planning, code review help, and drafting implementation ideas during development.
- I manually adjusted the structure and behavior after those suggestions, including:
  - Refactoring form flows into dedicated create/edit modal wrappers
  - Fixing unstable Zustand selections that caused rerender issues in tests
  - Improving modal keyboard behavior and focus handling
  - Revising the storage migration and documentation language

## Submission Notes

- Additional design and technical notes are in `ARCHITECTURE.md`.
