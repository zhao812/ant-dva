import React,{PropTypes} from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { Table, Icon,Button ,Input ,Form,Upload, message } from 'antd'
import StepNav from '../../../../components/stepNav'
import NumberInput from '../../../../components/numberInput'
import Mobile from '../../../../components/mobilePhone'
import Pic from '../../../../components/pic'
import DW from '../../../../components/shortEssay'
import {commitWechat,changeTitle,changeContent,changeUrl,changeLogo,changePic,changeTxt,addPic,addTxt} from './reducer/action'
import './index.scss'
const FormItem = Form.Item;

let data=[];
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
return  isLt2M;
}
class Wechat extends React.Component {
    constructor(props) {
    super(props)
    this.state = {
            stepNum:2,
            status:1,
            data: [{type:"pic"},{type:"txt"}]
        }
    }


handlerChangeTitle(msg){
    this.props.changeTitle(msg)
}
handlerChangeContent(msg){
    this.props.changeContent(msg)
}
handlerChangeUrl(msg){
    this.props.changeUrl(msg.currentTarget.value)
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
    this.props.addPic({type:"pic"})
}
handlerAddClickDw(){
    this.props.addTxt({type:"txt"})
}

goNext(){
    
    const {title,content,linkurl,logoUrl,data}=this.props;
    if(!title){
         message.error('请输入消息标题');
    }else if(!content){
        message.error('请输入消息内容');
    }else if(!linkurl){
        message.error('请输入跳转链接');
    }else if(!logoUrl){
        message.error('请输入LOGO图');
    }else{
        this.props.commitWechat({title:title,content:content,linkurl:linkurl,logoUrl:logoUrl,data:data})
            hashHistory.push({
                pathname:'wechartNext',
                query:{
                    status:this.state.status
                }
            })
    }
}
handlerImport(){
    hashHistory.push("/importChart")
}
handleChangeLogo = (info) => {
    if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, logoUrl => this.props.changeLogo(logoUrl));
    }
}
handlerPic(index,msg){
    this.props.changePic(index,msg)
    
}
handlerShort(index,msg){
    this.props.changeTxt(msg,index)
    
}
render() {
    const {stepNum,status}=this.state;
    const {title,content,linkurl,logoUrl,data}=this.props;
    let components = data.map((data, index)=>{
        if(data.type == "pic"){
            return <Pic key={index} pic={(value)=>this.handlerPic(index, value)} />
        }else if(data.type == "txt"){
            return <DW key={index} short={(value)=>this.handlerShort(index, value)} />
        }
    })
    return (
    <div className="wechat">
        <Button type={status==1?"primary":""}>新建H5分享页面</Button>
        <Button onClick={this.handlerImport.bind(this)}>导入H5分享页面代码</Button>
        <StepNav stepNum={stepNum}/>
            <Button type="primary" icon="plus" onClick={this.handlerAddClickPic.bind(this)}>图片</Button>
            <Button type="primary" icon="plus" onClick={this.handlerAddClickDw.bind(this)}>文字</Button>
            <div className="flexs">
                <Form>
                    <FormItem
                            label="消息标题"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 16 }}
                    >
                        <NumberInput number={50} isOne={1} nInputValue={this.handlerChangeTitle.bind(this)}/>
                    </FormItem>
                    <FormItem
                            label="消息内容"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 16 }}
                    >
                        <NumberInput number={240} isOne={6} nInputValue={this.handlerChangeContent.bind(this)}/>
                    </FormItem>

                    <FormItem
                            label="跳转连接" labelCol={{ span: 4 }}
                            wrapperCol={{ span:16 }}
                    >
                        <Input onChange={(e)=>this.handlerChangeUrl(e)} />
                    </FormItem>

                     <FormItem
                            label="logo图" labelCol={{ span: 4 }}
                            wrapperCol={{ span: 16 }}
                    >
                        <Upload className="avatar-uploader"
                                name="avatar"
                                showUploadList={false}
                                action="//jsonplaceholder.typicode.com/posts/"
                                beforeUpload={beforeUpload}
                                onChange={this.handleChangeLogo}>
                            {
                            this.props.logoUrl ?
                            <img src={this.props.logoUrl} alt="" className="avatar"/> :
                            <Icon type="plus" className="avatar-uploader-trigger"/>
                            }
                        </Upload>
                    </FormItem>

                    {components}
                    <FormItem
                            wrapperCol={{ span: 8, offset: 4 }}
                    >
                        <Button type="primary" htmlType="submit" onClick={this.goNext.bind(this)}>
                            保存,下一步
                        </Button>
                    </FormItem>
                </Form>
                
                <Mobile title={title} 
                        url={linkurl} 
                        content={content} 
                        data={data}
                        logo={logoUrl}/>
            </div>
    </div>
    );
    }
}


Wechat.propTypes = {
}

let mapStateToProps = state => ({
    title:state.wechatReducer.title,
    content:state.wechatReducer.content,
    linkurl:state.wechatReducer.linkurl,
    logoUrl:state.wechatReducer.logoUrl,
    data:state.wechatReducer.data
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ commitWechat,changeTitle,changeContent,changeUrl,changeLogo,changePic ,changeTxt,addPic,addTxt}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Wechat)