import * as ActionType from './actionType'


const initialState = {
    loading: false,
    pagination: {pageSize: 10},
    favorite_list: [],
}

export default function update(state = initialState, action) {
    switch(action.type) {
        case ActionType.INIT_FAVORITE_LIST:

            return {
                ...state,
                loading: false,
                pagination: {
                    ...state.pagination,
                    current: action.page,
                    total: action.data.count
                },
                favorite_list: action.data.dataList
            }
        case ActionType.LOAD_FAVORITE_LIST:
            return {
                ...state,
                loading: true,
            }
        default:
            return state
    }
}