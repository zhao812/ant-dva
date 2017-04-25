import React, { PropTypes } from 'react';
import { Layout, Menu, Icon,Input,Button} from 'antd'
import styles from './index.css'

const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class Headers extends React.Component{
      constructor(props){
        super(props);
        this.state={
          current: 'pic',
          userId:''
        } 
      }
      handleClick(e){
        console.log('click ', e.key);
        this.setState({
          current: e.key,
        });
      }
      onChangeUserName(e){
        this.setState({
          userId: e.value,
        });
      }
      render() {
          return (
            <Header className={styles.headerflex}>
             <h3 className={styles.logo}>QBao用户画像</h3>

             <Input placeholder="Enter your userName"
                prefix={<Icon type="search" />}
                value={this.state.userId}
                onChange={(e)=>this.onChangeUserName(e)}
                style={{width:300,marginLeft:20,marginRight:20}}
              />
              <Button style={{marginTop:18}}>搜索</Button>
              <Menu  onClick={(e)=>this.handleClick(e)}
                  selectedKeys={[this.state.current]}
                  mode="horizontal" 
                  className={styles.menuUl}
                >
                  <Menu.Item key="pic" className={styles.menuLi}>
                    画像营销
                  </Menu.Item>
                  <Menu.Item key="doc"  className={styles.menuLi}>
                    说明文档doc
                  </Menu.Item>
                  <Menu.Item key="log"  className={styles.menuLi}>
                    登录
                  </Menu.Item>
                  <Menu.Item key="reg">
                    注册
                  </Menu.Item>
                </Menu>
            </Header>
          );
        }
};
export default Headers;