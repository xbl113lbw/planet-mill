import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ajax from "./utils/ajax"
import 'lib-flexible'

import {Button} from 'vant';
import {CountDown} from 'vant';
import {Tab, Tabs} from 'vant';
import {Toast} from 'vant';
import {Popup} from 'vant';
import {Slider} from 'vant';
import {Grid, GridItem} from 'vant';
import {List} from 'vant';
import {Dialog} from 'vant';
import {Stepper} from 'vant';
import {PullRefresh} from 'vant';

Vue.use(PullRefresh);
Vue.use(Stepper);
Vue.use(Dialog);
Vue.use(List);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Slider);
Vue.use(Popup);
Vue.use(Toast);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(CountDown);
Vue.use(Button);

Vue.config.productionTip = false;

// ajax 请求
Vue.prototype.ajax = ajax;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
