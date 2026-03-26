# Architecture Notes

## Component hierarchy sketch

`BoardPage`
`-> AppHeader`
`-> TaskFilters`
`-> TaskBoard`
`   -> TaskColumn`
`      -> TaskCard`
`-> TaskCreateModal`
`   -> TaskFormModal`
`-> TaskEditModal`
`   -> TaskFormModal`

## Structure and rationale

- `src/components/ui` holds the reusable design system primitives used by the board and future features.
- `src/features/tasks` keeps task-specific state, storage, form logic, and presentation together.
- Zustand is used for task state because the app needs globally shared task updates without prop drilling, while still staying lighter than a fuller state framework.
- URL-backed filters live in a custom hook instead of the store because they represent navigation state more than domain state.

## Storage versioning and migration

- Tasks are stored under `team-workflow-board.tasks`.
- The current schema is version `2`.
- Version `1` is treated as a legacy shape that did not include `priority` or `tags`.
- On read, older data is normalized into the current `Task` shape, saved back to storage, and a one-time migration notice is shown in the UI.
- Sample tasks are used as the default board state so the interface is immediately explorable, but the board can also be cleared to reach the true empty state.

## Refactor note

- I initially wired task forms directly in `BoardPage`, but moved create/edit flows into dedicated modal wrapper components.
- That change removed awkward synchronization logic in the form hook, made linting cleaner, and gave each dialog a clearer ownership boundary.

## Performance note

- Task cards are wrapped in `memo` because the same board UI can re-render frequently from filter, toast, and modal state changes.
- During verification, broad Zustand selection in `BoardPage` caused unstable snapshots and extra rerenders; splitting that into field-level selectors fixed the issue and made the component more predictable.

## Extension points

- Drag-and-drop can be added later by swapping the status select interaction for a DnD layer while keeping the current store actions.
- The storage utility can be replaced by an API repository or IndexedDB adapter without rewriting the presentational components.
