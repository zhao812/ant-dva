import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Link } from 'react-router'
import { Input, Checkbox, Button, Modal } from 'antd'

import * as RouterConst from '../../../static/const'
import ErrorMessage from '../../../static/const/errorMessage'

import CopyRights from '../../../components/copyRight'

import { sendEmailMessage } from '../reducer/action'

import './index.scss'

class ForgetPW extends React.Component{

    constructor(props, context){
        super(props, context)

        this.state = {
            username: ""
        }
    }

    /**输入框改变事件 */
    onInputChange(e, type){
        let value = e.currentTarget.value.replace(/\s/g,''), state = {}
        state[type] = value
        this.setState(state)
    }

    /**发送按钮点击事件 */
    onSendHandler(){
        let { username } = this.state
        if(username == ""){
            Modal.error({title:"提示", content: ErrorMessage.Error_Email_Empty})
            return
        }

        this.props.sendEmailMessage()
    }

    render(){
        let { email } = this.state

        return(
            <div>
                <div className="forgetPw-container">
                    <div className="forgetPw-div">
                        <p className="forgetPw-title">忘记密码</p>
                        <Input className="email-input" placeholder="请输入您的注册邮箱" value={username} onChange={(e)=>this.onInputChange(e, "username")} />

                        <p className="email-tip">我们将发送一个新的验证邮件到您的注册邮箱</p>

                        <Button className="bnForgetPw" onClick={()=>this.onSendHandler()}>发送</Button>
                        <div className="forgetPw-tip">还没有账户?  <Link to={RouterConst.ROUTER_REGISTER}>立即注册</Link></div>
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
    return bindActionCreators({ sendEmailMessage }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPW)