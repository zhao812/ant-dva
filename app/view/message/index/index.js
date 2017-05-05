import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Table, Icon,Button } from 'antd';
import {getTableData} from './reducer/action';


const columns = [{
  title: '预览',
  dataIndex: 'img',
  key: 'img'
}, {
  title: '活动名称',
  dataIndex: 'title',
  key: 'title',
}, {
  title: '推送渠道',
  dataIndex: 'pushChannel',
  key: 'pushChannel',
},{
  title: '通道',
  dataIndex: 'passageway',
  key: 'passageway',
},{
  title: '目标客户数量',
  dataIndex: 'custnumber',
  key: 'custnumber',
},{
  title: '激活用户数量',
  dataIndex: 'number',
  key: 'number',
},{
  title: '状态',
  dataIndex: 'status',
  key: 'status',
},{
  title: '操作时间',
  dataIndex: 'timer',
  key: 'timer',
},{
  title: '跟踪',
  key: 'track',
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
      this.props.getTableData().then((data) => {
        this.setState({
          data:data.result
        })
      })
    }

    render() {
        return (
          <div>
            <Button>新建推送活动</Button>
            <Table columns={columns} dataSource={""||this.state.data} />
          </div>
        );
    }
}


Message.propTypes = {
}

let mapStateToProps = state => ({
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getTableData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Message)