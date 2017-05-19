import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Table, Icon,Button ,Menu, Dropdown  } from 'antd';
import './index.scss'

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">个推</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">极光推送</a>
    </Menu.Item>
  </Menu>
);

class setUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            data: ""
        }
    }

   
    componentDidMount() {
     
    }

    render() {
        return (
            <div className="content-wrapper"></div>
          <div className="setUp">
              <h3 className="title"><Icon type="apple" />IOS推送配置</h3>
              <div className="content">
                  <h6>申请使用苹果官方推送服务APNS，将获得的推送服务证书配置在下方</h6>
                  <ul>
                    <li>
                        <span>IOS测试证书</span>
                        <span>请使用p12格式证书</span>
                        <Button>更新</Button>
                        <i className="anticon anticon-exclamation-circle"></i>
                    </li>
                    
                    <li>
                        <span>IOS生产证书</span>
                        <span>请使用p12格式证书</span>
                        <Button>更新</Button>
                        <i className="anticon anticon-exclamation-circle"></i>
                    </li>
                  </ul>
              </div>




               <h3 className="title"><Icon type="android" />Android推送配置</h3>
                <div className="content">
                    <h6>除了提供内建的TD推送外，qbao画像，还支持使用第三方推送平台发送消息，只需简单配置</h6>
                    <ul>
                      <li>
                          <span>推送平台</span>
                          <div>
                            <Dropdown overlay={menu}>
                                <span className="ant-dropdown-link" href="#">选择推送通道 <Icon type="down" /> </span>
                            </Dropdown>
                          </div>
                      </li>
                      <li>
                          <Button icon="plus" className="new">新的推送配置</Button>
                      </li>
                    </ul>
                </div>
          </div>
        );
    }
}


setUp.propTypes = {
}

let mapStateToProps = state => ({
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(setUp)