import React, {PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Table, Icon,Button ,Input ,Form,Upload, message } from 'antd'
import { hashHistory } from 'react-router'
import StepNav from '../../../../components/stepNav'
import NumberInput from '../../../../components/numberInput'
import Mobile from '../../../../components/mobilePhone'
import {commitWechatNext,generateAd,getMessage} from './reducer/action'
import './index.scss'
const FormItem = Form.Item;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('只能输入JPG图片');
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片不能大于2M');
    return false;
  }
  //return isJPG && isLt2M;
  return  isLt2M;
}
class Wechat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stepNum:3,
            status:1,
            reLang:"",
            oUrl:""
        }
    }
   
    handlerChangeUrl(e){
        this.setState({
            oUrl:e.target.value
        })
    }
    handleChange = (info) => {
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
        }
    }
    handlerClick(){
        const {oUrl} = this.state;
        if(!oUrl){
            message.error('请先生成H5链接');
        }
        this.props.commitWechatNext({url:oUrl})
    }
    handlerWechart(){
            hashHistory.push("/wechart")
    }
    handlerImport(){
            hashHistory.push("/importChart")
    }
    handlerGenerateAd(){
      this.props.generateAd().then((data)=>this.setState({
          oUrl:data.url
      }))
        
    }
    handlergetMessage(){
        const {mobileNo}=this.state;
        let reg=/^1\d{10}$/;
        mobileNo&&reg.test(mobileNo)==true&&this.props.getMessage(mobileNo);
    }
    handlerChangeMobile(e){
        this.setState({
            mobileNo:e.target.value
        })
    }
    render() {
        const {stepNum,imageUrl,status, oUrl}=this.state;
        let comp=this.props.location.query.status==1?
        <Mobile title={this.props.title} url={this.props.url} content={this.props.content} data={this.props.data}/>:
        <Mobile iframeUrl={this.props.odata.pageUrl} fileString={this.props.odata.fileString}/>
        return (
          <div className="wechatnext">
                <Button type={this.props.location.query.status==1?"primary":""} onClick={this.handlerWechart.bind(this)}>新建H5分享页面</Button>
                <Button  type={this.props.location.query.status==2?"primary":""} onClick={this.handlerImport.bind(this)}>导入H5分享页面代码</Button>
                <StepNav stepNum={stepNum}/>
                <div className="flexs">
                    <div className="flex1">
                        <Form  style={{textAlign:'center'}}>
                        <Button style={{marginBottom:20}} onClick={this.handlerGenerateAd.bind(this)}>生成推广连接</Button>
                        <FormItem
                            label="H5链接"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 16 }}
                            ><Input value={oUrl} readOnly/>
                            </FormItem>
                        </Form>
                        
                        <div className="method">
                            <div>
                                <span><Icon type="message"/>方式1：</span>
                                <div>
                                    <ul>
                                        <li>手机转发<span>将短信发送给自己，再转发短信给客户</span></li>
                                        <li>我的手机号：<Input style={{width:100}} onChange={this.handlerChangeMobile.bind(this)}/><Button onClick={this.handlergetMessage.bind(this)}>发送到我的手机</Button><Button>收不到短信？点我</Button></li>
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <span><Icon type="dingding"/>方式2：</span>
                                <div>
                                    <ul >
                                        <li>
                                            微信转发
                                            </li>
                                        <li className="oflex">
                                            <div className="code"></div>
                                            <div>
                                                <div>1.使用微信扫一扫</div>
                                                <div>2.转发给客户，或分享到朋友圈</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    {comp}
                 </div>
                <Button type="primary" style={{marginLeft:90}} onClick={this.handlerClick.bind(this)}>保存</Button>
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
    odata:state.importChart
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ commitWechatNext,generateAd ,getMessage}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Wechat)