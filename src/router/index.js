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
    //星球矿机
    {
        path: '/planet',
        name: 'planet',
        component: () => import('../views/planet/index.vue')
    },
    //资产property
    {
        path: '/property',
        name: 'property',
        component: () => import('../views/property/index.vue')
    },
    //直推详情directPushDetail
    {
        path: '/directPushDetail',
        name: 'directPushDetail',
        component: () => import('../views/directPushDetail/index.vue')
    },
    // 资产记录
    {
        path: '/assetsRecord',
        name: 'assetsRecord',
        component: () => import('../views/assetsRecord/index')
    },
    // 发布出售订单
    {
        path: '/releaseSellOrder',
        name: 'releaseSellOrder',
        component: () => import('../views/releaseOrder/releaseSellOrder')
    },
    // 发布购买订单
    {
        path: '/releaseBuyOrder',
        name: 'releaseBuyOrder',
        component: () => import('../views/releaseOrder/releaseBuyOrder')
    },
    // 订单列表
    {
        path: '/orderList',
        name: 'orderList',
        component: () => import('../views/releaseOrder/orderList')
    },
    // 交易记录
    {
        path: '/tradRecord',
        name: 'tradRecord',
        component: () => import('../views/releaseOrder/tradRecord')
    },
    // 登录
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/login')
    },
    // 注册
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/register/register')
    },
    // 忘记密码
    {
        path: '/forgetPwd',
        name: 'forgetPwd',
        component: () => import('../views/forgetPwd/forgetPwd')
    },
];

const router = new VueRouter({
    routes
});

export default router
