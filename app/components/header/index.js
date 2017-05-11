import React, { PropTypes } from 'react';
import { Layout, Menu, Icon, Input, Button } from 'antd'
import './index.scss'

const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
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
        return(
            <Header className="header-div">
                <div className="logo"></div>
                <Menu onClick={(e) => this.handleClick(e)} selectedKeys={[this.state.selectedTab]} mode="horizontal" className="menuUl">
                    <Menu.Item key="home" className="menuLi">首页</Menu.Item>
                    <Menu.Item key="user" className="menuLi">用户画像</Menu.Item>
                    <Menu.Item key="pic" className="menuLi">画像营销</Menu.Item>
                    <Menu.Item key="doc" className="menuLi">说明文档</Menu.Item>
                    <Menu.Item key="aboutus" className="menuLi">关于我们</Menu.Item>
                </Menu>

                <div className="login-btns">
                    <Button className="bnLogin">登录</Button>
                    <Button className="bnRegister">立即注册</Button>
                </div>
            </Header>
        )
    }

}


export default Headers;