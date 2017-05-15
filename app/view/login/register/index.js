import React, {PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Link } from 'react-router'
import { Input, Checkbox, Button, Modal } from 'antd'

import * as RouterConst from '../../../static/const'
import ErrorMessage from '../../../static/const/errorMessage'

import CopyRights from '../../../components/copyRight'

import { userRegister } from '../reducer/action'
import { checkEmail } from '../../../utils'

import './index.scss'

class Register extends React.Component{

    constructor(props, context){
        super(props, context)

        this.state = {
            username: "",
            password: "",
            passwordAgain: "",
            isAgree:false    
        }
    }

    /**输入框改变事件 */
    onInputChange(e, type){
        let value = e.currentTarget.value.replace(/\s/g,''), state = {}
        state[type] = e.currentTarget.value
        this.setState(state)
    }

    /**注册按钮事件 */
    onRegisterHandler(){
        let { username, password, passwordAgain,checked,isAgree } = this.state, msg = ""
         if(username == ""){
            msg = ErrorMessage.Error_Email_Empty
        }else if(!checkEmail(username)){
            msg = ErrorMessage.Error_Email_Invalid
        }else if(password == ""){
            msg = ErrorMessage.Error_Password_Empty
        }else if(password.length<6||password.length>12){
            msg = ErrorMessage.Error_PassWord_Invalid
        }
        else if(passwordAgain == ""){
            msg = ErrorMessage.Error_Password_Again_Empty
        }else if(password != passwordAgain){
            msg = ErrorMessage.Error_Password_Inconsistency
        }else if(checked==false){
            msg = ErrorMessage.Error_Not_Read
        }else if(isAgree == false){
            msg = ErrorMessage.Error_Read_And_Agree
        }
        if(msg){
            Modal.error({ title: '提示', content: msg });
            return false;
        }else{
            this.props.userRegister(username, password)
        }
    }
    handlerChecked(e){
        this.setState({
            isAgree:e.target.checked
        })
    }

    render(){
        let { username, password, passwordAgain } = this.state

        return(
            <div>
                <div className="register-container">
                    <div className="register-div">
                        <p className="register-title">注册</p>
                        <Input className="email-input" placeholder="注册邮箱" value={username} onChange={(e)=>this.onInputChange(e, "username")} />
                        <Input className="password-input" type="password" placeholder="6-12位登录密码" maxLength="12" value={password} onChange={(e)=>this.onInputChange(e, "password")} />
                        <Input className="password-input-again" type="password" placeholder="再次确认登录密码" maxLength="12" value={passwordAgain} onChange={(e)=>this.onInputChange(e, "passwordAgain")} />

                        <div>
                            <Checkbox className="checkbox" onChange={(e)=>{this.handlerChecked(e)}}>我阅读并同意Qbao UserMirror服务条款</Checkbox>

                        </div>

                        <Button className="bnRegister" onClick={()=>this.onRegisterHandler()}>注册</Button>
                        <div className="register-tip">已有账户?  <Link to={RouterConst.ROUTER_LOGIN}>立即登录</Link></div>
                    </div>
                </div>
                <CopyRights />
            </div>
        )
    }
}

let mapStateToProps = state => ({
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ userRegister }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)

