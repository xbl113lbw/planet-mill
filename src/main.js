import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ajax from "./utils/ajax"
import 'lib-flexible'

import {Button} from 'vant';

Vue.use(Button);

Vue.config.productionTip = false;

// ajax 请求
Vue.prototype.ajax = ajax;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
