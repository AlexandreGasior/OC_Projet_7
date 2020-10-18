import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authenticated: false,
    userToken: sessionStorage.getItem('userToken'),
  },
  mutations: {
    setAuthentication(state, status) {
      state.authenticated = status
      state.userToken = sessionStorage.getItem('userToken')
    }
  },
  actions: {
  },
  modules: {
  }
})
