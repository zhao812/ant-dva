import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Router, Route, IndexRoute, Link ,hashHistory} from 'react-router';
import { Menu, Icon, Button } from 'antd'
import Icons from '../icon'
import {getCurrent,getOpenKeys} from './reducer/action'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import './index.scss' 

class SiderMenu extends React.Component{
    constructor(props,context) {
        super(props,context);
        this.state = {
            openKeys: ['sub0']
            
        }
    }
    handleMenuClick(e){
        this.props.getCurrent(e.key)
    }
    componentDidMount(e){
        this.props.getCurrent('a0')
        this.props.getOpenKeys(this.props.openKeys)
    }
    onOpenChange(openKeys){
        const state = this.props;
        const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
        const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));
        let nextOpenKeys = [];
        if (latestOpenKey) {
        nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
        }
        if (latestCloseKey) {
        nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
        
        this.props.getOpenKeys(nextOpenKeys)
    }
    
    getAncestorKeys = (key) => {
        const map = {
        sub3: ['sub2'],
        };
        return map[key] || [];
    }
    render(){
        const {data} =this.props;
        const {openTitle} = this.state;
        return (
             <Menu
                openKeys={this.props.openKeys}
                onClick={(e)=>this.handleMenuClick(e)}
                onOpenChange={(e)=>this.onOpenChange(e)}
                className="silder"
                selectedKeys={[this.props.current]}
                defaultOpenKeys={openTitle}
                defaultSelectedKeys={[this.props.current]}
                mode="inline" >
                {
                    data.data&&data.data.map((item,key)=>(
                        <SubMenu key={'sub'+key}  title={
                            <span>
                                <Icons name={item.icon}  className="sider_menuicon"/>
                                <span>{item.name}</span>
                            </span>}>
                            {
                                item.children.map((menu,index) => (
                                    <Menu.Item key={menu.id+index} disabled={menu.id=="d"?true:false}>
                                        <Link to={menu.url}>{menu.name}</Link>
                                    </Menu.Item>
                                ))
                            }
                        </SubMenu>
                    ))
                }
            </Menu>
        )
    }
}


SiderMenu.propTypes = {
}

let mapStateToProps = state => ({
    current:state.sildermenuCurrent.current,
    openKeys:state.sildermenuCurrent.openKeys
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ SiderMenu,getCurrent,getOpenKeys }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SiderMenu)