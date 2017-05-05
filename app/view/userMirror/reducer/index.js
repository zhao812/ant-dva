import * as ActionType from './actionType'

const initialState = {
    mirrorData: [],
    username: ""
}

export default function update(state = initialState, action){
    switch(action.type){
        case ActionType.USER_MIRROR_UPDATE:
            return { 
                ...state, 
                mirrorData: action.data.mirror,
                username: action.data.username
            }
        default:
            return state
    }
}