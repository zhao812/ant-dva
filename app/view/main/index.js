import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Headers from '../../components/header'
import IndexHeader from '../../components/indexHeader'
import SiderMenu from '../../components/siderMenu'
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import './index.css'

import * as RouterConst from '../../static/const'
import * as menuData from '../../static/const/menu'

import SiderSearchMenu from '../../components/siderSearch'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            data: ""
        }
    }


    componentDidMount() {
        if(this.props.location.pathname.indexOf('wechart')==1||this.props.location.pathname.indexOf('importChart')==1){
             this.setState({
                data: menuData.data2
            })
        }else{
            this.setState({
                    data: menuData.data
                })
        }
    }

    render() {
        let menu;
        let top;
        switch (this.props.location.pathname) {
            case RouterConst.ROUTER_HOME:
            case RouterConst.ROUTER_LOGIN:
            case RouterConst.ROUTER_REGISTER:
            case RouterConst.ROUTER_FORGET_PW:
            case RouterConst.ROUTER_RESET_PW:
            case RouterConst.USER_MIRROR:
                menu = ""
                top=<Headers />
                break;
            case RouterConst.SEARCH_LIST:
                menu = <SiderSearchMenu />
                break
            default:
                menu = <SiderMenu  data={this.state.data} />
                top = <IndexHeader/>
                break
        }

        return (
            <Layout style={{ minHeight: '100%' }}>
                {top}
                <Layout className="wapper">
                    { menu ? <Sider className="sider">{menu}</Sider> : "" }
                    <Content className="wrap">
                        {React.cloneElement(this.props.children, { key: this.props.location.pathname })}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
export default  App;

