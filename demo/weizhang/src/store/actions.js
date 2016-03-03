import * as types from './mutation-types'

const showLoading = types.SHOW_LOADING
const hideLoading = ({ dispatch, state }) => {
  setTimeout(() => {
    dispatch(types.HIDE_LOADING)
  })
}

const setMsgTip = ({ dispatch, state },text) => {
  let timer = setTimeout(() => {
     dispatch(types.HIDE_MSGTIP)
  },2500)
  dispatch(types.SET_MSGTIP, text, timer)
}
// const setMsgTip = types.SET_MSGTIP


const setCity = types.SET_CITY
const setRegisterStep = types.SET_REGISTERSTEP

export { showLoading, hideLoading, setMsgTip, setCity, setRegisterStep }
