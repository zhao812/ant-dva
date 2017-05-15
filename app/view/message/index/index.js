import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { Table, Icon,Button ,Pagination } from 'antd';
import {getTableData} from './reducer/action';
import './index.scss';

const columns = [{
  title: '预览',
  dataIndex: 'img'
}, {
  title: '活动名称',
  dataIndex: 'name'
}, {
  title: '推送渠道',
  dataIndex: 'sendTunnel'
},{
  title: '通道',
  dataIndex: 'tunnelName',
  key: 'tunnelName',
},{
  title: '目标客户数量',
  dataIndex: 'selectNum'
},{
  title: '激活用户数量',
  dataIndex: 'actNum'
},{
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
},{
  title: '跟踪',
  render: (text, record) => (
    <span>
      <Button size="small" className="sbutton" >报表</Button>
      <Button size="small" className="sbutton"  >重发</Button>
    </span>
  ),
}];

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
      this.props.getTableData({"size":10,"page":1})
    }

    handleTableChange(e){
      this.props.getTableData({"size":10,"page":e})
    }

    handlerCreatMail(){
      hashHistory.push("/wechart")
    }
    handlerCreateWeixin(){
      hashHistory.push("/importChart")
    }
    render() {
        return (
          <div className="content-wrapper">
            <h6 className="title">营销活动</h6>
            <div className="white-bg">
              <Button className="oButton" onClick={this.handlerCreatMail.bind(this)}><Icon type="mail"  />新建短信推送</Button>
              <Button className="oButton" onClick={this.handlerCreateWeixin.bind(this)}><Icon type="link"  />新建微信推送</Button>
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
    return bindActionCreators({ getTableData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Message)