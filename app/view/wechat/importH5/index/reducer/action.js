import * as HTTPUtil from '../../../../../components/fetch'
import * as ActionTypes from './ActionTypes'
const importData = data => ({
    type : ActionTypes.IMPORT_CHART,
    data : data
})
//进入加载数据
export const commitImport = (data) => dispatch => {
    let url = "/mock/importChart.json";
    dispatch(HTTPUtil.fetchGet(url, data, null)).then((data)=>{
            dispatch(importData(data));
    })
}
