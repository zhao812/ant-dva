import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Table, Icon, Button } from 'antd';

import { getMessageList } from './reducer/actions'

import './index.scss'

class MessageList extends React.Component {
    constructor(props, content) {
        super(props, content)
    }

    componentDidMount(){
        this.props.getMessageList()
    }

    render() {
        let { Column } = Table;

        return (
            <div className="message-list-container">
                <div><Button size="large">新建推送活动</Button></div>
                <Table className="message-list-table" dataSource={this.props.messageList}>
                     <Column title="预览" dataIndex="icon" key="icon" />
                     <Column title="活动名称" dataIndex="name" key="name" />
                     <Column title="推送渠道" dataIndex="channel" key="channel" />
                     <Column title="通道" dataIndex="way" key="way" />
                     <Column title="目标客户数量" dataIndex="customer-number" key="customer-number" />
                     <Column title="激活用户数量" dataIndex="activation-number" key="activation-number" />
                     <Column title="状态" dataIndex="status" key="status" />
                     <Column title="操作时间" dataIndex="date" key="date" />
                     <Column title="跟踪" dataIndex="track" key="track"
                        render={(text, record)=>{
                            return (
                            <span>
                                <Button>报表</Button>
                                <Button>重发</Button>
                            </span>
                        )}}
                    />
                </Table>
            </div>
        )
    }
}

MessageList.PropTypes = {
    messageList: PropTypes.array.isRequired
}

let mapStateToProps = state => ({
    messageList: state.messageList.messageList
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getMessageList }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList)