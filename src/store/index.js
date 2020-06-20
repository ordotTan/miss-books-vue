import Vue from 'vue'
import Vuex from 'vuex'

import bookModule from './modules/book.module.js';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: 'aviv',
      city: 'jerusalem'
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload.user;
    },
  },
  actions: {
  },
  modules: {
    bookModule
  }
})
