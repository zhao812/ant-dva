import React from 'react'
import { Form, Select, Input, Button,Radio ,Icon,message,DatePicker,Checkbox} from 'antd';
import './index.scss' 
import {sheng,shi,qu} from '../../../static/const/city'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
let isShow=false;
class StepOne extends React.Component{
    constructor(props) {
        super(props);
         this.state = {
            activename:"",
            platform:"folder",
            value:1,
            display:isShow
        }
    }
    onChange = (e) => {
        let radiocheck=e.target.value;
        isShow=radiocheck==2?true:false;
        this.setState({
            value: e.target.value,
            display:isShow
        });
    }
    changeActivename(e){
        this.setState({
            activename:e.target.value
        })
    }
    
    handlerClick(e){
        this.setState({
            platform:e.currentTarget.getAttribute('value')
        })
    }
    componentDidMount(){
        
    }
    handlerD(){
            let c=[]
            //console.log(sheng,12294488585,shi,qu)
            sheng.data.map((item,key)=> { 
                c[key]={"name":item.name,"code":item.code,"children":[]}
            
                shi.data.map((item2,key2)=>{
                        if(item2.code.substr(0,3)==item.code.substring(0,3)){
                            c[key].children[key2]={"name":item2.name,"code":item2.code,"children":[]}
                            qu.data.map((item3,key3)=>{
                                if(item3.code.substr(0,4)==item2.code.substr(0,4)){
                                    c[key].children[key2].children.push({"name":item3.name,"code":item3.code})
                                }
                            })
                        }
                    })

            }); 
    }
    nextStep(e){
        const {platform,activename,value,display}=this.state;
        if(!activename){
            message.info('活动名称不能为空')
        }else{
            this.props.goStep(2,this.state)
        }
    }
    render(){
        const {platform,activename,value,display}=this.state;
        return (
           <div className="steps_one">

               <FormItem
                    label="活动名称"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 8 }}
                    >
                    
                        <Input onChange={(e)=>this.changeActivename(e)} />
                    </FormItem>
                    <FormItem
                    label="目标平台"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    >
                        <div className="radios">
                             <span value="folder" onClick={(e)=>this.handlerClick(e)}  className={platform=='folder'?'active':''}><Icon type="folder" />短信</span>,
                             <span value="dingding" onClick={(e)=>this.handlerClick(e)}  className={platform=='dingding'?'active':''}><Icon type="dingding" />微信</span>
                        </div>
                    </FormItem>
                    
                  <FormItem
                        label="目标用户"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                        >
                            <RadioGroup  onChange={this.onChange} value={value}>
                                <div className={value==1?"active custRadio":" custRadio"}>
                                    <Radio value={1}>所有用户</Radio>
                                </div>
                                <div className={value==2?"active custRadio":" custRadio"}>
                                    <Radio value={2}>精准群体 <i>向所有App用户推送消息</i></Radio> 
                                </div>
                                <div  className={display==true?"active content":" content"}>
                                    <ul>
                                        <li>
                                            <span>沉默用户人群【2017-3-4筛选】</span>
                                            <span>333333人</span>
                                        </li>
                                        <li>
                                            <span>沉默用户人群【2017-3-4筛选】</span>
                                            <span>333333人</span>
                                        </li>
                                        <li>
                                            <span>沉默用户人群【2017-3-4筛选】</span>
                                            <span>333333人</span>
                                        </li>
                                        <li>
                                            <span>沉默用户人群【2017-3-4筛选】</span>
                                            <span>333333人</span>
                                        </li>
                                        <li>
                                            <span>沉默用户人群【2017-3-4筛选】</span>
                                            <span>333333人</span>
                                        </li>
                                        <li>
                                            <span>沉默用户人群【2017-3-4筛选】</span>
                                            <span>333333人</span>
                                        </li>
                                    </ul>
                                </div>
                            </RadioGroup>
                        </FormItem>
           
                <FormItem
                wrapperCol={{ span: 8, offset: 4 }}
                >
                <Button type="primary" htmlType="submit" onClick={(e)=>this.nextStep(e)}>
                    下一步
                </Button>
                </FormItem>
        </div>
        )
    }
}

export default StepOne