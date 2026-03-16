import tailwindcss from '@tailwindcss/vite'

import Aura from '@primevue/themes/aura'
import { definePreset } from '@primevue/themes'

const TrellGoTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50:  '{emerald.50}',
      100: '{emerald.100}',
      200: '{emerald.200}',
      300: '{emerald.300}',
      400: '{emerald.400}',
      500: '{emerald.500}',
      600: '{emerald.600}',
      700: '{emerald.700}',
      800: '{emerald.800}',
      900: '{emerald.900}',
      950: '{emerald.950}',
    },
  },
})

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,

  modules: ['@primevue/nuxt-module', '@pinia/nuxt'],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  css: ['~/assets/css/main.css', '~/assets/scss/main.scss'],

  primevue: {
    options: {
      theme: {
        preset: TrellGoTheme,
        options: {
          darkModeSelector: '.dark',
        },
      },
    },
  },

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ],
    },
  },

})
