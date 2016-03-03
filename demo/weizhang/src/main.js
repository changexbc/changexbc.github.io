import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './views/App.vue'
import { getQueryString } from './utils/utils'
import client from './utils/client'
import ga_storage from './utils/GALocalStorage'
import store from './store/index'
import IndexView from './views/IndexView.vue'
import DetailView from './views/DetailView.vue'
import DetailCar from './views/DetailCar.vue'
import DetailAuth from './views/DetailAuth.vue'
import DetailLicense from './views/DetailLicense.vue'
import DetailFinish from './views/DetailFinish.vue'
import RecordView from './views/RecordView.vue'

FastClick.attach(document.body);

const init = function() {

    Vue.use(VueRouter)

    const router = new VueRouter({})

    router.map({
        '/': {
            name: 'index',
            component: IndexView
        },
        'detail': {
            name: 'detail',
            component: DetailView,
            subRoutes: {
                '/': {
                    name:'detailCar',
                    component: DetailCar
                },
                'auth': {
                    name:'detailAuth',
                    component: DetailAuth
                },
                'license': {
                    name:'detailLicense',
                    component: DetailLicense
                },
                'finish': {
                    name:'detailFinish',
                    component: DetailFinish
                }
            }
        },
        'record': {
            name:'record',
            component: RecordView
        },
    });

    router.start(App, '#app');

    // Daze.navigator.useWebNavigation && Daze.navigator.useWebNavigation({},function(){})
}

if (__DEV__) {
    Vue.config.debug = true // 开启调试模式
    console.log('%c开发模式～￣▽￣～','font-size:25px;color:red')
    init()
}
else {
    init()
}
