import React from 'react'
import { Router, Route, IndexRoute, Link ,hashHistory} from 'react-router';
import { Menu, Icon, Button } from 'antd'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import './index.scss' 

class SiderMenu extends React.Component{
    constructor(props,context) {
        super(props,context);
        this.state = {
            openTitle:['sub0'],
            
        }
    }
    handleMenuClick(e){
        this.setState({
            name:e.key.split('_')[0]
        })
        console.log(e,1111111111)
    }
    componentDidMount(){
    }
    onOpenChange(e){
        this.setState({
            openTitle:e
        })
    }
    render(){
        const {data} =this.props;
        const {openTitle} = this.state;
        return (
            
             <Menu
                onClick={(e)=>this.handleMenuClick(e)}
                onOpenChange={(e)=>this.onOpenChange(e)}
                className="silder"
                defaultOpenKeys={openTitle}
                defaultSelectedKeys={['a0']}
                mode="inline" >
                {
                    data.data&&data.data.map((item,key)=>(
                        <SubMenu key={'sub'+key} className={openTitle.indexOf("sub"+key)!=-1?"f_selected":""} title={
                            <span>
                                <Icon type={item.icon} />
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

export default SiderMenu