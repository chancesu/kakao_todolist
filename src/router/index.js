import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Write from '../views/Write.vue'
import TodoDetail from '../views/TodoDetail.vue'
import Setting from '../views/Setting.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/write',
    name: 'Write',
    component: Write
  },
  {
    path: '/view',
    name: 'TodoDetail',
    component: TodoDetail
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
