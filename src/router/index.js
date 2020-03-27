import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    // 首页
    {
        path: '/',
        name: '/',
        component: () => import('../views/index.vue')
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
    }
];

const router = new VueRouter({
    routes
});

export default router
