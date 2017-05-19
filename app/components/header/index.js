import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Router, Route, IndexRoute, Link ,hashHistory} from 'react-router';
import { Layout, Menu, Icon, Input, Button } from 'antd'
import * as RouterConst from '../../static/const'

import './index.scss'

class Headers extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            selectedTab: "home"
        }
    }

    handleClick(e) {
        this.setState({selectedTab: e.key})
    }

    onChangeUserName(){

    }

    render() {
        let { Header } = Layout, SubMenu = Menu.SubMenu, MenuItemGroup = Menu.ItemGroup

        return(
            <Header className="header-div">
                <div className="logo"></div>
                <Menu onClick={(e) => this.handleClick(e)} selectedKeys={[this.state.selectedTab]} mode="horizontal" className="menuUl">
                    <Menu.Item key="home" className="menuLi"><Link to={RouterConst.ROUTER_HOME}>首页</Link></Menu.Item>
                    <Menu.Item key="user" className="menuLi"><Link to={RouterConst.SEARCH_LIST}>用户画像</Link></Menu.Item>
                    <Menu.Item key="pic" className="menuLi"><Link to={RouterConst.GET_MESSAGE}>画像营销</Link></Menu.Item>
                    <Menu.Item key="doc" className="menuLi">说明文档</Menu.Item>
                    <Menu.Item key="aboutus" className="menuLi">关于我们</Menu.Item>
                </Menu>

                {
                    !this.props.isLogin ? 
                        <div className="login-btns">
                            <Button className="bnLogin" onClick={() => hashHistory.push(RouterConst.ROUTER_LOGIN) }>登录</Button>
                            <Button className="bnRegister" onClick={() => hashHistory.push(RouterConst.ROUTER_REGISTER) }>立即注册</Button>
                        </div>
                        : ""
                }
            </Header>
        )
    }

}

Headers.PropTypes = {
    isLogin: PropTypes.bool.isRequired
}

let mapStateToProps = state => ({
    isLogin: state.loginReducer.isLogin
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Headers)