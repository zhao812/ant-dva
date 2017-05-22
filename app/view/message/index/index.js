import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { Table, Icon,Button ,Pagination } from 'antd';
import Icons from '../../../components/icon'
import {getTableData} from './reducer/action';
import {getCurrent} from '../../../components/siderMenu/reducer/action';
import './index.scss';

const columns = [{
  title: '预览',
  dataIndex: 'img',
  width:60,
  render:(value)=>{
    if(value==1){
      return <Icons name="mail" color={'#666'} size={20} />
    }
    else if(value==2){
      return <Icons  name="weixing" color={'#666'} size={20}  />
    }
  }
}, {
  title: '活动名称',
  dataIndex: 'name',
  render:(value)=>{
    return <div className="w200">{value}</div>
  }
}, {
  title: '推送渠道',
  dataIndex: 'tunnelId',
  render:(value)=>{
    if(value=="1"){
      return "短信"
    }
    else if(value=="2"){
      return "微信"
    }
  }
},{
  title: '通道',
  dataIndex: 'tunnelName',
  key: 'tunnelName',
},
{
  title: '目标客户数量',
  dataIndex: 'selectNum'
},
{
  title: '状态',
  dataIndex: 'status',
  render:(value)=>{
     if(value==1){
      return <div className="icon3 icons">已完成</div>
    }
    else if(value==2){
      return <div className="icon1 icons">等待中</div>
    }
    console.log(value)
  }
},{
  title: '操作时间',
  dataIndex: 'sendTime'
}
];

const data = [];

class Message extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            data: ""
        }
    }

    changeTitle(name) {
    }
    componentDidMount() {
      this.props.getTableData(10,0)
    }

    handleTableChange(e){
      this.props.getTableData(10,e)
    }

    handlerCreatMail(){
      this.props.getCurrent("b1")
      hashHistory.push('/message/setUpmessage')
    }
    handlerCreateWeixin(){
       this.props.getCurrent("c2")
       hashHistory.push('/wechart')
    }
    render() {
        return (
          <div className="content-wrapper">
            <h6 className="title">营销活动</h6>
            <div className="white-bg">
              <Button className="oButton" onClick={this.handlerCreatMail.bind(this)}><Icons className="btn-icon" name="mail" color={'#666'} />新建短信推送</Button>
              <Button className="oButton" onClick={this.handlerCreateWeixin.bind(this)}><Icons  className="btn-icon" name="weixing" color={'#666'} />新建微信推送</Button>
              <Table 
                            rowKey="id"
                            columns={columns} 
                            dataSource={this.props.data} 
                            onChange={this.handleTableChange.bind()} />
                            {this.props.count?<Pagination 
                            onChange={(e)=>this.handleTableChange(e)} total={this.props.count} />:""} 
            </div>
            
          </div>
        );
    }
}


Message.propTypes = {
}

let mapStateToProps = state => ({
    data:state.activeList.data,
    count:state.activeList.count,
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getTableData ,getCurrent}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Message)