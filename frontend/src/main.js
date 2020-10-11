import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Using Vuelidate for form validations
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

// Using FontAwesome icons for vue.js
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faUser, faTrash, faPen)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
