import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import SignUp from '@/components/admin/SignUp.vue'
import Login from '@/components/admin/Login.vue'
import Users from '@/components/admin/Users.vue'
import UserDetails from '@/components/admin/UserDetails.vue'
import NewPost from '@/components/admin/NewPost.vue'
import Posts from '@/components/admin/Posts.vue'
import Denied from '@/components/common/Denied.vue'
import PostDetails from '@/components/PostDetails.vue'
import MyPosts from '@/components/MyPosts.vue'
import UserProfile from '@/components/admin/UserProfile.vue'
import ResetPassword from '@/components/admin/ResetPassword.vue'

import store from '../store';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true, roles: ['ADMIN', 'USER'], showBackButton: false }
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
      meta: { requiresAuth: true, roles: ['ADMIN'], showBackButton: false }
    },
    {
      path: '/admin/users/details',
      name: 'UserDetails',
      component: UserDetails,
      meta: { requiresAuth: true, roles: ['ADMIN'], showBackButton: true }
    },
    {
      path: '/admin/posts/new',
      name: 'NewPost',
      component: NewPost,
      meta: { requiresAuth: true, roles: ['ADMIN', 'USER'], showBackButton: false }
    },
    {
      path: '/admin/posts',
      name: 'Posts',
      component: Posts,
      meta: { requiresAuth: true, roles: ['ADMIN'], showBackButton: false }
    },
    {
      path: '/denied',
      name: 'Denied',
      component: Denied,
      meta: { requiresAuth: true, roles: ['ADMIN', 'USER'], showBackButton: false }
    },
    {
      path: '/myposts',
      name: 'MyPosts',
      component: MyPosts,
      meta: { requiresAuth: true, roles: ['USER'], showBackButton: false }
    },
    {
      path: '/postdetails',
      name: 'PostDetails',
      component: PostDetails,
      meta: { requiresAuth: true, roles: ['ADMIN', 'USER'], showBackButton: true }
   },
   {
     path: '/profile',
     name: 'UserProfile',
     component: UserProfile,
     meta: { requiresAuth: true, roles: ['ADMIN', 'USER'], showBackButton: true }
    },
    {
      path: '/reset',
      name: 'ResetPassword',
      component: ResetPassword,
      meta: { requiresAuth: false, roles: ['ADMIN', 'USER'] }
     }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log('to.meta.requiresAuth', to.meta.requiresAuth);

  if (!to.meta.requiresAuth) {
    return next();
  }
  
  if (!store.getters.token) {
    return next({name: 'Login'})
  }

  if (!to.meta.roles) {
    return next();
  }

  if (to.meta.roles.includes(store.getters.loggedUser.role)) {
    return next();
  }
  
  return next({name: 'Denied'});

})

export default router;