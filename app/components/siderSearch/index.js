import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Menu, Icon, Button } from 'antd'

import SubMenuItem from './subMenuItem'


import { changeShowMenuList } from '../../view/search/reducer/actions'

import '../../static/css/common.scss'
import './index.scss'

class SiderSearchMenu extends React.Component{
    constructor(props,context) {
        super(props,context)

        this.state = {
            openKeys: ["0"],
        }
    }
    
    componentDidMount(){
    }

    getMenu(){
        let SubMenu = Menu.SubMenu
        let { filterMenuList, showMenuList, menuData } = this.props
        return menuData.map((data, index)=>
            <SubMenu className="search-subMenu" key={index} title={<SubMenuItem title={data.name} icon={data.icon} />}>
                { 
                    data.list.map((item, i) => {
                        let key = item.id
                        return (
                            <Menu.Item className={item.isShow ? "menu-item-show" : "menu-item-hide"} key={key}>
                                <div className="menu-icon"></div>
                                <div className="menu-item-title">{item.name}</div>
                            </Menu.Item>
                        )
                    }) 
                }
            </SubMenu>
        )
    }

    onSubMenuHandler = (openKeys) => {
        if(openKeys.length > 1){
            openKeys.shift()
        }
        this.setState({openKeys: openKeys})
    }

    handleClick = (e) => {
        this.props.changeShowMenuList(e.key)
    }

    render(){
        let {openKeys} = this.state
        return (
             <Menu
                className="silder"
                //defaultSelectedKeys={SelectedKeys}
                defaultOpenKeys={openKeys}
                openKeys={openKeys}
                onOpenChange={this.onSubMenuHandler}
                onClick={this.handleClick}
                mode="inline" >
                {this.getMenu()}
            </Menu>
        )
    }
}

SiderSearchMenu.PropTypes = {
    menuData: PropTypes.array.isRequired
}

let mapStateToProps = state => ({
    menuData: state.searchList.menuData
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ changeShowMenuList }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SiderSearchMenu)