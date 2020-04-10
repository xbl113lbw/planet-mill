import Vue from 'vue'
import Vuex from 'vuex'
import Web3 from "web3"
import abi from "../abi"
import usdtAbi from "../usdtAbi.js"
import {Toast} from "vant";
import ajax from "../utils/ajax"

// vuex 持久化插件（原理：将数据保存在session中一份）
import persistedState from "vuex-persistedstate"

Vue.use(Vuex);
Vue.use(Toast);

const store = new Vuex.Store({
    plugins: [persistedState({
        storage: window.sessionStorage,
        reducer(val) {
            return {
                userInfo: val.userInfo,
                myAccount: val.myAccount,
                myUsdt: val.myUsdt,
                myFreezeUsdt: val.myFreezeUsdt,
                cac: val.cac,
                myFreezeCac: val.myFreezeCac,
                cacPrice: val.cacPrice,
            }
        }
    })],
    state: {
        userInfo: {},
        web3: null,
        // 账户地址
        myAccount: null,
        // 智能合约
        MyContract: null,
        usdtContract: null,
        // 合约 abi
        abi: abi,
        usdtAbi: usdtAbi,
        // 合约地址
        address: "0xc37ac066f8f2644d2ec68bb8c3e3c0c89b049f83",
        usdtAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
        // usdt 余额
        myUsdt: null,
        // 冻结 usdt
        myFreezeUsdt: null,
        // cac 余额
        cac: null,
        myFreezeCac: null,
        // cac 价格
        cacPrice: null
    },
    mutations: {
        changeUserInfo(state, data) {
            state.userInfo = data;
        }
    },
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
            /*对接合约*/
            state.MyContract = new state.web3.eth.Contract(state.abi, state.address);
            state.usdtContract = new state.web3.eth.Contract(state.usdtAbi, state.usdtAddress);

            /*异步获取账户地址*/
            state.web3.eth.getAccounts().then((res) => {
                state.myAccount = res[0];
                /*promise 回调*/
                if (resolve) {
                    resolve();
                }
            });
        },
        // 当前用户的USDT余额
        usdtBalanceOf({state}) {
            state.MyContract.methods.usdtBalanceOf(state.myAccount).call().then(res => {
                console.log("USDT余额", res);
                state.myUsdt = state.web3.utils.fromWei(res);
            })
        },
        // 用户冻结当中的USDT
        usdtFreezeBalanceOf({state}) {
            state.MyContract.methods.usdtFreezeBalanceOf(state.myAccount).call().then(res => {
                console.log("冻结USDT", res);
                state.myFreezeUsdt = state.web3.utils.fromWei(res);
            });
        },
        // 用户的CAC数量
        coinBalanceOf({state}) {
            state.MyContract.methods.coinBalanceOf(state.myAccount).call().then(res => {
                console.log("CAC数量", res);
                state.cac = state.web3.utils.fromWei(res);
            });
        },
        // 用户的冻结的CAC数量
        coinFreezeBalanceOf({state}) {
            state.MyContract.methods.coinFreezeBalanceOf(state.myAccount).call().then(res => {
                console.log("冻结的CAC", res);
                state.myFreezeCac = state.web3.utils.fromWei(res);
            });
        },
        //获取发布订单当前价格（当前的CAC价格）
        coinPrice({state}) {
            state.MyContract.methods.coinPrice().call().then(res => {
                console.log("当前的CAC价格", state.web3.utils.fromWei(res));
                state.cacPrice = state.web3.utils.fromWei(res);
            });
        },
        // 用户参与100USDT排队
        start({state}) {
            if (state.myUsdt < 100) {
                Toast("USDT余额不足");
                return
            }
            state.MyContract.methods.start().send({
                from: state.myAccount
            }).then(res => {
                console.log("用户参与100USDT排队", res);
            });
        },
        // 获取用户信息
        getUserInfo({commit}) {
            ajax.get("v1/user/info", {}).then(res => {
                if (res.data.code === 200) {
                    commit("changeUserInfo", res.data.data);
                }
            })
        },
    },
});

export default store;
