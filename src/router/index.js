import Vue from 'vue'
import Router from 'vue-router'
import PlayArea from '@/components/playArea'
import Header from '@/components/header'
import Main from '@/components/main'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: Main
        },
        {
            path: '/play',
            component: PlayArea
        }

    ]
})
