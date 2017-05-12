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
                    ...state
            }
        case ActionTypes.File_String:
            return {
                    ...state,
                    fileString: action.file
            }
        case ActionTypes.Set_Url:
            return {
                    ...state,
                    pageUrl: action.url
            }
        default:
            return state
    }
}