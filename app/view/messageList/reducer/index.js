import * as ActionType from './actionType'

const initialState = {
    messageList: []
}

export default function update(state = initialState, action) {
    switch(action.type) {
        case ActionType.MESSAGE_LIST_UPDATE_TABLE:
            return {
                ...state,
                messageList: action.data.list
            }
        default:
            return state
    }
}