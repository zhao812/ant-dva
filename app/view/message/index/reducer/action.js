import * as HTTPUtil from '../../../../components/fetch'
import * as ActionTypes from './ActionTypes'

const tableData = data => ({
    type : ActionTypes.Active_List,
    data : data
})
//进入加载数据
export const getTableData = (data) => dispatch => {
    let url = "activity/list";
    console.log(data,12334445555)
    dispatch(HTTPUtil.fetchGet(url, data, null)).then((data)=>{
            dispatch(tableData(data));
    })
}
