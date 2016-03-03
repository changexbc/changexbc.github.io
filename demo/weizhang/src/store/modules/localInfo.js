import { SET_CITY, SET_REGISTERSTEP } from '../mutation-types'
import cityList from '../../utils/city.js'
console.log(cityList)
// initial state
// shape: [{ id, quantity }]
const localInfoInitialState = {
    cityId : '',
    cityName : '',
    cityList : cityList,
    registerStep : 2
}

// mutations
const localInfoMutations = {
    [SET_CITY]({ localInfo }, city) {
        localInfo.cityId = city.id
        localInfo.cityName = city.name
    },
    [SET_REGISTERSTEP]({ localInfo }, step) {
        localInfo.registerStep = step
    }
}

export { localInfoInitialState, localInfoMutations }