# Frontend Architecture

The frontend follows a modular structure with clear separation of concerns.

- pages - authentication and main views
- components - reusable UI components
- composables  - reusable logic (API calls, auth)
- stores - application state
- services - HTTP client and API integrations
- types - TypeScript interfaces
- utils - helper functions

# Project Structure

```
frontend/
  app/
    components/
      boards/
      columns/
      tasks/
      ui/

    composables/
      useAuth.ts
      useBoards.ts
      useTasks.ts

    pages/
      login.vue
      register.vue
      boards/index.vue
      boards/[id].vue

    services/
      api.ts
      auth.ts
      boards.ts
      tasks.ts

    stores/
      auth.ts

    types/
      board.ts
      task.ts
      user.ts

    utils/
      errors.ts
```
