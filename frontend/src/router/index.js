import Vue from 'vue'
import VueRouter from 'vue-router'
import Signup from '../views/Signup'
import Login from '../views/Login'
import Posts from '../views/Posts'
import CreatePost from '../views/CreatePost'
import Post from '../views/Post'
import ModifyPost from '../views/ModifyPost'
import Profil from '../views/Profil'
import Store from '../store/index'
import Axios from 'axios'

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

// Check if user is authenticated before granting access to the page
router.beforeEach((to, from, next) => {
  if(Store.state.authenticated === true){ // If user is authenticated, grant access
    next()
  } else {  // Else check if user wants to go to login or signup page and if not check if sessionStorage has an userToken and compare it with database
    if(to.name == 'Login' || to.name == 'Signup'){  // If user wants to go to login or signup page, grant access
      next();
    } else if((Store.state.userToken !== null)){ // Else check if user has a token and check if it's valid
      Axios.get('http://localhost:3000/api/auth', { headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${Store.state.userToken}`
        }
      })
      .then((response) => {
        if(response.data.message == "Utilisateur valide"){  // If token is valid backend send back a validation message
          Store.commit("setAuthentication", true);
          next();
        } else {  // Else redirect user to login page
          next('Login');
        }
    
      })
      .catch(error => { // In case an error occurs redirect to login page
        console.log(error); 
        next('Login');
      });
    } else {  // In case userToken == null , redirect to login page
      next('Login')
    }
  } 
  }
)

export default router
