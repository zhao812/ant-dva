import React from 'react'
import { Router, Route, IndexRoute, Link ,hashHistory} from 'react-router';
import { Menu, Icon, Button } from 'antd'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import './index.css' 

class SiderMenu extends React.Component{
    constructor(props,context) {
        super(props,context);
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
        const {data} =this.props;
        return (
             <Menu
                onClick={(e)=>this.handleMenuClick(e)}
                className="silder"
                defaultOpenKeys={['sub0']}
                 defaultSelectedKeys={['child0']}
                mode="inline" >
                {
                    data.data&&data.data.map((item,key)=>(
                        <SubMenu key={'sub'+key} title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.name}</span>
                            </span>}>
                            {
                                item.children.map((menu,index) => (
                                    <Menu.Item key={"child"+index}>
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