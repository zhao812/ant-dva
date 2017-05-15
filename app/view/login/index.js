import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, hashHistory } from 'react-router'
import { Input, Checkbox, Button, Modal } from 'antd'
import CopyRights from '../../components/copyRight'

import * as RouterConst from '../../static/const'
import * as ErrorMessage from '../../static/const/errorMessage'

import { userLogin } from './reducer/action'
import { checkEmail } from '../../utils'

import './index.scss'

class Login extends React.Component{

    constructor(props, context){
        super(props, context)

        this.state = {
            username: "",
            password: "",
        }
    }

    onEmailChange(e){
        let value = e.currentTarget.value.replace(/\s/g,'')
        this.setState({username: value})
    }

    onPwChange(e){
        let value = e.currentTarget.value.replace(/\s/g,'')
        this.setState({password: value})
    }

    onLoginHandler(){
        let { username, password } = this.state, msg=""
        if(username == ""){
            msg = ErrorMessage.Error_Email_Empty
        }else if(!checkEmail(username)){
            msg = ErrorMessage.Error_Email_Invalid
        }else if(password == ""){
            msg = ErrorMessage.Error_Password_Empty
        }else if(password.length<5||password.length>12){
            msg = ErrorMessage.Error_PassWord_Invalid
        }
        if(msg){
            Modal.error({
                title: '提示',
                content: msg
            })
            return
        }

        this.props.userLogin(username, password)
    }

    render(){
        let { username, password } = this.state

        return(
            <div>
                <div className="login-container">
                    <div className="login-div">
                        <p className="login-title">用户登录</p>
                        <div className="email-div">
                            <Input className="email-input" value={username} onChange={(e)=>this.onEmailChange(e)} placeholder="注册邮箱" />
                        </div>
                        <div className="password-div">
                            <Input className="password-input" type="password" placeholder="6-12位登录密码" maxLength="12" value={password} onChange={(e)=>this.onPwChange(e)} />
                            <span className="forgetPw-txt" onClick={()=>hashHistory.push(RouterConst.ROUTER_FORGET_PW)}>忘记密码?</span>
                        </div>
                        <div className="login-code">
                            {/*<Checkbox className="checkbox" onChange={(e)=>console.log(e.target.checked)}>7日内免登陆</Checkbox>*/}
                            <Input name="validCode" value="validCode" placeholder="验证码" type="text" />
                            <span><img onClick={()=>this.src='/captcha/generate.do?t='+new Date().getTime()} alt="看不清？点击换一张" src="/captcha/generate.do" /></span>
                        </div>
                        <Button className="bnLogin" onClick={()=>this.onLoginHandler()}>登录</Button>
                        <div className="login-tip">还没有账户?  <Link to={ RouterConst.ROUTER_REGISTER }>立即前往</Link></div>
                    </div>
                </div>
                <CopyRights />
            </div>
        )
    }

}

Login.PropTypes = {
}

let mapStateToProps = state => ({
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ userLogin }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)