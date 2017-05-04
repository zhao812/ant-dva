import * as HTTPUtil from '../../../components/fetch'
import * as ActionType from './actionType'

let receiveData = data => ({
    type: ActionType.UPDATE_SEARCH_MENU_LIST,
    data: data
})

//加载数据
export const getSearchMenu = () => dispatch => {
    let url = "/mock/searchMenu.json";
    dispatch(HTTPUtil.fetchGet(url, null, null)).then(data=>dispatch(receiveData(data.data)))
}

//改变筛选项目显示状态
export const changeFilterMenuList = id => dispatch => {
    dispatch({
        type: ActionType.CHANGE_FILTER_MENU_LIST,
        data: id
    })
}

//改变展示项目状态
export const changeShowMenuList = id => dispatch =>{
    dispatch({
        type: ActionType.CHANGE_SHOW_MENU_LIST,
        data: id
    })
}