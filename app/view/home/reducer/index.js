import * as ActionTypes from './actionTypes'
const initialState = {
    number : 0
}
export default function update (state = initialState, action){
    switch(action.type){
        case ActionTypes.HOME_UPDATE:
            return { ...state, number: action.data}
            
        default:
            return state
    }
}