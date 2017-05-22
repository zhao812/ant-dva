import * as ActionType from './actionType'


const initialState = {
    menuData: [],
    filterMenuList: [],

    reportId: 0,
    reportDate: "",
    reportNumber: 0,
    reportList: []
}

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
            return {...res[0]}
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

/**改变选项框的值 */
let changeSelectValue = (state, data) => (
    {
        ...state,
        filterMenuList: state.filterMenuList.map(menu=>({
            ...menu,
            list: menu.list.map((obj, index) => {
                if(obj.id == data.id && index==data.index){
                    // if(data.value == ""){
                    //     return {
                    //         ...obj,
                    //         defaultValue: data.value,
                    //         isShowResult: false
                    //     }
                    // }else{
                        return {
                            ...obj,
                            defaultValue: data.value,
                            isShowResult: true
                        }
                    // }
                }
                return obj
            })
        }))
    }
)


let addFilterMenuList = (state, id) => {
    let item = getItemById(state.menuData, id)
    if(!item) return state

    item.isDel = true
    item.create_time = Date.now()
    return {
        ...state,
        filterMenuList: state.filterMenuList.map((menu, index) => {
            if(menu.list.findIndex(obj=>obj.id == id) >= 0){
                return {
                    ...menu,
                    list: [...menu.list, item].sort((a, b)=>{
                        let create_a = a.create_time || 0,
                        create_b = b.create_time || 0
                        return a.id == b.id ? create_b < create_a ? 1 : -1 : b.order < a.order ? 1 : -1
                    })
                }
            }
            return menu
        })
    }
}

let closeFilterMenuList = (state, data) => {
    return {
        ...state,
        filterMenuList: state.filterMenuList.map(menu=>{
            return {
                ...menu,
                list: menu.list.filter((item, index) => {
                    if(item.id == data.id && index == data.index){
                        if(!item.isDel){
                            item.defaultValue = ""
                            item.isShowResult = false
                            return item
                        }
                    }else{
                        return item
                    }
                })
            }
        })
    } 
}

export default function update(state = initialState, action) {
    switch(action.type) {
        case ActionType.UPDATE_SEARCH_MENU_LIST:
            return {
                ...state,
                menuData: action.data.menus,
                filterMenuList: [...action.data.menus]
            }
        case ActionType.ADD_FILTER_MENU_LIST:
            return addFilterMenuList(state, action.data)

        case ActionType.CHANGE_SHOW_MENU_LIST:
            return changeShowMenuList(state, action.data)

        case ActionType.SEARCH_MENU_CHANGE_SELECT:
            return changeSelectValue(state, action.data)

        case ActionType.SEARCH_UPDATE_REPORT_DATA:
            return { 
                ...state,
                reportId: action.data.id,
                reportDate: action.data.create_date,
                reportNumber: action.data.number,
                reportList: action.data.reports,
             }
        case ActionType.CLOSE_FILTER_MENU_LIST:
            return closeFilterMenuList(state, action.data)

        case ActionType.CLEAR_CALCULATE_RESULT:
            return {
                ...state,
                reportId: 0,
                reportDate: '',
                reportNumber: 0,
                reportList: [],
            }
        default:
            return state
    }
}