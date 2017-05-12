import React, { PropTypes } from 'react'
import { hashHistory } from 'react-router'
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
                <div className="wapper">
                    <div className="logo"></div>
                    <Menu onClick={(e) => this.handleClick(e)} selectedKeys={[this.state.selectedTab]} mode="horizontal" className="menuUl">
                        <Menu.Item key="home" className="menuLi">首页</Menu.Item>
                        <Menu.Item key="user" className="menuLi">用户画像</Menu.Item>
                        <Menu.Item key="pic" className="menuLi">画像营销</Menu.Item>
                        <Menu.Item key="doc" className="menuLi">说明文档</Menu.Item>
                    </Menu>
                </div>
            </Header>
        )
    }

}


export default Headers;