import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Input, Checkbox, Button } from 'antd'

import * as RouterConst from '../../../static/const'

import CopyRights from '../../../components/copyRight'

import './index.scss'

class Register extends React.Component{

    constructor(props, context){
        super(props, context)
    }

    render(){
        return(
            <div>
                <div className="register-container">
                    <div className="register-div">
                        <p className="register-title">注册</p>
                        <Input className="email-input" placeholder="注册邮箱" />
                        <Input className="password-input" type="password" placeholder="6-12位登录密码" />
                        <Input className="password-input-again" type="password" placeholder="再次确认登录密码" />

                        <div>
                            <Checkbox className="checkbox" onChange={(e)=>console.log(e.target.checked)}>我阅读并同意Qbao UserMirror服务条款</Checkbox>
                        </div>

                        <Button className="bnRegister">注册</Button>
                        <div className="register-tip">已有账户?  <Link to={RouterConst.ROUTER_LOGIN}>立即登录</Link></div>
                    </div>
                </div>
                <CopyRights />
            </div>
        )
    }
}

export default Register