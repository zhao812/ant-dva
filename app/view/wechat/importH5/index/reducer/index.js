import * as ActionTypes from './ActionTypes'

const initialState = {
    fileString:"",
    pageUrl:""
}
export default function update (state = initialState, action){
    console.log(action.type)
     switch(action.type){
        case ActionTypes.IMPORT_CHART:
            return {
                    ...state,
                    fileString: action.data.fileString,
                    pageUrl:action.data.pageUrl
            }
        default:
            return state
    }
}