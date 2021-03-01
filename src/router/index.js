import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthGaurd from './auth-gaurd'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Meetups from '@/components/meetup/Meetups'
import CreateMeetup from '@/components/meetup/CreateMeetup'
import Meetup from '@/components/meetup/Meetup'
import Profile from '@/components/user/Profile'
import Signin from '@/components/user/Signin'
import Signup from '@/components/user/Signup'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component:About
  }
  ,
  {
    path: '/meetups',
    name: 'Meetups',
    component:Meetups
  }
  ,
  {
    path: '/meetup/new',
    name: 'CreateMeetup',
    component:CreateMeetup,
    beforeEnter:AuthGaurd
  }
  ,
  {
    path: '/meetup/:id',
    name: 'Meetup',
    props:true,
    component:Meetup
  }
  ,
  {
    path: '/profile',
    name: 'Profile',
    component:Profile,
    beforeEnter:AuthGaurd
  }
  ,
  {
    path: '/signin',
    name: 'Signin',
    component:Signin
  }
  ,
  {
    path: '/signup',
    name: 'Signup',
    component:Signup
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
