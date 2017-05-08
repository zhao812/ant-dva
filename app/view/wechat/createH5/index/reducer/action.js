import * as HTTPUtil from '../../../../../components/fetch'
import * as ActionTypes from './ActionTypes'
const wechatData = data => ({
    type : ActionTypes.WECHART,
    data : data
})
//进入加载数据
export const commitWechat = (data) => dispatch => {
    let url = "/mock/wechat.json";
    dispatch(HTTPUtil.fetchGet(url, data, null)).then((data)=>{
            dispatch(wechatData(data));
    })
}
