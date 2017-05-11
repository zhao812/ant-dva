import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Input, Button } from 'antd'
import HomeBanner from './homeBanner'
import HomeTab from './homeTab'
import CopyRights from './copyRight'

import { getUserNumber } from './reducer/action';

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
                <HomeTab />
                <div className="email-container">
                    <p>立刻体验，即可享受个性化服务套餐</p>
                    <div className="input-container">
                        <Input className="email-input" placeholder="请输入您的电子邮箱" />
                        <Button className="email-btn">立即体验</Button>
                    </div>
                    <div className="div-bg"></div>
                </div>
                <CopyRights />
            </div>
        );
    }
}
Index.PropTypes = {
    number: PropTypes.number.isRequired
}

let mapStateToProps = state => ({
    number: state.homeReducer.number
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUserNumber }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)