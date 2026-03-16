<template>
  <div class="flex min-h-screen">
    <!-- ===== Left panel — auth form ===== -->
    <div class="flex w-full flex-col justify-center bg-white px-6 py-12 lg:w-1/2 lg:px-16">
      <div class="mx-auto w-full max-w-md">
        <!-- Logo -->
        <NuxtLink to="/" class="inline-flex items-center gap-2 mb-10 group">
          <div
            class="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600
                   flex items-center justify-center text-white font-black text-sm
                   shadow-md group-hover:shadow-lg transition-shadow"
          >
            T
          </div>
          <span class="text-xl font-bold tracking-tight text-gray-900">TrellGo</span>
        </NuxtLink>

        <!-- Injected page content -->
        <slot />
      </div>
    </div>

    <!-- ===== Right panel — marketing / branding (hidden on mobile) ===== -->
    <div
      class="hidden lg:flex lg:w-1/2 flex-col items-center justify-center relative overflow-hidden
             bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-800"
      aria-hidden="true"
    >
      <!-- Decorative blobs -->
      <div class="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
      <div class="absolute -bottom-40 -left-20 w-80 h-80 rounded-full bg-teal-300/20 blur-2xl" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]
                  rounded-full border border-white/10" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]
                  rounded-full border border-white/10" />

      <!-- Dot grid pattern -->
      <div
        class="absolute inset-0 opacity-20"
        style="background-image: radial-gradient(circle, white 1px, transparent 1px);
               background-size: 28px 28px;"
      />

      <!-- Marketing copy -->
      <div class="relative z-10 text-center px-12 max-w-lg">
        <p class="text-sm font-semibold uppercase tracking-widest text-emerald-200 mb-4">Project management</p>
        <h2 class="text-5xl font-extrabold leading-tight text-white mb-6">
          Your work,<br />beautifully organised.
        </h2>
        <p class="text-lg text-emerald-100 leading-relaxed">
          Boards, columns, cards — everything you need to move ideas from
          <span class="text-white font-semibold">to do</span> to
          <span class="text-white font-semibold">done</span>.
        </p>

        <!-- Feature pills -->
        <div class="flex flex-wrap justify-center gap-2 mt-8">
          <span v-for="feature in features" :key="feature"
            class="px-3 py-1 rounded-full bg-white/15 text-white text-xs font-medium backdrop-blur-sm"
          >
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
