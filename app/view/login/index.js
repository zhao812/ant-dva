import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Input, Checkbox, Button } from 'antd'

import CopyRights from '../../components/copyRight'

import * as RouterConst from '../../static/const'

import './index.scss'

class Login extends React.Component{

    constructor(props, context){
        super(props, context)
    }

    render(){
        return(
            <div>
                <div className="login-container">
                    <div className="login-div">
                        <p className="login-title">用户登录</p>
                        <div className="email-div"><Input className="email-input" placeholder="注册邮箱" /></div>
                        <div className="password-div">
                            <Input className="password-input" type="password" placeholder="6-12位登录密码" />
                            <span className="forgetPw-txt">忘记密码?</span>
                        </div>
                        <div>
                            <Checkbox className="checkbox" onChange={(e)=>console.log(e.target.checked)}>7日内免登陆</Checkbox>
                        </div>
                        <Button className="bnLogin">登录</Button>
                        <div className="login-tip">还没有账户?  <Link to={ RouterConst.ROUTER_REGISTER }>立即前往</Link></div>
                    </div>
                </div>
                <CopyRights />
            </div>
        )
    }

}

export default Login