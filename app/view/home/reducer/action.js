import * as HTTPUtil from '../../../components/fetch'

const userData = data => ({
    data : data
})
//进入加载数据
export const getUserNumber = () => dispatch => {
    let url = "/mock/userNumber.json";
    return dispatch(HTTPUtil.fetchGet(url, null, null))
}
