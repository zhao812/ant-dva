import * as ActionTypes from './ActionTypes'
const initialState = {
    a : ""
}
export default function update (state = initialState, action){
    switch(action.type){
        case "123123123123":
            return {
                ...state,
                a: action.data
            }
            default:
                return state
    }
     
}