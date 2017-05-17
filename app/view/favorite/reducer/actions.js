import * as HTTPUtil from '../../../components/fetch'
import * as ActionType from './actionType'


let receiveData = data => ({
    type: ActionType.INIT_FAVORITE_LIST,
    data: data
})

/**获取收藏列表数据 */
export const getFavoriteData = () => dispatch => {
    let url = 'favorite'
    dispatch(HTTPUtil.fetchGet(url, null, null)).then(data=>dispatch(receiveData(data)))
}