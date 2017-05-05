import React from 'react'
import { Form, Select, Input, Button,Radio ,Icon,message,DatePicker,Checkbox} from 'antd';
import './index.scss' 

const FormItem = Form.Item;
let oData="";
class StepTwo extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            title:"",
            content:""
        }
        
    }
    handleMenuClick(e){
        this.setState({
            title:e.target.value
        })
    }
    handlerMessgeTitle(e){
        this.setState({
            title:e.target.value
        })
    }
    handlerMessgeContent(e){
        this.setState({
            content:e.target.value
        })
    }
    handlerNext(e){
        const {title,content}=this.state;
         if(!title){ 
              message.info('消息标题不能为空')
         }else if(!content){
             message.info('消息内容不能为空')
         }else{
             this.props.goStep(3,this.state)
         }
    }
    handlerPrev(e){
        this.props.goStep(1)
    }
    componentDidMount(){
    }
    render(){
        const {title,content}=this.state;
        return (
        <div className="stepTwos">
           <div className="stepTwoLeft">
                <FormItem
                        label="消息标题"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18}}
                        ><Input onChange={(e)=>this.handlerMessgeTitle(e)} />
                        </FormItem>

                        <FormItem
                        label="消息内容"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}
                        ><Input type="textarea" rows={4}  onChange={(e)=>this.handlerMessgeContent(e)}/>
                        </FormItem>
                        
                        <FormItem
                        wrapperCol={{ span: 22, offset: 4 }}
                        >
                        <Button type="primary" htmlType="submit" onClick={(e)=>this.handlerNext(e)}>
                            下一步
                        </Button>
                        <Button style={{marginLeft:30}} onClick={(e)=>this.handlerPrev(e)}>
                            上一步
                        </Button>
                        </FormItem>
        </div>
        
       
        <div className="seeEffect">
            <div>{title}</div>
            <div>{content}</div>
        </div>
        </div>
        )
    }
}

export default StepTwo