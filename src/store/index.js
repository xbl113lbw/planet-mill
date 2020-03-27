import Vue from 'vue'
import Vuex from 'vuex'
// vuex 持久化插件（原理：将数据保存在session中一份）
import persistedState from "vuex-persistedstate"

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [persistedState({ storage: window.sessionStorage })],
    state: {
        tabIndex: 0,//默认第一个
    },
    mutations: {
        // 修改tabIndex
        changeTabIndex(state, data) {
            state.tabIndex = data
        }
    },
    actions: {},
    modules: {}
})
