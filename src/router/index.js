import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    // 首页
    {
        path: '/',
        name: '/',
        component: () => import('../views/home/home.vue')
    },
    // 交易页
    {
        path: '/deal',
        name: '/deal',
        component: () => import('../views/deal/deal.vue')
    },
    // 规则页
    {
        path: '/rule',
        name: '/rule',
        component: () => import('../views/rule/rule.vue')
    },
];

const router = new VueRouter({
    routes
});

export default router
