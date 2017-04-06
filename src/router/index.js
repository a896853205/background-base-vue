import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/Home'
import carShow from '@/components/HomePage/carShow'

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
                }
            ]
        }
    ]
})
/*
] */
