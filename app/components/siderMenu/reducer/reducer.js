import * as ActionTypes from './ActionTypes'
const initialState = {
    current:'a0',
    openKeys:['sub0']
}
export default function update (state = initialState, action){
    switch(action.type){
        case ActionTypes.GetCurrent:
            return { 
                ...state,
                current:action.current
            }
        case ActionTypes.GetOpenKeys:
            return { 
                ...state,
                openKeys:action.openKeys
            }
        default:
            return state
    }
}