import Vue from 'vue'
import VueRouter from 'vue-router'
import Intro from '../components/Intro.vue'
import Day from '../components/Day.vue'
import Calendar from '../components/Calendar.vue'
import Setting from '../components/Setting.vue'
import About from '../components/About.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'intro',
    component: Intro
  },
  {
    path: '/day/:date', //:date는 날짜를 받아옴
    name: 'date',
    component: Day
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: Calendar
  },
  {
    path: '/setting',
    name: 'setting',
    component: Setting
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
