import * as HTTPUtil from '../../../../../components/fetch'
import * as ActionTypes from './ActionTypes'
const wechatNextData = data => ({
    type : ActionTypes.WECHART_NEXT,
    data : data
})
//进入加载数据
export const commitWechatNext = (data) => dispatch => {
    let url = "/mock/wechatnext.json";
    dispatch(HTTPUtil.fetchGet(url, data, null)).then((data)=>{
            dispatch(wechatNextData(data));
    })
}
