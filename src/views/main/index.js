/**
 * created by zhao
 * 2017/3/14
 */
import React from 'react'

import { Layout } from 'antd';
import SiderMenu from '../../components/siderMenu'
const { Header, Footer, Sider, Content } = Layout;
import style from './index.css'

class App extends React.Component {
    componentWillMount(){
    }

    componentWillUpdate(){
    }
    
    render(){
        return (
            <Layout className={style.layout}>
                <Header>Header</Header>
                <Layout>
                    <Sider className={style.sider}><SiderMenu /></Sider>
                    <Content>
                        { React.cloneElement(this.props.children, { key: this.props.location.pathname }) }
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default App