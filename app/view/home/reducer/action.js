import * as HTTPUtil from '../../../components/fetch'
import * as ActionType from './actionTypes'

const receiveData = data => ({
    type: ActionType.HOME_UPDATE,
    data: data
})

//进入加载数据
export const getUserNumber = () => dispatch => {
    let url = "/index/userNumber.do";
    dispatch(HTTPUtil.fetchGet(url, null, null)).then(data=>dispatch(receiveData(data)))
}