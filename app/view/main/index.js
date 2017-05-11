import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Headers from '../../components/header'
import SiderMenu from '../../components/siderMenu'
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import 'antd/dist/antd.css'
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

    changeTitle(name) {
        this.setState({ title: name })
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
        switch (this.props.location.pathname) {
            case RouterConst.ROUTER_HOME:
            case RouterConst.ROUTER_LOGIN:
            case RouterConst.ROUTER_REGISTER:
            case RouterConst.ROUTER_FORGET_PW:
            case RouterConst.ROUTER_RESET_PW:
            case RouterConst.USER_MIRROR:
                menu = ""
                break;
            case RouterConst.SEARCH_LIST:
                menu = <SiderSearchMenu />
                break
            default:
                menu = <SiderMenu changeTitle={this.changeTitle.bind(this)} data={this.state.data} />
                break
        }

        return (
            <Layout style={{ minHeight: '100%' }}>
                <Headers />
                <Layout>
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


// App.propTypes = {
// }

// let mapStateToProps = state => ({
// })

// let mapDispatchToProps = (dispatch) => {
//     //return bindActionCreators({ getMenu }, dispatch)
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App)