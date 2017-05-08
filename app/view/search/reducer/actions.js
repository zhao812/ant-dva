import * as HTTPUtil from '../../../components/fetch'
import * as ActionType from './actionType'

let receiveData = data => ({
    type: ActionType.UPDATE_SEARCH_MENU_LIST,
    data: data
})

//加载数据
export const getSearchMenu = () => dispatch => {
    let url = "/mock/searchMenu.json";
    dispatch(HTTPUtil.fetchGet(url, null, null)).then(data=>dispatch(receiveData(data)))
}

/**改变选择框中的值 */
export const changeFilterMenuSelect = (id, value) => dispatch => {
    dispatch({
        type: ActionType.SEARCH_MENU_CHANGE_SELECT,
        data: {
            id: id,
            value: value
        }
    })
}

/**改变筛选项目显示状态*/
export const changeFilterMenuList = id => dispatch => {
    dispatch({
        type: ActionType.CHANGE_FILTER_MENU_LIST,
        data: id
    })
}

/**改变展示项目状态*/
export const changeShowMenuList = id => dispatch =>{
    dispatch({
        type: ActionType.CHANGE_SHOW_MENU_LIST,
        data: id
    })
}

let getShowData = state => {
    let showList = state.searchList.showMenuList, filterList = state.searchList.filterMenuList
    return showList.map( item => {
        let menu = filterList.find( obj => obj.id == item.id)
        if(menu){
            return {
                id: menu.id,
                value: menu.defaultValue
            }
        }

        return {
            id:item.id,
            value: item.defaultValue
        }
    })
}

let receiveReportData = data => ({
    type: ActionType.SEARCH_UPDATE_REPORT_DATA,
    data: data,
})

/**根据筛选条件获取报表 */
export const getReportData = () => (dispatch, getState) => {
    let state = getState()
    let url = "/mock/reportData.json";
    let opt = {
        data: getShowData(state)
    }
    dispatch(HTTPUtil.fetchGet(url, opt, null)).then(data=>dispatch(receiveReportData(data)))
}