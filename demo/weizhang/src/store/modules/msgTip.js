import { SET_MSGTIP, HIDE_MSGTIP } from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const msgTipInitialState = {
    text:''||'😂',
    show:false,
    timer:0
}

// mutations
const msgTipMutations = {
    [SET_MSGTIP]({ msgTip }, text ,timer) {
        clearTimeout(msgTip.timer)
        msgTip.text = text
        msgTip.timer = timer
        msgTip.show = true
    },
    [HIDE_MSGTIP]({ msgTip }) {
        msgTip.show = false
    },
}

export { msgTipInitialState, msgTipMutations }