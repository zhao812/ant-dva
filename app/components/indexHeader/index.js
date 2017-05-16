import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Router, Route, IndexRoute, Link ,hashHistory} from 'react-router';
import { Layout, Menu, Icon, Input, Button } from 'antd'
import {getOpenKeys,getCurrent} from '../siderMenu/reducer/action'
import * as RouterConst from '../../static/const'

import './index.scss'

class Headers extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            selectedTab: "home",
            isShow:false
        }
    }

    handleClick(e) {
        this.setState({selectedTab: e.key})

        this.props.getOpenKeys(['sub0'])
        this.props.getCurrent('a0')
    }
    handlerSearch(e){
        this.setState({
            isShow:true
        })
    }

    render() {
        let { Header } = Layout, SubMenu = Menu.SubMenu, MenuItemGroup = Menu.ItemGroup

        return(
            <Header className="header-div2">
                <div className="wapper">
                    <div className="logo2"></div>
                    <div className="right" className={this.state.isShow==true?"right showInput":"right"} >
                         <Input className="search_input" />
                         <Icon type="search" className="search_icon" onClick={this.handlerSearch.bind(this)} />
                    </div>
                    <Menu onClick={(e) => this.handleClick(e)} selectedKeys={[this.state.selectedTab]} mode="horizontal" className="menuUl">
                        <Menu.Item key="home" className="menuLi"><Link to='/'>首页</Link></Menu.Item>
                        <Menu.Item key="user" className="menuLi"><Link to='/searchList'>用户画像</Link></Menu.Item>
                        <Menu.Item key="pic" className="menuLi"><Link to='/message'>画像营销</Link></Menu.Item>
                        <Menu.Item key="doc" className="menuLi">说明文档</Menu.Item>
                    </Menu>
                </div>
            </Header>
        )
    }

}



Headers.propTypes = {
}

let mapStateToProps = state => ({
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getOpenKeys,getCurrent }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Headers)