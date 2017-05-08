import React, {PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Table, Icon,Button ,Input ,Form,Upload, message } from 'antd'
import StepNav from '../../../../components/stepNav'
import NumberInput from '../../../../components/numberInput'
import Mobile from '../../../../components/mobilePhone'
import {commitWechatNext} from './reducer/action'
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
    handlerChangeLang(e){
        this.setState({
            reLang:e.target.value
        })
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
        const {reLang,oUrl,imageUrl} = this.state;
        if(!reLang){
            message.error('请输入推荐语');
        }else if(!oUrl){
            message.error('请输入推荐图');
        }
        else if(!imageUrl){
            message.error('请输入H5链接');
        }
        this.props.commitWechatNext(this.state)
    }
    render() {
        const {stepNum,imageUrl,status, reLang, oUrl}=this.state;
        return (
          <div className="wechatnext">
                <Button type={status==1?"primary":""} >新建H5分享页面</Button>
                <Button>导入H5分享页面代码</Button>
                <StepNav stepNum={stepNum}/>
                <div className="flexs">
                    <div className="flex1">
                        <Form >
                        <FormItem
                            label="推荐语"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 16 }}
                            ><Input type="textarea" rows={4}  onChange={(e)=>this.handlerChangeLang(e)}/>
                            </FormItem>
                            
                            <FormItem
                            label="推荐图"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 16 }}
                            >
                            <Upload
                                className="avatar-uploader"
                                name="avatar"
                                showUploadList={false}
                                action="//jsonplaceholder.typicode.com/posts/"
                                beforeUpload={beforeUpload}
                                onChange={this.handleChange}
                                >
                                {
                                    imageUrl ?
                                    <img src={imageUrl} alt="" className="avatar" /> :
                                    <Icon type="plus" className="avatar-uploader-trigger" />
                                }
                                </Upload>
                            </FormItem>

                        <FormItem
                            label="H5链接"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 16 }}
                            ><Input onChange={this.handlerChangeUrl.bind(this)}/>
                            </FormItem>
                        </Form>
                        
                        <div className="method">
                            <div>
                                <span><Icon type="message"/>方式1：</span>
                                <div>
                                    <ul>
                                        <li>手机转发<span>将短信发送给自己，再转发短信给客户</span></li>
                                        <li>我的手机号：13361997280<Button>发送到我的手机</Button><Button>收不到短信？点我</Button></li>
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
                    <Mobile reLang={reLang||""} 
                             oUrl={oUrl||""} 
                             oImg={imageUrl||""}
                             title={this.props.data.title} 
                             url={this.props.data.url} 
                             content={this.props.data.content} 
                             imageUrl={this.props.data.imageUrl} 
                             essay={this.props.data.essay}/>
                </div>
                <Button type="primary" style={{marginLeft:90}} onClick={this.handlerClick.bind(this)}>保存，下一步</Button>
          </div>
        );
    }
}


Wechat.propTypes = {
    data: PropTypes.object.isRequired
}

let mapStateToProps = state => ({
    data: state.wechatReducer,
    imageUrl:state.wechatNextReducer.imageUrl,
    reLang:state.wechatNextReducer.reLang, 
    oUrl:state.wechatNextReducer.oUrl
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ commitWechatNext }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Wechat)