import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const state = {
  currentPage: 1
}
const getter = {}
const mutations = {
  changeCurrent: (state, value) => {
    console.log(state, value)
    state.currentPage = value
  }
}
const action = {}
export default new Vuex.Store({
  state,
  getter,
  mutations,
  action
})
