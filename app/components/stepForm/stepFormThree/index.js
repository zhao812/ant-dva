import React from 'react'
import { Form, Select, Input, Button,Radio ,Icon,message,DatePicker,Checkbox} from 'antd';
import './index.scss' 

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
class StepThree extends React.Component{
    constructor(props) {
        super(props);
        
    }
    handleMenuClick(e){
        
    }
    componentDidMount(){
        this.state=this.props.allData;
    }
    handlerNext(e){
        console.log(this.props.allData)
    }
    handlerPrev(e){
        this.props.goStep(2)
    }
    
    handlerFirst(e){
        this.props.goStep(1)
    }
    render(){
        const {allData}=this.props;
        return (
            <div>
          <div  className="stepThree" style={{marginBottom:20}}>
                <div className="search" >
                    <Input addonAfter={<Icon type="setting" />} defaultValue="mysite"  className="searchInput" />
                </div>
                <div className='content'>
                    <ul>
                        <li>
                            <span>发给谁</span>
                            {allData.value}
                            <span className="flex1 h80 "></span>
                            <Button onClick={(e)=>this.handlerFirst(e)}>编辑</Button>
                        </li>
                        <li style={{height:200}}>
                            <span>发什么</span>
                            <span className="flex1">
                                <div className="seeEffect"><div>{allData.title}</div><div>{allData.content}</div></div>
                            </span>
                            <Button onClick={(e)=>this.handlerPrev(e)}>编辑</Button>
                        </li>
                        <li>
                            <span>选通道</span>
                            <span>
                                <em  style={{marginTop:6}}>选择发送本次推送的通道</em>
                                <i>营销类短信</i>
                            </span>
                        </li>
                        <li>
                            <span>何时发</span>
                            <span className="sendOut">
                                <em style={{marginTop:6}}>选择发送本次推送的通道</em>
                                <h6>避免对用户造成骚扰，夜间24:00~凌晨8:00不会对用户进行推送，另请注意用户的所在时区</h6>
                                <h6>当前时间{new Date().toString().split(' ')[4]}</h6>
                                 <RadioGroup defaultValue="b" size="large">
                                    <RadioButton value="a">立即发送</RadioButton>
                                    <RadioButton value="b">定时发送</RadioButton>
                                </RadioGroup>
                                     <DatePicker
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"
                                        placeholder="Select Time"/>
                                    <div>
                                        <Checkbox></Checkbox>发送时处于离线的用户，如在
                                         <Select defaultValue="2" style={{width:70,marginLeft:6,marginRight:6}}>
                                                <Option value="1">1小时</Option>
                                                <Option value="2">2小时</Option>
                                            </Select>
                                        恢复在线，仍然进行推送
                                    </div>
                                </span>
                        </li>
                    </ul>
                </div>
            </div>
             <Button type="primary" onClick={(e)=>this.handlerNext(e)} size="large">
                  保存
              </Button>
              <Button style={{marginLeft:30}} onClick={(e)=>this.handlerPrev(e)} size="large">
                  上一步
               </Button>
            </div>
        )
    }
}

export default StepThree