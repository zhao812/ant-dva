import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
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
  dataIndex: 'status'
},{
  title: '操作时间',
  dataIndex: 'createTime'
},{
  title: '跟踪',
  render: (text, record) => (
    <span>
      <a >报表</a>
      <a >重发</a>
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
      console.log(e,1111)
      this.props.getTableData({"size":10,"page":e})
    }

    render() {
        return (
          <div>
            <Button><Icon type="link" />新建短信推送</Button>
            <Button><Icon type="link" />新建微信推送</Button>
            <Table 
              rowKey="id"
              columns={columns} 
              dataSource={this.props.data} 
              onChange={this.handleTableChange.bind()} />
              <Pagination 
              onChange={(e)=>this.handleTableChange(e)} total={this.props.count} />
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