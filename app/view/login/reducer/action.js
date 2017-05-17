import * as HTTPUtil from '../../../components/fetch'
import * as ActionType from './actionType'
import { hashHistory } from 'react-router'
import * as RouterConst from '../../../static/const'

const receiveData = data => ({
    type: ActionType.UPDATE_USER_LOGIN,
    data: data
})

/**用户登录 
 @userName 用户名
 @password 密码
 @validCode 验证码
*/
export const userLogin = (userName, password, validCode) => dispatch => {
    let url = "index/login"
    let opt = {
        j_username: userName,
        j_password: password,
        validCode: validCode
    }

    dispatch(HTTPUtil.fetchPost(url, opt, null)).then(data=>{
        dispatch(receiveData(data))
        hashHistory.push(RouterConst.ROUTER_HOME)
    })
}

/**用户注册 */
export const userRegister = (username, password) => dispatch =>{
    let url = "index/register"
    let opt = {
        username: username,
        password: password
    }
    dispatch(HTTPUtil.fetchPost(url, opt, null)).then(data=>{
        hashHistory.push(RouterConst.ROUTER_HOME)
    })
}

/**发送验证码到用户邮箱 */
export const sendEmailMessage = () => dispatch => {
    let url = "index/sendMsg"
    dispatch(HTTPUtil.fetchPost(url, null, null)).then(data=>{
        // dispatch(receiveData(data))
    })
}

/**重新设置密码 */
export const resetPassword = password => dispatch => {
    let url = "index/resetPw"
    let opt = {password: password}
    dispatch(HTTPUtil.fetchPost(url, opt, null)).then(data=>{
        // dispatch(receiveData(data))
    })
}