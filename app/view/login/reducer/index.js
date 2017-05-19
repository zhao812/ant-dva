import * as ActionType from './actionType'

const initialState = {
    isLogin: false,
}

export default function update (state = initialState, action){
    switch(action.type){
        case ActionType.UPDATE_USER_LOGIN:
            return {
                ...state,
                isLogin: true
            }
        case ActionType.SET_LOGIN_STATE:
            return {
                ...state,
                isLogin: action.data
            }
        default:
            return state
    }
}