import * as ActionTypes from './ActionTypes'

const initialState = {
    oUrl:""
}
export default function update (state = initialState, action){
    console.log(action.type)
     switch(action.type){
        case ActionTypes.WECHART_NEXT:
            return {
                        oUrl:action.data.oUrl
                }
        default:
            return state
    }
}