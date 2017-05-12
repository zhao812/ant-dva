import React, {PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { Table, Icon,Button ,Input ,Form,Upload, message,Radio } from 'antd'
import StepNav from '../../../../components/stepNav'
import NumberInput from '../../../../components/numberInput'
import Mobile from '../../../../components/mobilePhone'
import {commitImport,setFileString,setUrl} from './reducer/action'
import './index.scss'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class ImpWechat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stepNum:2,
            status:2,
            value:1
        }
    }
    handlerClick(){
        const {value,name,code,file} = this.state;
        if(value==1&&!name){
            message.error('请上传H5代码文件包');
        }else if(value==1&&name){
            this.props.commitImport({name:this.props.fileString})
            hashHistory.push({
                pathname:'wechartNext',
                query:{
                    status:this.state.status
                }
            })
        }
        else if(value==2&&!this.props.pageUrl){
            message.error('请填写H5页面URL');
        }else if(value==2&&this.props.pageUrl){
            this.props.commitImport({pageUrl:this.props.pageUrl})
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
            name:"",

        });
    }
    handlerChangePageUrl(e){
        this.props.setUrl(e.target.value)
    }
    
    handlerWechart(){
            hashHistory.push("/wechart")
    }
    render() {
        const {stepNum,status,name,pageUrl,value,fileString}=this.state;
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
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
        return (
          <div className="wechatnext">
                <Button type={status==1?"primary":""}  onClick={this.handlerWechart.bind(this)}>新建H5分享页面</Button>
                <Button type={status==2?"primary":""} > 导入H5分享页面代码</Button>
                <StepNav stepNum={stepNum}/>
                <div className="flexs">
                    <div className="flex1">
                        <RadioGroup onChange={this.onChange.bind(this)} value={this.state.value}>
                            <Radio style={radioStyle} value={1}>上传H5代码文件包
                              <Upload readOnly={value==1?false:true}  {...props}>
                                 <Input value={name} /><Button>上传</Button>
                              </Upload>
                            </Radio>
                            <Radio style={radioStyle} value={2}>已有h5页面, 填写url
                                <Input onChange={this.handlerChangePageUrl.bind(this)} readOnly={value==2?false:true}/>
                            </Radio>
                        </RadioGroup>
                       
                    </div>
                    <Mobile iframeUrl={pageUrl} />
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
    return bindActionCreators({  commitImport,setFileString ,setUrl}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ImpWechat)