import Vue from 'vue'
import Vuex from 'Vuex'
import  * as actions from './actions'
import { localInfoInitialState, localInfoMutations } from './modules/localInfo'
import { loadingInitialState, loadingMutations } from './modules/loading'
import { msgTipInitialState, msgTipMutations } from './modules/msgTip'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        loading: loadingInitialState,
        msgTip: msgTipInitialState,
        localInfo:localInfoInitialState
    },
    mutations: [loadingMutations, msgTipMutations ,localInfoMutations],
    actions: actions,
    strict: __DEV__,
    middlewares: __DEV__ ? [Vuex.createLogger()] : []
})
