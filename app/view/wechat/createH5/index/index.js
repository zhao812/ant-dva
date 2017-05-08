import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Table, Icon,Button ,Input ,Form,Upload, message } from 'antd'
import StepNav from '../../../../components/stepNav'
import NumberInput from '../../../../components/numberInput'
import Mobile from '../../../../components/mobilePhone'
import {commitWechat} from './reducer/action'
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
            stepNum:2,
            title:"",
            content:"",
            url:"",
            essay:"",
            status:1
        }
    }

    handleChange = (info) => {
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
      }
    }
    handlerChangeTitle(msg){
        this.setState({
            title:msg
        })
    }
    handlerChangeContent(msg){
        this.setState({
            content:msg
        })
    }
    handlerChangeUrl(e){
        this.setState({
            url:e.target.value
        })
    }
    handlerchangeEssay(e){
        this.setState({
            essay:e.target.value
        })
    }
    handlerLinkUrl(){
        window.open(this.state.url)
    }
    handlerAddClickLj(){
        this.setState({
            isShowLj:true
        })
    }
    handlerAddClickPic(){
        this.setState({
            isShowPic:true
        })
    }
    handlerAddClickDw(){
        this.setState({
            isShowDw:true
        })
    }
    
    goNext(){
        if(!this.state.title){
            message.error('请输入消息标题');
        }else if(!this.state.content){
            message.error('请输入消息内容');
        }else{
            this.props.commitWechat(this.state)
            window.location.href="./#/wechartNext"
        }
    }

    render() {
        const {stepNum,title,content,url,essay,status,imageUrl}=this.state;
        return (
          <div className="wechat">
                <Button type={status==1?"primary":""} >新建H5分享页面</Button>
                <Button>导入H5分享页面代码</Button>
                <StepNav stepNum={stepNum}/>
                    <Button type="primary" icon="plus" onClick={this.handlerAddClickLj.bind(this)}>跳转链接</Button>
                    <Button type="primary" icon="plus" onClick={this.handlerAddClickPic.bind(this)} >图片</Button>
                    <Button type="primary" icon="plus" onClick={this.handlerAddClickDw.bind(this)}>短文</Button>
                <div className="flexs">
                    <Form >
                        <FormItem
                            label="消息标题"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 16 }}
                            >
                                <NumberInput number={50} isOne={1}  nInputValue={this.handlerChangeTitle.bind(this)}/>
                            </FormItem>
                            
                        <FormItem
                            label="消息内容"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 16 }}
                            >
                                <NumberInput number={240} isOne={6}  nInputValue={this.handlerChangeContent.bind(this)}/>
                            </FormItem>
                            
                            <FormItem className={this.state.isShowLj==true?"showTure":"showFalse"}
                            label="跳转连接" labelCol={{ span: 4 }}
                            wrapperCol={{ span:16 }}
                            >
                                <Input onChange={(e)=>this.handlerChangeUrl(e)} />
                            </FormItem>

                            <FormItem className={this.state.isShowPic==true?"showTure":"showFalse"}
                            label="图片" labelCol={{ span: 4 }}
                            wrapperCol={{ span: 16 }}
                            >
                                <Upload
                                className="avatar-uploader"
                                name="avatar"
                                showUploadList={false}
                                action="//jsonplaceholder.typicode.com/posts/"
                                beforeUpload={beforeUpload}
                                onChange={this.handleChange} >
                                {
                                    imageUrl ?
                                    <img src={imageUrl} alt="" className="avatar" /> :
                                    <Icon type="plus" className="avatar-uploader-trigger" />
                                }
                                </Upload>
                            </FormItem>
                            

                            <FormItem  className={this.state.isShowDw==true?"showTure":"showFalse"}
                            label="短文" labelCol={{ span: 4 }}
                            wrapperCol={{ span: 16 }}
                            >
                            <Input type="textarea" rows={4}  onChange={(e)=>this.handlerchangeEssay(e)}/>
                            </FormItem>
                            <FormItem
                                wrapperCol={{ span: 8, offset: 4 }}
                                >
                                <Button type="primary" htmlType="submit" onClick={this.goNext.bind(this)}>
                                    保存,下一步
                                </Button>
                            </FormItem>
                    </Form>
                    <Mobile title={title} url={url} content={content} imageUrl={imageUrl} essay={essay}/>
                </div>
          </div>
        );
    }
}


Wechat.propTypes = {
}

let mapStateToProps = state => ({
    title:state.wechatReducer.title,
    url:state.wechatReducer.url,
    content:state.wechatReducer.content,
    imageUrl:state.wechatReducer.imageUrl,
    essay:state.wechatReducer.essay,
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ commitWechat }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Wechat)