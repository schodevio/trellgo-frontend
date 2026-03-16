<template>
  <div class="app-layout">
    <AppTopNavbar />

    <div class="app-layout__body">
      <AppSidebarNavigation />

      <main class="app-layout__main">
        <slot />
      </main>
    </div>
  </div>
</template>
