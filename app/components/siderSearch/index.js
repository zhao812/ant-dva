import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Menu, Icon, Button } from 'antd'

import { changeFilterMenuList, changeShowMenuList } from '../../view/search/reducer/actions'

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
            <SubMenu className="SubMenu" key={index} title={data.title} onClick={()=>this.onSubMenuHandler(index)}>
                { 
                    data.menuItem.map((item, i) => {
                        let key = item.id
                        return (
                            <Menu.Item className="MenuItem" key={key} style>
                                <span>{item.title}</span>
                                <span className="btns">
                                    <Button className={"btn-filter " + (filterMenuList.find((obj)=>key==obj.id) ? "selected": "")} size="small" onClick={()=>this.onFilterHandler(key)}>筛选</Button>
                                    <Button className={"btn-show " + (showMenuList.find((obj)=>key==obj.id) ? "selected": "")} size="small" onClick={()=>this.onShowHandler(key)}>展示</Button>
                                </span>
                            </Menu.Item>
                        )
                    }) 
                }
            </SubMenu>
        )
    }

    onSubMenuHandler(val){
        let { openKeys } = this.state
        let index = openKeys.findIndex((key)=>key==val)
        if(index >= 0){
            openKeys.splice(index, 1)
        }else{
            openKeys.push(val)
        }

        this.setState({ openKeys: openKeys})
    }

    onFilterHandler(id){
        this.props.changeFilterMenuList(id)
    }

    onShowHandler(id){
        this.props.changeShowMenuList(id)
    }

    render(){
        let {openKeys} = this.state
        return (
             <Menu
                className="silder"
                //defaultSelectedKeys={SelectedKeys}
                defaultOpenKeys={openKeys}
                mode="inline" >
                {this.getMenu()}
            </Menu>
        )
    }
}

SiderSearchMenu.PropTypes = {
    menuData: PropTypes.array.isRequired,
    filterMenuList: PropTypes.array.isRequired,
    showMenuList: PropTypes.array.isRequired
}

let mapStateToProps = state => ({
    menuData: state.searchList.menuData,
    filterMenuList: state.searchList.filterMenuList,
    showMenuList: state.searchList.showMenuList,
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ changeFilterMenuList, changeShowMenuList }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SiderSearchMenu)