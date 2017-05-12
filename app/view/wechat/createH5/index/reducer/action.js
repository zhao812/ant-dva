import * as HTTPUtil from '../../../../../components/fetch'
import * as ActionTypes from './ActionTypes'
const wechatData = data => ({
    type : ActionTypes.WECHART,
    data : data
})

export const changeTitle =(title) => dispatch => {
    dispatch({
        type : ActionTypes.Change_Title,
        title: title
    })
}
export const changeContent =(content) => dispatch => {
    dispatch({
        type : ActionTypes.Change_Content,
        content: content
    })
}
export const changeLogo =(logo) => dispatch => {
    dispatch({
        type : ActionTypes.Change_Logo,
        logo: logo
    })
}
export const changeUrl =(linkurl) => dispatch => {
    dispatch({
        type : ActionTypes.Change_Url,
        linkurl: linkurl
    })
}
export const changePic =(index,pic) => dispatch => {
    dispatch({
        type : ActionTypes.Change_Pic,
        pic: pic,
        index:index
    })
}
export const changeTxt =(txt,index) => dispatch => {
    dispatch({
        type : ActionTypes.Change_Txt,
        txt: txt,
        index:index
    })
}
export const addPic =(pic) => dispatch => {
    dispatch({
        type : ActionTypes.Add_Pic,
        pic: pic
    })
}
export const addTxt =(short) => dispatch => {
    dispatch({
        type : ActionTypes.Add_Short,
        short: short
    })
}
//进入加载数据
export const commitWechat = (data) => dispatch => {
    let url = "/mock/wechat.json";
    dispatch(HTTPUtil.fetchGet(url, data, null)).then((data)=>{
            dispatch(wechatData(data));
    })
}
