import { Dialog, Loading, Notify, Quasar } from 'quasar'
import quasarLang from 'quasar/lang/zh-TW'
import { createApp } from 'vue'

import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'

import App from './App.vue'

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'

import '@quasar/extras/material-icons/material-icons.css'
// Import Quasar css
import 'quasar/src/css/index.sass'

// Tailwind CSS
import './index.css'

// Uno CSS
// import 'uno.css';

// 自訂樣式
import './style/animate.sass'
import './style/global.sass'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

createApp(App)
  .use(Quasar, {
    plugins: {
      Notify,
      Dialog,
      Loading,
    },
    lang: quasarLang,
  })
  .use(router)
  .mount('#app')
