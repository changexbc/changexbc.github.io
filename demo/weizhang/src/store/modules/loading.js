import { SHOW_LOADING, HIDE_LOADING } from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const loadingInitialState = {
    loadingShow: false,
}

// mutations
const loadingMutations = {
    [SHOW_LOADING]({ loading }) {
        loading.loadingShow = true
    },

    [HIDE_LOADING]({ loading }) {
        loading.loadingShow = false
    }
}

export { loadingInitialState, loadingMutations }
