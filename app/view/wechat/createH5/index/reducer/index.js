import * as ActionTypes from './ActionTypes'

const initialState = {
    title:"",
    content:"",
    url:"",
    logoUrl:"",
    data:[]
}
export default function update (state = initialState, action){
     switch(action.type){
        case ActionTypes.WECHART:
            return {
                        title:action.data.title,
                        content:action.data.content,
                        url:action.data.url,
                        logoUrl:action.data.logoUrl,
                        data:action.data.data
                }
        default:
            return state
    }
}