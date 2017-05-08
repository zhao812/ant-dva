import * as ActionTypes from './ActionTypes'

const initialState = {
    imageUrl:"",
    reLang:"",
    oUrl:""
}
export default function update (state = initialState, action){
    console.log(action.type)
     switch(action.type){
        case ActionTypes.WECHART_NEXT:
            return {
                        imageUrl:action.data.imageUrl,
                        reLang:action.data.reLang, 
                        oUrl:action.data.oUrl
                }
        default:
            return state
    }
}