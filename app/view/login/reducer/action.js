import * as HTTPUtil from '../../../components/fetch'
import * as ActionType from './actionType'

const receiveData = data => ({
    type: ActionType.HOME_UPDATE,
    data: data
})

//进入加载数据
export const userLogin = (userName, password) => dispatch => {
    let url = "/index/login";
    let opt = {
        username: userName,
        password: password
    }
    dispatch(HTTPUtil.fetchPost(url, opt, null)).then(data=>dispatch(receiveData(data)))
}
