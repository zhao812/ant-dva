import * as ActionTypes from './ActionTypes'

const initialState = {
    title:"",
    url:"",
    content:"",
    imageUrl:"",
    essay:""
}
export default function update (state = initialState, action){
     switch(action.type){
        case ActionTypes.WECHART:
            return {
                        title:action.data.title,
                        url:action.data.url,
                        content:action.data.content,
                        imageUrl:action.data.imageUrl,
                        essay:action.data.essay
                }
        default:
            return state
    }
}