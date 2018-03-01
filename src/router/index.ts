import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import SignUp from '@/components/admin/SignUp.vue'
import Login from '@/components/admin/Login.vue'
import Users from '@/components/admin/Users.vue'
import UserDetails from '@/components/admin/UserDetails.vue'
import NewPost from '@/components/admin/NewPost.vue'
import Posts from '@/components/admin/Posts.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
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
      component: Users,
      meta: { requiresAuth: true, roles: ['admin'] }
    },
    {
      path: '/admin/users/:id',
      name: 'UserDetails',
      component: UserDetails,
      meta: { requiresAuth: true, roles: ['admin'] }
    },
    {
      path: '/admin/posts/new',
      name: 'NewPost',
      component: NewPost,
      meta: { requiresAuth: true, roles: ['admin', 'user'] }
    },
    {
      path: '/admin/posts',
      name: 'Posts',
      component: Posts,
      meta: { requiresAuth: true, roles: ['admin'] }
    }
  ]
})/*.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    return next;
  }
  let token = localStorage.getItem('blog-app-token') || '';
  let authUser = JSON.parse(token)
  console.log(authUser);
  if (!authUser || !authUser.token) {
    return next({name: 'login'})
  }
})*/