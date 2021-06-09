import Vue from 'vue'
import VueRouter from 'vue-router'
import MainLayout from '../layout/MainLayout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainLayout',
    component: MainLayout,
    children: [
      {
        path: '/',
        component: () => import('../views/Home')
      },
      {
        path: '/convert',
        component: () => import('../views/Convert')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
