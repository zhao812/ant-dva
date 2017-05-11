import React, {PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { Table, Icon,Button ,Input ,Form,Upload, message,Radio } from 'antd'
import StepNav from '../../../../components/stepNav'
import NumberInput from '../../../../components/numberInput'
import Mobile from '../../../../components/mobilePhone'
import {commitImport} from './reducer/action'
import './index.scss'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const props={
    action: '//jsonplaceholder.typicode.com/posts/',
    onChange({ file, fileList }) {
        if (file.status !== 'uploading') {
            if(fileList.length>1){
             name=fileList[fileList.length-1]
            }else{
                name=fileList[0]
            }
            return name
        }
    },
}
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

class ImpWechat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stepNum:2,
            status:2,
            value:1
        }
    }
    handlerChangeFile(file,fileList){
        if (file.status !== 'uploading'&&fileList.file.type=='text/html') {
             fileList= fileList.fileList
             if(fileList.length>1){
                 fileList=fileList[fileList.length-1]
             }else{
                 fileList=fileList[0]
             }
                this.setState({
                    fileName:fileList.name,
                    file:fileList
                })
             let _this=this;
             var reader = new FileReader();
             reader.readAsText(fileList.originFileObj, "UTF-8");
             reader.onload = function(evt){ 
                let fileString = evt.target.result; 
               // console.log(fileString)
                _this.setState({
                    fileString:fileString
                })
            }
            
            
        }

    }
    handlerClick(){
        const {value,fileName,pageUrl,code,fileString} = this.state;
        if(value==1&&!fileName){
            message.error('请上传H5代码文件包');
        }else if(value==2&&!pageUrl){
            message.error('请填写H5页面URL');
        }else{
            this.props.commitImport({fileString:fileString,pageUrl:pageUrl})
            hashHistory.push({
                pathname:'wechartNext',
                query:{
                    status:this.state.status
                }
            })
        }
    }
    onChange(e){
        this.setState({
            value: e.target.value,
            fileName:"",
            pageUrl:"",
            file:"",
            fileString:""

        });
    }
    handlerChangePageUrl(e){
        this.setState({
            pageUrl:e.target.value
        })
    }
    
    handlerWechart(){
            hashHistory.push("/wechart")
    }
    render() {
        const {stepNum,status,fileName,pageUrl,value,fileString}=this.state;
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return (
          <div className="wechatnext">
                <Button type={status==1?"primary":""}  onClick={this.handlerWechart.bind(this)}>新建H5分享页面</Button>
                <Button type={status==2?"primary":""} > 导入H5分享页面代码</Button>
                <StepNav stepNum={stepNum}/>
                <div className="flexs">
                    <div className="flex1">
                        <RadioGroup onChange={this.onChange.bind(this)} value={this.state.value}>
                            <Radio style={radioStyle} value={1}>上传H5代码文件包
                              <Upload readOnly={value==1?false:true}  action= '//jsonplaceholder.typicode.com/posts/' onChange={this.handlerChangeFile.bind(this,['file','fileList'])}>
                                 <Input value={fileName} /><Button>上传</Button>
                              </Upload>
                            </Radio>
                            <Radio style={radioStyle} value={2}>已有h5页面, 填写url
                                <Input onChange={this.handlerChangePageUrl.bind(this)} value={pageUrl} readOnly={value==2?false:true}/>
                            </Radio>
                        </RadioGroup>
                       
                    </div>
                    <Mobile iframeUrl={pageUrl} fileString={fileString}/>
                </div>
                <Button type="primary" style={{marginLeft:90}} onClick={this.handlerClick.bind(this)}>保存，下一步</Button>
          </div>
        );
    }
}


ImpWechat.propTypes = {
}

let mapStateToProps = state => ({ 
    fileString:state.importChart.fileString,
    pageUrl:state.importChart.pageUrl,
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({  commitImport }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ImpWechat)