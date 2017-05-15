import * as HTTPUtil from '../../../components/fetch'
import * as ActionType from './actionType'

let receiveData = data => ({
    type: ActionType.UPDATE_SEARCH_MENU_LIST,
    data: data
})

//加载数据
export const getSearchMenu = () => dispatch => {
    let url = "searchMenu";
    dispatch(HTTPUtil.fetchGet(url, null, null)).then(data=>dispatch(receiveData(data)))
}

/**改变选择框中的值 */
export const changeFilterMenuSelect = (id, index, value) => dispatch => {
    dispatch({
        type: ActionType.SEARCH_MENU_CHANGE_SELECT,
        data: {
            id: id,
            index: index,
            value: value
        }
    })
}

/**改变展示项目状态*/
export const changeShowMenuList = id => dispatch =>{
    dispatch({
        type: ActionType.CHANGE_SHOW_MENU_LIST,
        data: id
    })
}

let getValueById = (list, id) => {
    let result = []
    for(let i=0; i<list.length; i++){
        let menu = list[i]
        for(let j = 0; j<menu.list.length; j++){
            let item = menu.list[j]
            if(item.id == id && item.defaultValue.toString() != ""){
                result.push(item.defaultValue)
            }
        }
    }
    console.log(result)
    return result
}

let getShowFilterData = state => {
    let showList = state.searchList.menuData, filterList = state.searchList.filterMenuList
    let result = []
    for(let i=0; i<showList.length; i++){
        let menu = showList[i]
        for(let j = 0; j<menu.list.length; j++){
            let item = menu.list[j]
            if(item.isShow){
                result.push({
                    id: item.id,
                    value: getValueById(filterList, item.id).join(",")
                })
            }
        }
    }

    return result
}

let receiveReportData = data => ({
    type: ActionType.SEARCH_UPDATE_REPORT_DATA,
    data: data,
})

/**根据筛选条件获取报表 */
export const getReportData = () => (dispatch, getState) => {
    let state = getState()
    let url = "reportData";
    let opt = {
        data: getShowFilterData(state)
    }
    console.log(opt, "aaaaaaaaaaaaaaaaaa")
    dispatch(HTTPUtil.fetchPost(url, opt, null)).then(data=>dispatch(receiveReportData(data)))
}

/**添加筛选条件 */
export const addFliterMenuList = id => dispatch =>{
    dispatch({
        type: ActionType.ADD_FILTER_MENU_LIST,
        data: id
    })
}

/**关闭筛选条件结果 */
export const onCloseFilter = (id, index) => dispatch => {
    dispatch({
        type: ActionType.CLOSE_FILTER_MENU_LIST,
        data: {id: id, index: index}
    })
}