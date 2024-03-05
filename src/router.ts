import { createRouter, createWebHistory } from 'vue-router'
import loginVue from './pages/auth/login.vue'
import indexVue from './pages/index.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: indexVue
    },
    {
      path: '/login',
      component: loginVue
    }
  ]
})

export default router
