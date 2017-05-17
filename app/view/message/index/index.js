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
  width:240,
  render:(value)=>{
    return <div className="w200">{value}</div>
  }
}, {
  title: '推送渠道',
  dataIndex: 'sendTunnel',
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
// {
//   title: '激活用户数量',
//   dataIndex: 'actNum'
// },
{
  title: '状态',
  dataIndex: 'status',
  render:(value)=>{
    if(value=="草稿"){
      return <div className="icon2 icons">{value}</div>
    }
    else if(value=="完成"){
      return <div className="icon3 icons">{value}</div>
    }
    else if(value=="等待中"){
      return <div className="icon1 icons">{value}</div>
    }
    console.log(value)
  }
},{
  title: '操作时间',
  dataIndex: 'createTime'
},
/*{
  title: '跟踪',
  render: (text, record) => (
    <span>
      <Button size="small" className="sbutton" >报表</Button>
      <Button size="small" className="sbutton"  >重发</Button>
    </span>
  ),
}*/
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
      this.props.getTableData(10,1)
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
                            <Pagination 
                            onChange={(e)=>this.handleTableChange(e)} total={this.props.count} />
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