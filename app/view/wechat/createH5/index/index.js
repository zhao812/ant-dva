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
import {commitWechat} from './reducer/action'
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
            title:"",
            content: "",
            url:"",
            logoUrl:"",
            status:1,
            pictureNum: 1,
            data: [{type:"pic"},{type:"txt"}]
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
    data = this.state.data
    data.push({type:"pic"})
    this.setState({data: data});
}
handlerAddClickDw(){
    data = this.state.data
    data.push({type:"txt"})
    this.setState({data: data});
}

goNext(){
    console.log(this.state.data)
    if(!this.state.title){
         message.error('请输入消息标题');
    }else if(!this.state.content){
        message.error('请输入消息内容');
    }else if(!this.state.url){
        message.error('请输入跳转链接');
    }else if(!this.state.logoUrl){
        message.error('请输入LOGO图');
    }else{
        const {title,content,url,logoUrl,data}=this.state;
        this.props.commitWechat({title:title,content:content,url:url,logoUrl:logoUrl,data:data})
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
        getBase64(info.file.originFileObj, logoUrl => this.setState({ logoUrl }));
    }
}
handlerPic(index,msg){
    data = this.state.data
    data[index].value= msg
    this.setState({data:data})
    
}
handlerShort(index,msg){
    data = this.state.data
    data[index].value= msg
    this.setState({data:data})
    
}
render() {
    const {stepNum,title,content,url,status,imageUrl,logoUrl,data}=this.state;
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
                            logoUrl ?
                            <img src={logoUrl} alt="" className="avatar"/> :
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
                <Mobile title={title} url={url} content={content} data={data}/>
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
    url:state.wechatReducer.url,
    logoUrl:state.wechatReducer.logoUrl,
    data:state.wechatReducer.data
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ commitWechat }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Wechat)