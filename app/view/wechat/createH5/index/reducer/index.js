import * as ActionTypes from './ActionTypes'


const initialState = {
    title:"",
    content:"",
    linkurl:"",
    logoUrl:"",
    data: [{type:"pic"},{type:"txt"}]
}
function changePics(pic,index,state){
    let data=state.data;
    return data.map((item, key)=>{
        if(index==key){
            return { ...item, value: pic}
        }
        return item
    })
}
function changeTxt(txt,index,state){
    let data=state.data;
    return data.map((item, key)=>{
        if(index==key){
            return { ...item, value: txt}
        }
        return item
    })
}
export default function update (state = initialState, action){
     switch(action.type){
        case ActionTypes.WECHART:
            return {
                ...state
                }
        case ActionTypes.Change_Title:
            return {
                ...state,
                title:action.title
            }
        case ActionTypes.Change_Content:
            return {
                ...state,
                content:action.content
            }
        case ActionTypes.Change_Url:
            return {
                ...state,
                linkurl:action.linkurl
            }
        case ActionTypes.Change_Logo:
            return {
                ...state,
                logoUrl:action.logo
            }
        case ActionTypes.Change_Pic:
            return {
                ...state,
                data:changePics(action.pic,action.index,state)
            }
        case ActionTypes.Change_Txt:
            return {
                ...state,
                data:changeTxt(action.txt,action.index,state)
            }
        case ActionTypes.Add_Pic:
            return {
                ...state,
                data: [...state.data, action.pic]
            }
         case ActionTypes.Add_Short:
            return {
                ...state,
                data:[...state.data, action.short]
            }
            
        default:
            return state
    }
}