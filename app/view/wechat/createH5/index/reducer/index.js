import * as ActionTypes from './ActionTypes'


const initialState = {
    name:"",
    userSelectGroupId:"",
    title:"",
    content:"",
    linkurl:"",
    logoUrl:"",
    data: [{"pic":"","txt":""}],
    fileString:"",
    pageUrl:""
}
function changePics(pic,index,state){
    let data=state.data;
    return data.map((item, key)=>{
        if(index==key){
            return { ...item, pic: pic}
        }
        return item
    })
}
function changeTxt(txt,index,state){
    let data=state.data;
    return data.map((item, key)=>{
        if(index==key){
            return { ...item, txt: txt}
        }
        return item
    })
}
function deleteFile(index,state){
    let data=state.data;
    return data.filter((item, key)=> index!=key)
}
export default function update (state = initialState, action){
    console.log(action.type)
     switch(action.type){
        case ActionTypes.WECHART:
            return {
                ...state
            }
            
        case ActionTypes.REMOVE_DATA:
            return {
                ...state,
                data: [{"pic":"","txt":""}],
            }
        case ActionTypes.Change_Name:
            return {
                ...state,
                name:action.name
            }
        case ActionTypes.Change_userSelectGroupId:
            return {
                ...state,
                userSelectGroupId:action.userSelectGroupId
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
                data: [...state.data, {"pic":action.pic,"txt":action.txt}]
            }
        case ActionTypes.Delete_file:
            return {
                ...state,
                data:deleteFile(action.index,state)
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