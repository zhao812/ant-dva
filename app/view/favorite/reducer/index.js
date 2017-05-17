import * as ActionType from './actionType'


const initialState = {
    favorite_list: [],
}


export default function update(state = initialState, action) {
    switch(action.type) {
        case ActionType.INIT_FAVORITE_LIST:
            return {
                ...state,
                favorite_list: action.data
            }
        default:
            return state
    }
}