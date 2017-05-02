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
    }
    render(){
        const { SelectedKeys ,openKeys}=this.state;
        const {data} =this.props;
        return (
             <Menu
                onClick={(e)=>this.handleMenuClick(e)}
                className="silder"
                defaultSelectedKeys={SelectedKeys}
                defaultOpenKeys={openKeys}
                mode="inline" >
                {
                    data.data&&data.data.map((item,key)=>(
                        <SubMenu key={key} title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.name}</span>
                            </span>}>
                            {
                                item.children.map((menu) => (
                                    <Menu.Item key={`${menu.name}`+"_"+`${menu.url}`}>
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

export default SiderMenu