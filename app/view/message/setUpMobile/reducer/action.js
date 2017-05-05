import * as HTTPUtil from '../../../../components/fetch'

const tableData = data => ({
    data : data
})
//进入加载数据
export const getUser = () => dispatch => {
    let url = "/mock/usergroup.json";
    dispatch(HTTPUtil.fetchGet(url, null, null)).then(data => dispatch({
        type: "123123123123",
        data: data
    }))
}
