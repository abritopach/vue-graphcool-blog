import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import SignUp from '@/components/admin/SignUp.vue'
import Login from '@/components/admin/Login.vue'
import Users from '@/components/admin/Users.vue'
import UserDetails from '@/components/admin/UserDetails.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin/users',
      name: 'Users',
      component: Users
    },
    {
      path: '/admin/users/:id',
      name: 'UserDetails',
      component: UserDetails
    },
  ]
})
