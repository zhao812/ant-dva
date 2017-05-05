import * as ActionType from './actionType'

const initialState = {
    mirrorData: []
}

export default function update(state = initialState, action){
    switch(action.type){
        case ActionType.USER_MIRROR_UPDATE:
            return { ...state, mirrorData: action.data }
        default:
            return state
    }
}