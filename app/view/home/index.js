import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Input, Button } from 'antd'
import HomeBanner from './homeBanner'
import HomeTab from './homeTab'
import CopyRights from '../../components/copyRight'

import { getUserNumber } from './reducer/action';
import * as RouterConst from '../../static/const'

import './index.scss';

class Index extends React.Component {

    constructor(props, context) {
        super(props, context)
    }

    componentDidMount() {
        this.props.getUserNumber()
    }

    render() {
        return (
            <div className="dataPlatform">
                <HomeBanner data={this.props.number}/>
                <HomeTab data={this.props.tabList} />
                <div className="email-container">
                    {
                        !this.props.isLogin ?
                            <div>
                                <p>立刻体验，即可享受个性化服务套餐</p>
                                <div className="input-container">
                                    <Input className="email-input" placeholder="请输入您的电子邮箱" />
                                    <Button className="email-btn"><Link to={RouterConst.ROUTER_LOGIN}>立即体验</Link></Button>
                                </div>
                            </div>
                        : ""
                    }
                    <div className="div-bg"></div>
                </div>
                <CopyRights />
            </div>
        );
    }
}
Index.PropTypes = {
    tabList: PropTypes.array.isRequired,
    number: PropTypes.number.isRequired,
    isLogin: PropTypes.bool.isRequired
}

let mapStateToProps = state => ({
    tabList: state.homeReducer.tabList,
    number: state.homeReducer.number,
    isLogin: state.loginReducer.isLogin
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUserNumber }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)