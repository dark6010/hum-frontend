// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['@fortawesome/fontawesome-svg-core/styles.css','~/assets/css/main.css'],
  

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  nitro: {
    devProxy: {
      '/api': {
        // target: 'https://api.tudominio.com'
        target: 'http://localhost:3001',
        changeOrigin: true,
        cookieDomainRewrite: {
          // Reescribe el dominio de las cookies para desarrollo local
          '*': 'localhost',
          // 'api.tudominio.com': 'tudominio.com'
        },
        headers: {
          // Necesario para que las cookies se envíen correctamente
          Connection: 'keep-alive'
        }
      }
    }
  },
  modules: ['@pinia/nuxt'],
  app: {
    head: {
      title: 'Ciencias de la Educación',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Sitio oficial de la Carrera de Ciencias de la Educación' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})