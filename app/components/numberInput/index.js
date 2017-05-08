import React from 'react';
import './index.scss';
import {Input} from 'antd'

class NumberInput extends React.Component{
      constructor(props){
        super(props);
        this.state={
          value:"",
          number:0
        } 
      }
      handlerChange(e){
          let num="",number=0;
          if(e.target.value.length>this.props.number){
            num=e.target.value.substring(0,this.props.number);
            number=this.props.number;
          }else{
            num=e.target.value
            number=e.target.value.length
          }
          this.setState({
            value:num,
            number:number
          })
          this.props.nInputValue(num)
      }
      render() {
        let html;
        if(this.props.isOne==1){
            html=<Input  onChange={(e)=>this.handlerChange(e)} value={this.state.value}/>
        }else{
            html= <Input className="oText" type="textarea"
                  rows={this.props.isOne}  onChange={(e)=>this.handlerChange(e)} 
                  value={this.state.value}/>
        }
          return (
              <div className="numberInput">
                  {html}
                  <span>{this.state.number}/{this.props.number}</span>
              </div>
          );
        }
};
export default NumberInput;