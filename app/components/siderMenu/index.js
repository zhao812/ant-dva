import React from 'react'
import { Router, Route, IndexRoute, Link ,hashHistory} from 'react-router';
import { Menu, Icon, Button } from 'antd'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import './index.css' 

class SiderMenu extends React.Component{
    constructor(props,context) {
        super(props,context);
        this.state={
            SelectedKeys:['1'],
            openKeys: ['sub1']
        }
    }
    handleMenuClick(e){
        this.setState({
            name:e.key.split('_')[0]
        })
        this.props.changeTitle(e.key.split('_')[0])
    }
    componentDidMount(){
        //this.props.changeTitle('Option 1')
        //this.props.getMenu();
    }
    render(){
        const { SelectedKeys ,openKeys}=this.state;
        return (
             <Menu
                onClick={(e)=>this.handleMenuClick(e)}
                className="silder"
                defaultSelectedKeys={SelectedKeys}
                defaultOpenKeys={openKeys}
                mode="inline" >
                <SubMenu key="sub1"
                 title={<span><Icon type="mail" /><span>Navigation One</span></span>}
                 onClick={(e)=>this.handleMenuClick(e)}
                >
                    <Menu.Item key="Option 1_1"><Link to="/">Option 1</Link></Menu.Item>
                    <Menu.Item key="Option 2_2"><Link to="/user">Option 2</Link></Menu.Item>
                    <Menu.Item key="Option 3_3">Option 3</Menu.Item>
                    <Menu.Item key="Option 4_4">Option 4</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
                <Menu.Item key="Option 5_1">Option 5</Menu.Item>
                <Menu.Item key="Option 6_2">Option 6</Menu.Item>
                <SubMenu key="sub3" title="Submenu">
                    <Menu.Item key="Option 7_1">Option 7</Menu.Item>
                    <Menu.Item key="Option 8_2">Option 8</Menu.Item>
                </SubMenu>
                </SubMenu>
                <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
            </Menu>
        )
    }
}

export default SiderMenu