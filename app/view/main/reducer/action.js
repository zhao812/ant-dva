import * as HTTPUtil from '../../../components/fetch'

const menuData = data => ({
    data : data
})
//进入加载数据
export const getMenu = () => dispatch => {
    let url = "/mock/menu.json";
    return dispatch(HTTPUtil.fetchGet(url, null, null));
}
