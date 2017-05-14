import * as HTTPUtil from '../../../components/fetch'
import * as ActionType from './actionType'
import { hashHistory } from 'react-router'
import * as RouterConst from '../../../static/const'

const receiveData = data => ({
    type: ActionType.UPDATE_USER_INFO,
    data: data
})

/**用户登录 */
export const userLogin = (userName, password) => dispatch => {
    let url = "index/login"
    let opt = {
        username: userName,
        password: password
    }
    dispatch(HTTPUtil.fetchPost(url, opt, null)).then(data=>{
        dispatch(receiveData(data))

        hashHistory.push(RouterConst.ROUTER_HOME)
    })
}

/**用户注册 */
export const userRegister = (userName, password) => {
    let url = "index/register"
    let opt = {
        username: userName,
        password: password
    }
    dispatch(HTTPUtil.fetchPost(url, opt, null)).then(data=>{
        // dispatch(receiveData(data))
        hashHistory.push(RouterConst.ROUTER_HOME)
    })
}