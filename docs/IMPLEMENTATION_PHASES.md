# Frontend Implementation Phases

This document defines the recommended order of implementation for the TrellGo frontend.

Each phase should be implemented sequentially to keep the project maintainable and avoid unnecessary complexity.


## Phase 1 — Project Setup

Initialize the frontend project.

Tasks:

- enable TypeScript
- install Tailwind CSS v4
- install PrimeVue
- configure PrimeVue theme
- create basic project structure

Directory structure:

components/
composables/
pages/
services/
stores/
types/
utils/

Goal of this phase:

A running Nuxt application with Tailwind and PrimeVue configured.


## Phase 2 — API Client

Implement a reusable HTTP client for communication with the backend API.

Tasks:

- configure baseURL
- create useApi composable as a wrapper for $fetch
- implement Authorization header support
- implement automatic refresh token logic
- take care of types (use TypeScript)

Goal:

Reusable API client used across the entire application.


## Phase 3 — Authentication

Implement user authentication.

Pages:

/login
/register
/confirm

Features:

- login form
- registration form
- view with button to confirm account
- token storage
- auth store using Pinia
- protected routes middleware

Goal:

User can register, confirm account, login and stay authenticated.


## Phase 4 — Layout

Create the main application layout.

Layout components:

AppLayout
TopNavbar
SidebarNavigation

Navigation should include:

Boards
Logout

Goal:

Application shell ready for board pages.


## Phase 5 — Boards

Implement board management.

Pages:

/boards
/boards/[id]

Features:

- fetch user boards
- create board
- delete board
- board list UI

Components:

BoardCard
CreateBoardDialog
BoardsGrid

Goal:

User can manage boards.


## Phase 6 — Columns (Lists)

Implement columns inside boards.

Features:

- fetch board columns
- create column
- rename column
- delete column

Components:

BoardColumn
ColumnHeader
CreateColumnButton

Goal:

Board contains multiple columns.


## Phase 7 — Tasks (Cards)

Implement task management.

Features:

- create task
- edit task
- delete task
- move task between columns

Components:

TaskCard
TaskModal
TaskForm

Goal:

User can manage tasks inside columns.


## Phase 8 — Drag & Drop

Implement drag and drop functionality.

Recommended libraries:

vuedraggable
or
VueUse

Features:

- drag tasks between columns
- reorder tasks inside column
- update backend after drop

Goal:

Smooth Trello-like task movement.


## Phase 9 — Export Tasks

Implement async export feature.

Flow:

1. user clicks "Export tasks"
2. request sent to backend
3. backend processes export asynchronously
4. user receives email when export is ready

Frontend responsibilities:

- trigger export request
- show loading state
- show success notification

Components:

ExportTasksButton


## Phase 10 — Error Handling

Implement global API error handling.

Handle:

- validation errors
- authentication errors
- server errors

Display errors using PrimeVue Toast or inline form errors.

Goal:

Consistent error handling across the application.


## Phase 11 — UI Improvements

Improve UI and UX.

Add:

- loading states
- empty states
- skeleton loaders
- confirmation dialogs
- toast notifications

Goal:

Polished user experience.

## Phase 12 — Testing

Add frontend tests.

Recommended tools:

Vitest
Vue Testing Library

Test:

components
composables
API services

Goal:

Critical functionality covered by tests.


## Phase 13 — Final Improvements

Final improvements before publishing.

Tasks:

- accessibility improvements
- responsive layout
- performance optimization
- cleanup unused code
