import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Input, Checkbox, Button } from 'antd'

import * as RouterConst from '../../../static/const'

import CopyRights from '../../../components/copyRight'

import './index.scss'

class ForgetPW extends React.Component{

    constructor(props, context){
        super(props, context)
    }

    render(){
        return(
            <div>
                <div className="forgetPw-container">
                    <div className="forgetPw-div">
                        <p className="forgetPw-title">忘记密码</p>
                        <Input className="email-input" placeholder="请输入您的注册邮箱" />

                        <p className="email-tip">我们将发送一个新的验证邮件到您的注册邮箱</p>

                        <Button className="bnForgetPw">发送</Button>
                        <div className="forgetPw-tip">还没有账户?  <Link to={RouterConst.ROUTER_REGISTER}>立即注册</Link></div>
                    </div>
                </div>
                <CopyRights />
            </div>
        )
    }
}

export default ForgetPW