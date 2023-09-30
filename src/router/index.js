import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import {useAuthStore} from '../stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{
        autProperty: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta:{
        autProperty: true
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/',
      name: 'todo',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Todo.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth && !useAuthStore().isAuthenticated()){
      next('/login')
  }
  
  if(to.meta.autProperty && useAuthStore().isAuthenticated()){
    next('/dashboard')
  }
  next()
  
})
export default router
