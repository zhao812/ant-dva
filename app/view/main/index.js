import React from 'react'
import Headers from '../../components/header'
import SiderMenu from '../../components/siderMenu'
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import style from 'antd/dist/antd.css'
import './index.css'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {title: ""}
    }
    
    changeTitle(name){
        this.setState({title: name})
    }

    componentWillMount(){
    }

    componentWillUpdate(){
    }
    
    render(){
        return (
            <Layout style={{ height: '100%' }}>
                <Headers />
                <Layout>
                    <Sider className="sider"><SiderMenu changeTitle={this.changeTitle.bind(this)} /></Sider>
                   <Content>
                        <div className="title">{this.state.title}</div>
                        <div className="wrap">
                             { React.cloneElement(this.props.children, { key: this.props.location.pathname }) }
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default App