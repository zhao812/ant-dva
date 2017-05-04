import * as ActionType from './actionType'


const initialState = {
    menuData: [],
    menuItems: [],
    filterMenuList: [],
    showMenuList: [],
}

//改变筛选项目
let changeFilterMenuList = (state, id) => ({
    ...state,
    filterMenuList: changeListById(state.filterMenuList, getItemById(state.menuData, id))
})

//改变显示项目
let changeShowMenuList = (state, id) => ({
    ...state,
    showMenuList: changeListById(state.showMenuList, getItemById(state.menuData, id))
})

let getItemById = (data, id) => {
    let res;
    for(let i=0; i< data.length; i++){
        res = data[i].menuItem.filter((obj)=>obj.id==id)
        if(res.length){
            return res[0]
        }
    }
    return null
}

let changeListById = (list, item) => {
    if(!item) return list
    let index = list.findIndex(obj => obj.id == item.id), result
    if(index >=0){
        result = list.filter(obj => obj.id != item.id)
    }else{
        result = [...list, item]
    }
    return result
}

export default function update(state = initialState, action) {
    switch(action.type) {
        case ActionType.UPDATE_SEARCH_MENU_LIST:
            return {
                ...state,
                menuData: action.data
            }
        case ActionType.CHANGE_FILTER_MENU_LIST:
            return changeFilterMenuList(state, action.data)

        case ActionType.CHANGE_SHOW_MENU_LIST:
            return changeShowMenuList(state, action.data)
        default:
            return state
    }
}