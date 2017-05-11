import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Input, Checkbox, Button } from 'antd'

import * as RouterConst from '../../../static/const'

import CopyRights from '../../../components/copyRight'

import './index.scss'

class ResetPw extends React.Component{

    constructor(props, context){
        super(props, context)
    }

    render(){
        return(
            <div>
                <div className="resetPw-container">
                    <div className="resetPw-div">
                        <p className="resetPw-title">重设密码</p>
                        <p className="resetPw-tip">{this.props.user.email}，请重新设置您的登录密码</p>

                        <Input className="password-input" placeholder="6-12位登录密码" />
                        <Input className="password-input-again" placeholder="再次确认登录密码" />

                        <Button className="bnResetPw">确认</Button>
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
    return bindActionCreators({ }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPw)