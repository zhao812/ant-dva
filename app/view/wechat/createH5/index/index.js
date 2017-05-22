import React,{PropTypes} from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import {Select, Icon,Button ,Input ,Upload ,Tabs ,Modal,Radio} from 'antd'
import StepNav from '../../../../components/stepNav'
import NumberInput from '../../../../components/numberInput'
import Mobile from '../../../../components/mobilePhone'
import Pic from '../../../../components/pic'
import {
    getUserList,
    changeName,
    changePeople,
    changeTitle,
    changeContent,
    changeLogo,
    changeUrl,
    changePic,
    changeTxt,
    commitWechat,
    addPic,
    oDelete,
    setFileString,
    setUrl,
    removeData
} from './reducer/action'
import './index.scss'
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
let data=[];
function getBase64(img, callback) {
const reader = new FileReader();
reader.addEventListener('load', () => callback(reader.result));
reader.readAsDataURL(img);
}

function beforeUpload(file) {
const isJPG = file.type === 'image/jpeg';
if (!isJPG) {
        Modal.error({title: "只能输入JPG图片"});
return false;
}
const isLt2M = file.size / 1024 / 1024 /1024*300 < 300;
if (!isLt2M) {
        Modal.error({title: "图片不能大于300k"});
return false;
}
return  isLt2M;
}
class Wechat extends React.Component {
    constructor(props) {
    super(props)
    this.state = {
            value:1,
            ishow:0,
            tabs:1
        }
    }
handlerChangeName(msg){
    this.props.changeName(msg)
}
handlerChangePeople(msg){
    this.props.changePeople(msg)
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
    this.props.addPic()
}

goNext(){
    
    console.log(this.state,1393939949404)
    const {name,userSelectGroupId,title,content,linkurl,logoUrl,data}=this.props;
    let msg;
    if(!name){
        msg="活动标题不能为空"
    }else if(!userSelectGroupId){
        msg="推送人群不能为空"
    }else if(!title){
        msg="消息标题不能为空"
    }else if(!content){
        msg="消息内容不能为空"
    }else if(!logoUrl){
        msg="标题图不能为空"
    }else if(!linkurl){
        msg="跳转链接不能为空"
    }else{
        data.map((item,key)=>{
                    if(!item.pic){
                        msg="请上传图片"
                    }else if(!item.txt){
                        msg="请填写短文"
                    }
                })
    }
        
    if(msg){
        Modal.error({
            title: msg
        });
    }
    else{
        this.props.commitWechat({
            name:name,
            userSelectGroupId:userSelectGroupId,
            title:title,
            content:content,
            logoUrl:logoUrl,
            link:linkurl,
            shortContent:data,
            type:2
        }).then(()=> 
             hashHistory.push({
                pathname:'wechartNext',
            })
        )
           
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

handlerTxt(index,msg){
    this.props.changeTxt(msg,index)
}

handlerDelete(index){
    this.props.oDelete(index)
}
handleChangeRadio(e){
    console.log(e.target.value)
        this.setState({
            value: e.target.value,
            name:""

        });
        this.props.setFileString("")
        this.props.setUrl("")
}
handlerChangePageUrl(e){
        this.props.setUrl(e.target.value)
    }
componentDidMount(){
    this.props.getUserList().then(data=>{this.setState({
        Population:data
      })
    })
    this.props.changeName("")
    this.props.changePeople("")
    this.props.changeTitle("")
    this.props.changeContent("")
    this.props.changeLogo("")
    this.props.changeUrl("")
    this.props.removeData("")
    // this.props.changePic("")
    // this.props.changeTxt("")
  }
  handlerts(msg){
      this.setState({
          ishow:1
      })
  }
  
  handlerClick(msg){
    this.setState({
      ishow:msg
    })
  }
  handlerTab(e){
      this.setState({
          tabs:e
      })
  }
render() {
    
    const {Population,ishow,tabs,stepNum,status,value,name} = this.state;
    const {title,content,linkurl,logoUrl,data,pageUrl,fileString}=this.props;
    const children = [];
    Population&&Population.map((item,index)=> {
        children.push(<Option key={item.id}>{item.name}[{item.createTime}]{item.num}人</Option>);
    });
    let components = data.map((data, index)=>{
            return <Pic key={index} 
            pic={(value)=>this.handlerPic(index, value)} 
            txt={(value)=>this.handlerTxt(index, value)}
            del={(value)=>this.handlerDelete(index, value)}/>
    })

    const props = {
            name: 'file',
            action: '//jsonplaceholder.typicode.com/posts/',
            headers: {
                authorization: 'authorization-text',
            },
            onChange: (info) =>{
                if (info.file.type=="application/x-zip-compressed"&&info.file.status !== 'uploading') {
                    this.setState({
                        name:info.file.name,
                    })
                    this.props.setFileString(info.file)
                }
            }
         };
     const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
    return (
    <div className="wechat">
         <Tabs type="card" onChange={this.handlerTab.bind(this)}>
            <TabPane tab="新建H5页面" key="1">
                <div className="content">
                    <ul>
                        <li>
                            <span>活动标题</span>
                            <NumberInput number={20} isOne={1} nInputValue={this.handlerChangeName.bind(this)}/>
                        </li>
                        <li>
                            <span>推送人群</span>
                            <Select  className="sel" onChange={this.handlerChangePeople.bind(this)}>
                                {children}
                            </Select>
                        </li>
                        <li>
                            <span>消息标题</span>
                            <NumberInput number={50} isOne={1} nInputValue={this.handlerChangeTitle.bind(this)}/>
                        </li>
                        <li className="messageContent">
                            <span>消息内容</span>
                             <NumberInput number={240} isOne={6} nInputValue={this.handlerChangeContent.bind(this)}/>
                        </li>
                        <li>
                            <span>标题图</span>
                            <Upload className="avatar-uploader logoUpload"
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
                        </li>
                        
                        <li>
                            <span>跳转链接</span>
                            <Input onChange={(e)=>this.handlerChangeUrl(e)} />
                        </li>
                         {components}
                        <li>
                            <span></span>
                            <Button className="blueBtn"  onClick={this.handlerAddClickPic.bind(this)}>添加页面</Button>
                        </li>
                    </ul>
                </div>
                <div className="textCenter">
                        <Button className="ts" onClick={this.handlerts.bind(this)}>推送预览</Button>
                        <Button className="send"  onClick={this.goNext.bind(this)}>确认发送</Button>
                 </div>
            </TabPane>
            <TabPane tab="导入已有H5页面" key="2">
                <div className="content contentImport">
                        <RadioGroup value={this.state.value}  onChange={this.handleChangeRadio.bind(this)}>
                            <Radio style={radioStyle} value={1}>上传H5代码文件包
                              <Upload   {...props}>
                                 <Input value={name}  className="sendInput"/><Button className="sendButton" disabled={value==1?false:true}>上传</Button>
                              </Upload>
                            </Radio>
                            <Radio style={radioStyle} value={2}>上传H5代码文件包
                                <Input value={pageUrl} onChange={this.handlerChangePageUrl.bind(this)} readOnly={value==2?false:true} />
                            </Radio>
                        </RadioGroup>
               </div>
                        
                <div className="textCenter">
                        <Button className="ts"  onClick={this.handlerts.bind(this)}>推送预览</Button>
                        <Button className="send" >确认发送</Button>
                 </div>
            </TabPane>
        </Tabs>
        {tabs==1&&ishow!=0?<Mobile oClose={this.handlerClick.bind(this)}  data={data} />:""}
        
        {tabs==2&&ishow!=0?<Mobile oClose={this.handlerClick.bind(this)}  fileString={fileString} iframeUrl={pageUrl} />:""}
    </div>
    );
    }
}


Wechat.propTypes = {
}

let mapStateToProps = state => ({
    name:state.wechatReducer.name,
    userSelectGroupId:state.wechatReducer.userSelectGroupId,
    title:state.wechatReducer.title,
    content:state.wechatReducer.content,
    linkurl:state.wechatReducer.linkurl,
    logoUrl:state.wechatReducer.logoUrl,
    data:state.wechatReducer.data,
    fileString:state.wechatReducer.fileString,
    pageUrl:state.wechatReducer.pageUrl
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getUserList, 
        changeName,
        changePeople,
        commitWechat,
        changeTitle,
        changeContent,
        changeUrl,
        changeLogo,
        changePic ,
        changeTxt,
        addPic,
        oDelete,
        setFileString,
        setUrl,
        removeData
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Wechat)