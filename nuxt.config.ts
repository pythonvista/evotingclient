// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  ssr: true,

  app: {
    head: {
      title: 'Temitope Facial Verification',
      meta: [
        {
          name: 'description',
          content: 'project',
        },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
        },
        {
          rel: 'stylesheet',
          href: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
          integrity: 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.css',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.css',
        },
      ],
      script: [
        {
          src: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
          type: 'text/javascript',
          integrity: 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=',
          crossorigin: '',
          async: true,
        },
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/webcamjs/1.0.26/webcam.min.js',
          type: 'text/javascript',
          crossorigin: '',
          async: true,
        },
        {
          src: 'https://cdn.lordicon.com/bhenfmcm.js',
          type: 'text/javascript',
          crossorigin: '',
          async: true,
        },
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js',
          type: 'text/javascript',
          crossorigin: '',
          async: true,
        },
        {
          src: 'https://cdn.auth0.com/js/auth0/9.11/auth0.min.js',
          type: 'text/javascript',
          crossorigin: '',
          async: true,
        },
        {
          src: 'https://unpkg.com/@simplewebauthn/browser/dist/bundle/index.es5.umd.min.js',
          type: 'text/javascript',
          crossorigin: '',
          async: true,
        },
      ],
    },
  },
  runtimeConfig: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-swiper',
    'nuxt-quasar-ui',
  ],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  quasar: {
    plugins: ['Notify', 'Dialog'],
  },
  plugins: [
    { src: '~/plugins/useThreejs.js', mode: 'client' },
    { src: '~/plugins/useVuetify.js', mode: 'client' },
    { src: '~/plugins/useBus.js', mode: 'client' },
  ],

  css: ['vuetify/lib/styles/main.sass'],
  build: {
    transpile: ['vuetify'],
  },
});
