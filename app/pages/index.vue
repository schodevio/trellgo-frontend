<template>
  <div class="home-page">
    <!-- Decorative layer -->
    <div class="home-blob home-blob--tl" />
    <div class="home-blob home-blob--br" />
    <div class="home-ring home-ring--lg" />
    <div class="home-ring home-ring--md" />
    <div class="home-dotgrid" />

    <!-- Content -->
    <div class="home-content">

      <!-- Logo -->
      <div class="home-logo">
        <div class="home-logo__badge">T</div>
        <span class="home-logo__name">TrellGo</span>
      </div>

      <!-- Hero copy -->
      <div class="home-hero">
        <p class="home-hero__eyebrow">Project management</p>
        <h1 class="home-hero__title">Your work, beautifully organised.</h1>

        <p class="home-hero__body">
          Boards, columns, cards — everything you need to move ideas from
          <span class="home-hero__highlight">to do</span> to
          <span class="home-hero__highlight">done</span>.
        </p>
      </div>

      <!-- Feature pills -->
      <div class="home-pills">
        <span
          v-for="feature in features"
          :key="feature"
          class="home-pill"
        >
          {{ feature }}
        </span>
      </div>

      <!-- CTA buttons -->
      <div class="home-cta">
        <NuxtLink to="/register">
          <Button label="Create account" size="large" fluid />
        </NuxtLink>

        <NuxtLink to="/login">
          <Button label="Sign in" size="large" severity="secondary" fluid />
        </NuxtLink>
      </div>

      <!-- Perks -->
      <ul class="home-perks">
        <li v-for="item in perks" :key="item">
          <span class="home-perks__check">✓</span>
          {{ item }}
        </li>
      </ul>

    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from 'primevue'

const features = [
  'Drag & drop',
  'Task export',
  'JWT auth',
  'Team ready'
]

const perks = [
  'No credit card required',
  'Boards, columns & cards',
  'Async task export by email'
]
</script>
