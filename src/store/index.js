import Vue from 'vue'
import Vuex from 'vuex'
import Web3 from "web3"
import {Toast} from "vant";

// vuex 持久化插件（原理：将数据保存在session中一份）
import persistedState from "vuex-persistedstate"

Vue.use(Vuex);
Vue.use(Toast);

export default new Vuex.Store({
    plugins: [persistedState({storage: window.sessionStorage})],

    state: {
        web3: null,
        myAccount: null,
    },
    mutations: {},
    actions: {
        /*初始化 web3.js */
        async web3Init({state}, resolve) {
            let web3Provider;
            if (window.ethereum) {
                web3Provider = window.ethereum;
                try {
                    // 请求用户授权
                    await window.ethereum.enable();
                    console.log("请求用户授权");
                } catch (error) {
                    // 用户不授权时
                    console.error("用户取消授权");
                }
            } else if (window.web3) {   // 老版 MetaMask Legacy dapp browsers...
                web3Provider = window.web3.currentProvider;
            } else {
                Toast('未安装MetaMask，请先安装！');
            }
            state.web3 = new Web3(web3Provider);
            /*异步获取账户地址*/
            state.web3.eth.getAccounts().then((res) => {
                state.myAccount = res[0];
                console.log("state.myAccount", state.myAccount);
                /*promise 回调*/
                if (resolve) {
                    resolve();
                }
            });
        },
    },
    modules: {}
})
