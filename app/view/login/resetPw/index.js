import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Input, Checkbox, Button, Modal } from 'antd'

import * as RouterConst from '../../../static/const'
import ErrorMessage from '../../../static/const/errorMessage'
import CopyRights from '../../../components/copyRight'

import { resetPassword } from '../reducer/action'

import './index.scss'

class ResetPw extends React.Component{

    constructor(props, context){
        super(props, context)
        this.state = {
            password: "",
            passwordAgain: ""
        }
    }

    /**输入框改变事件 */
    onInputChange(e, type){
        let value = e.currentTarget.value.replace(/\s/g,''), state = {}
        state[type] = value
        this.setState(state)
    }

    /**确认按钮点击事件 */
    onComfirmHandler(){
        let { password, passwordAgain } = this.state, msg=""
        if(password == ""){
            msg = ErrorMessage.Error_Password_Empty
        }else if(passwordAgain == ""){
            msg = ErrorMessage.Error_Password_Again_Empty
        }else if(password != passwordAgain){
            msg = ErrorMessage.Error_Password_Inconsistency
        }

        if(msg) {
            Modal.error({title:"提示", content: msg})
            return
        }

        this.props.resetPassword(password)
    }

    render(){
        let { password, passwordAgain } = this.state

        return(
            <div>
                <div className="resetPw-container">
                    <div className="resetPw-div">
                        <p className="resetPw-title">重设密码</p>
                        <p className="resetPw-tip">{this.props.user.email}，请重新设置您的登录密码</p>

                        <Input className="password-input" placeholder="6-12位登录密码" value={password} onChange={(e)=>onInputChange(e, "password")} />
                        <Input className="password-input-again" placeholder="再次确认登录密码" value={passwordAgain} onChange={(e)=>onInputChange(e, "passwordAgain")} />

                        <Button className="bnResetPw" onClick={()=>this.onComfirmHandler()}>确认</Button>
                    </div>
                </div>
                <CopyRights />
            </div>
        )
    }
}

ResetPw.PropTypes = {
    user: PropTypes.shape({
        email: PropTypes.string.isRequired
    }).isRequired
}

let mapStateToProps = state => ({
    user: state.loginReducer.user
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ resetPassword }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPw)