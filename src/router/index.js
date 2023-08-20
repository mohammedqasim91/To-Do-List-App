import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import logIn from '../components/logIn.vue'
import todo from '../components/todo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component:logIn
    },
    {
      path: '/todo',
      name: 'todo',
      component:todo
    }
  ]
})

export default router
