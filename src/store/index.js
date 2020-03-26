import Vue from 'vue'
import Vuex from 'vuex'
// vuex 持久化插件（原理：将数据保存在session中一份）
import persistedState from "vuex-persistedstate"

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [persistedState({storage: window.sessionStorage})],

    state: {},
    mutations: {},
    actions: {},
    modules: {}
})
