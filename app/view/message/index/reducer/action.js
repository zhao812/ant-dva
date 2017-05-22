import * as HTTPUtil from '../../../../components/fetch'
import * as ActionTypes from './ActionTypes'

const tableData = data => ({
    type : ActionTypes.Active_List,
    data : data
})
//进入加载数据
export const getTableData = (size,page) => dispatch => {
    let url = "activity/list.do";
    dispatch(HTTPUtil.fetchGet(url, {size:size,page:page}, null)).then((data)=>{
            dispatch(tableData(data));
    })
}
