import * as HTTPUtil from '../../../components/fetch'
import * as ActionType from './actionType'
import { hashHistory } from 'react-router'
import * as RouterConst from '../../../static/const'
import { setCookie, getCookie } from '../../../utils'
import MD5 from 'MD5'
import { Modal } from 'antd'

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
    let url = "/user/loginAction.do"
    let opt = {
        j_username: userName,
        j_password: MD5(password),
        validCode: validCode
    }
    dispatch(HTTPUtil.fetchPost(url, opt, null)).then(data=>{
        dispatch(receiveData(data))
        setCookie("token", data.token)
        setCookie("userName", data.userName)

        Modal.success({
            title: '提示',
            content: '登录成功!',
            onOk: ()=>{ console.log("123123123");hashHistory.push(RouterConst.ROUTER_HOME)}
        });
    })
}

/**用户注册 */
export const userRegister = (username, password) => dispatch =>{
    let url = "/user/registerUser.do"
    let opt = {
        username: username,
        password: MD5(password)
    }
    dispatch(HTTPUtil.fetchPost(url, opt, null)).then(data=>{
        Modal.success({
            title: '提示',
            content: '注册成功!',
            onOk: ()=>{hashHistory.push(RouterConst.ROUTER_LOGIN)}
        });
    })
}

/**发送验证码到用户邮箱 */
export const sendEmailMessage = () => dispatch => {
    let url = "/index/sendMsg"
    dispatch(HTTPUtil.fetchPost(url, null, null)).then(data=>{
        // dispatch(receiveData(data))
    })
}

/**重新设置密码 */
export const resetPassword = password => dispatch => {
    let url = "/index/resetPw"
    let opt = {password: password}
    dispatch(HTTPUtil.fetchPost(url, opt, null)).then(data=>{
        // dispatch(receiveData(data))
    })
}

export const checkLogin = () => dispatch =>{
    let isLogin = false
    let userName = getCookie("userName"), token = getCookie("token")
    if(userName && token){
        isLogin = true
    }
    dispatch({
        type: ActionType.SET_LOGIN_STATE,
        data: isLogin
    })
}