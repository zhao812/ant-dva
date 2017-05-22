import React, {PropTypes} from 'react'
import QRCode from 'qrcode.react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button ,Input ,Upload, Modal } from 'antd'
import { hashHistory } from 'react-router'
import StepNav from '../../../../components/stepNav'
import NumberInput from '../../../../components/numberInput'
import Mobile from '../../../../components/mobilePhone'
import {generateAd,sendMessage} from './reducer/action'
import './index.scss'

class Wechat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            oUrl:""
        }
    }
    handlerChangeUrl(e){
        this.setState({
            oUrl:e.target.value
        })
    }
    componentDidMount(){
        this.props.generateAd().then((data)=>this.setState({
          oUrl:data.url
      }))
    }

    handlerSendMobile(){
        const {mobileNo,oUrl}=this.state;
        let reg=/^1\d{10}$/;
        let msg;
        if(!mobileNo){
            msg="手机号不能为空"
        }else if(reg.test(mobileNo)==false){
            msg="手机号格式不正确"
        }
        if(msg){
            Modal.error({
                title: msg
            });
        }else{
            this.props.sendMessage({
                "phone":mobileNo,
                "url":oUrl
            })
        }
    }
    handlerChangeMobile(e){
        this.setState({
            mobileNo:e.target.value
        })
    }
    render() {
        const {stepNum,imageUrl,status, oUrl}=this.state;
        let comp=this.props.location.query.status==1?
        <Mobile title={this.props.title} url={this.props.url} content={this.props.content} data={this.props.data} logo={this.props.logo}/>:
        <Mobile iframeUrl={this.props.odata.pageUrl} fileString={this.props.odata.fileString}/>
        return (
          <div className="content-wrapper ">
              <h6>推分享</h6>
              <ul>
                  <li>
                      <span>H5链接</span>
                      <Input value={oUrl}  style={{width:358}}/>
                  </li>
                  <li>
                      <span>手机转发</span>
                      <Input  onChange={this.handlerChangeMobile.bind(this)}/>
                      <Button onClick={this.handlerSendMobile.bind(this)}  className="sendButton">发送</Button>
                  </li>
                  <li className="displayTable">
                      <span>二维码</span>
                      {
                        oUrl?
                        <div className="code"><QRCode value={oUrl}/></div>:""
                      }
                  </li>
              </ul>
          </div>
        );
    }
}


Wechat.propTypes = {
}

let mapStateToProps = state => ({
    oUrl:state.wechatNextReducer.oUrl,
    title: state.wechatReducer.title,
    url: state.wechatReducer.url,
    content: state.wechatReducer.content,
    data: state.wechatReducer.data,
    logo: state.wechatReducer.logoUrl,
    odata:state.wechatReducer,
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ generateAd ,sendMessage}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Wechat)