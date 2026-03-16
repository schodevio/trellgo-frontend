<template>
  <div class="auth-layout">
    <!-- ===== Left panel — auth form ===== -->
    <div class="auth-layout__panel">
      <div class="auth-layout__inner">
        <!-- Logo -->
        <NuxtLink to="/" class="auth-layout__brand">
          <div class="auth-layout__badge">T</div>
          <span class="auth-layout__brand-name">TrellGo</span>
        </NuxtLink>

        <!-- Injected page content -->
        <slot />
      </div>
    </div>

    <!-- ===== Right panel — marketing / branding (hidden on mobile) ===== -->
    <div class="auth-layout__hero" aria-hidden="true">
      <div class="auth-layout__blob auth-layout__blob--tr" />
      <div class="auth-layout__blob auth-layout__blob--bl" />
      <div class="auth-layout__ring auth-layout__ring--lg" />
      <div class="auth-layout__ring auth-layout__ring--md" />
      <div class="auth-layout__dotgrid" />

      <div class="auth-layout__copy">
        <p class="auth-layout__eyebrow">Project management</p>
        <h2 class="auth-layout__title">
          Your work,<br />beautifully organised.
        </h2>
        <p class="auth-layout__body">
          Boards, columns, cards — everything you need to move ideas from
          <span class="auth-layout__highlight">to do</span> to
          <span class="auth-layout__highlight">done</span>.
        </p>

        <div class="auth-layout__pills">
          <span v-for="feature in features" :key="feature" class="auth-layout__pill">
            {{ feature }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const features = ['Drag & drop', 'Task export', 'JWT auth', 'Team ready']

</script>
