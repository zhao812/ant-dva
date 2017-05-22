import * as HTTPUtil from '../../../components/fetch'
import * as ActionType from './actionType'


let receiveData = (data, page) => ({
    type: ActionType.INIT_FAVORITE_LIST,
    data: data,
    page: page
})

/**获取收藏列表数据
 * opt: {
 *  page:当前页数
 *  size:每页多少
 * }
*/
export const getFavoriteData = opt => dispatch => {
    dispatch({type: ActionType.LOAD_FAVORITE_LIST})
    let url = '/search/usergroup.do'
    dispatch(HTTPUtil.fetchGet(url, opt, null)).then(data=>dispatch(receiveData(data, opt.page)))
}