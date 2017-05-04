import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Headers from '../../components/header'
import SiderMenu from '../../components/siderMenu'
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import style from 'antd/dist/antd.css'
import './index.css'
import { getMenu } from './reducer/action'
import * as RouterConst from '../../static/const'

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
        this.props.getMenu().then((data) => {
            this.setState({
                data: data
            })
        })
    }

    render() {
        let menu
        console.log(this.props.location.pathname)
        switch (this.props.location.pathname) {
            case RouterConst.ROUTER_HOME:
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
                    <Sider className="sider">{menu}</Sider>
                    <Content>
                        {/*<div className="title">{this.state.title}</div>*/}
                        <div className="wrap">
                            {React.cloneElement(this.props.children, { key: this.props.location.pathname })}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}



App.propTypes = {
}

let mapStateToProps = state => ({
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getMenu }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)