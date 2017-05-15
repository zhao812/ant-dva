import * as HTTPUtil from '../../../../../components/fetch'
import * as ActionTypes from './ActionTypes'
const wechatNextData = data => ({
    type : ActionTypes.WECHART_NEXT,
    data : data
})
//保存
export const commitWechatNext = (data) => dispatch => {
    let url = "/mock/wechatnext.json";
    dispatch(HTTPUtil.fetchGet(url, data, null)).then((data)=>{
            dispatch(wechatNextData(data));
    })
}

//生成推广连接
export const generateAd = (data) => dispatch => {
    let url = "/message/sendLink";
    return dispatch(HTTPUtil.fetchGet(url, data, null))
}


//发送到我的手机
export const getMessage = (data) => dispatch => {
    let url = "/mock/getMessage.json";
    dispatch(HTTPUtil.fetchGet(url, {data:data}, null)).then((data)=>data)
}