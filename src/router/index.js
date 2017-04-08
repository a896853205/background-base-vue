import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/Home'
import carShow from '@/components/HomePage/carShow'
import userShow from '@/components/HomePage/userShow'
import storageShow from '@/components/HomePage/storageShow'
import inGoodsShow from '@/components/HomePage/inGoodsShow'
import outGoodsShow from '@/components/HomePage/outGoodsShow'
import goodsFlowShow from '@/components/HomePage/goodsFlowShow'
import carRepairShow from '@/components/HomePage/carRepairShow'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        }, {
            path: '/register',
            name: 'Register',
            component: Register
        }, {
            path: '/home',
            name: 'Home',
            component: Home,
            children: [
                {
                    path: '/home/carShow',
                    component: carShow
                }, {
                    path: '/home/userShow',
                    component: userShow
                }, {
                    path: '/home/storageShow',
                    component: storageShow
                }, {
                    path: '/home/inGoodsShow',
                    component: inGoodsShow
                }, {
                    path: '/home/outGoodsShow',
                    component: outGoodsShow
                }, {
                    path: '/home/goodsFlowShow',
                    component: goodsFlowShow
                }, {
                    path: '/home/carRepairShow',
                    component: carRepairShow
                }
            ]
        }
    ]
})
/*
] */
