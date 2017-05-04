import * as HTTPUtil from '../../../../components/fetch'

const tableData = data => ({
    data : data
})
//进入加载数据
export const getTableData = () => dispatch => {
    let url = "/mock/message.json";
    return dispatch(HTTPUtil.fetchGet(url, null, null))
}
