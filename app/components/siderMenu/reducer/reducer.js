import * as ActionTypes from './ActionTypes'
const initialState = {
    current:'a0'
}
export default function update (state = initialState, action){
    switch(action.type){
        case ActionTypes.GetCurrent:
            return { 
                current:action.current
            }
        default:
            return state
    }
}