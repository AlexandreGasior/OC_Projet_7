import Vue from 'vue'
import VueRouter from 'vue-router'
import Signup from '../views/Signup'
import Login from '../views/Login'
import Posts from '../views/Posts'
import CreatePost from '../views/CreatePost'
import Post from '../views/Post'
import ModifyPost from '../views/ModifyPost'
import Profil from '../views/Profil'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Posts',
    component: Posts
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/profil',
    name: 'Profil',
    component: Profil
  },
  {
    path: '/createpost',
    name: 'CreatePost',
    component: CreatePost
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: Post
  },
  {
    path: '/modifypost/:id',
    name: 'ModifyPost',
    component: ModifyPost
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
