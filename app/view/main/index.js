import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Headers from '../../components/header'
import IndexHeader from '../../components/indexHeader'
import SiderMenu from '../../components/siderMenu'
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import './index.scss'

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
            this.setState({
                    data: menuData.data
                })
    }
    handlerCurrent(e){
        console.log(e)
    }
    render() {
        let curr=this.props.location.query.current;
        let menu;
        let top;
        let oClass;
        switch (this.props.location.pathname) {
            case RouterConst.ROUTER_HOME:
            case RouterConst.ROUTER_LOGIN:
            case RouterConst.ROUTER_REGISTER:
            case RouterConst.ROUTER_FORGET_PW:
            case RouterConst.ROUTER_RESET_PW:
            case RouterConst.USER_MIRROR:
                menu = ""
                top=<Headers />
                oClass=""
                break;
            case RouterConst.SEARCH_LIST:
                menu = <SiderSearchMenu />
                oClass=""
                break
            default:
                menu = <SiderMenu  data={this.state.data} oCurrent={curr} />
                top = <IndexHeader/>
                oClass="oBg"
                break
        }

        return (
           <div className={oClass}>
                <Layout style={{ minHeight: '100%' }}>
                    {top}
                        <Layout className="wapper">
                            { menu ? <Sider className="sider">{menu}</Sider> : "" }
                            <Content className={oClass?"oBg wrap":"wrap"}>
                                {React.cloneElement(this.props.children, { key: this.props.location.pathname })}
                            </Content>
                        </Layout>
                </Layout>
            </div>
        );
    }
}
export default  App;

