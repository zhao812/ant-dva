import * as ActionType from './actionType'


const initialState = {
    menuData: [],
    favorites: [],
    filterMenuList: [],
    showMenuList: [],

    userTotal: 0,
    riseTime: 0,
    reportCount: 0,
    reportList: []
}

//改变筛选项目
let changeFilterMenuList = (state, id) => ({
    ...state,
    filterMenuList: changeListById(state.filterMenuList, getItemById(state.menuData, id))
})

//改变显示项目
let changeShowMenuList = (state, id) => ({
    ...state,
    menuData: state.menuData.map(obj=>{
        return {
            ...obj,
            list: obj.list.map(item=>{
                if(item.id == id) return {
                    ...item,
                    isShow: !item.isShow
                }
                return item
            })
        }
    })
})


let getItemById = (data, id) => {
    let res;
    for(let i=0; i< data.length; i++){
        res = data[i].list.filter((obj)=>obj.id==id)
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

let changeSelectValue = (state, data) => {
    var item = state.filterMenuList.filter(obj=>obj.id==data.id)
    item.defaultValue = data.value
    return {
        ...state,
        filterMenuList: state.filterMenuList.map(obj=>{
            if(obj.id == data.id){
                return {
                    ...obj,
                    defaultValue: data.value
                }
            }
            return obj
        })
    }
}

export default function update(state = initialState, action) {
    switch(action.type) {
        case ActionType.UPDATE_SEARCH_MENU_LIST:
            return {
                ...state,
                menuData: action.data.menus,
                favorites: action.data.favorites
            }
        case ActionType.CHANGE_FILTER_MENU_LIST:
            return changeFilterMenuList(state, action.data)

        case ActionType.CHANGE_SHOW_MENU_LIST:
            return changeShowMenuList(state, action.data)

        case ActionType.SEARCH_MENU_CHANGE_SELECT:
            return changeSelectValue(state, action.data)

        case ActionType.SEARCH_UPDATE_REPORT_DATA:
            return { 
                ...state, 
                reportList: action.data.reports,
                userTotal: action.data.userTotal,
                riseTime: action.data.riseTime,
                reportCount: action.data.reportCount,
             }

        default:
            return state
    }
}