import React from 'react'
import { Menu, Icon, Button } from 'antd'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class SiderMenu extends React.Component{

    render(){
        return (
            <Menu mode="inline" selectedKeys={["3"]} defaultOpenKeys={['sub1','sub2']}>
                <SubMenu key="sub1" title={<span><Icon type="user" /><span>人口标签</span></span>}>
                    <Menu.Item key="1">Option 1</Menu.Item>
                    <Menu.Item key="2">Option 2</Menu.Item>
                    <Menu.Item key="3">Option 3</Menu.Item>
                    <Menu.Item key="4">Option 4</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="pay-circle-o" /><span>资产标签</span></span>}>
                    <Menu.Item key="5">Option 1<Button>筛选</Button><Button>展示</Button></Menu.Item>
                    <Menu.Item key="6">Option 2</Menu.Item>
                    <Menu.Item key="7">Option 3</Menu.Item>
                    <Menu.Item key="8">Option 4</Menu.Item>
                </SubMenu>
            </Menu>
        )
    }
}

export default SiderMenu