import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Form, Select, Input, Button,Radio ,Icon,message,DatePicker,Checkbox} from 'antd';
import StepNav from '../../../components/stepNav'
import StepOne from '../../../components/stepForm/stepFormOne'
import StepTwo from '../../../components/stepForm/stepFormTwo'
import StepThree from '../../../components/stepForm/stepFormThree'
import {getUser} from './reducer/action';

import './index.scss'
let oData1,o,oData3;
class setUpMobile extends React.Component {
  state = {
    stepNum:1
  }
  goStep(num,data){
      const {stepNum}=this.state;
      this.setState({
          stepNum:num
      })
      if(stepNum==1){
        oData1=data;
      }else  if(stepNum==2){
        oData2=data;
      }
  }
  mergeJsonObject (jsonbject1, jsonbject2) {
        var resultJsonObject={};
        for(var attr in jsonbject1){
        resultJsonObject[attr]=jsonbject1[attr];
        }
        for(var attr in jsonbject2){
        resultJsonObject[attr]=jsonbject2[attr];
        }
        return resultJsonObject;
  };
  render() {
     oData3=this.mergeJsonObject(oData1,oData2);
    const { getFieldDecorator } = this.props.form;
    const {display,platform,value,stepNum,activeName,messageTitle,messageContent}=this.state;
    return (
      <div className="setUpmobile">
      <StepNav stepNum={stepNum}/>
      {/*第一步*/}
      <Form style={{display:stepNum==1?'block':'none'}} >
        <StepOne goStep={this.goStep.bind(this)}/>
      </Form>

       {/*第二步*/}
      <Form style={{display:stepNum==2?'block':'none'}} >
        <StepTwo goStep={this.goStep.bind(this)}/>
      </Form>

       {/*第三步*/}
      
      <Form style={{display:stepNum==3?'block':'none'}}>
           <StepThree goStep={this.goStep.bind(this)}  allData={oData3}/>
      </Form>
      </div>
    );
  }
}
const WrappedApp = Form.create()(setUpMobile);
setUpMobile.propTypes = {
}

let mapStateToProps = state => ({
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedApp)