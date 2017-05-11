import React from 'react'
import {Input ,Form} from 'antd'
const FormItem = Form.Item;

let n=0;
class DW extends React.Component{
    constructor(props) {
    super(props)
    this.state = {
            value:""
        }
    }
    handlerChange(e){
        this.props.short(e.target.value)
    }
    render() {
        return (
            <FormItem
                    label="短文" labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
            >
                <Input type="textarea" rows={4} onChange={this.handlerChange.bind(this)}/>
            </FormItem>
        )
    }
}
export default DW