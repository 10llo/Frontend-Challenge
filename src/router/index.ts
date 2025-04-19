import { createRouter, createWebHistory } from 'vue-router'
import RapidResponseView from '../views/RapidResponseView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'rapid-response',
      component: RapidResponseView,
    },
  ],
})

export default router
