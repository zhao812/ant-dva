import React, { PropTypes } from 'react'
import { Table, Button } from 'antd'

class FavoritePage extends React.Component{

    constructor(props, context){
        super(props, context)

        this.state = {
            columns: [
                {
                    title: '筛选事件',
                    dataIndex: 'create_time',
                    key: 'create_time'
                },
                {
                    title: '客群名称',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: '客群数量',
                    dataIndex: 'count',
                    key: 'count',
                },
                {
                    title: '客群描述',
                    dataIndex: 'desc',
                    key: 'desc'
                },
                {
                    title: '操作',
                    key: "operation",
                    render: (text, record) => (
                        <span>
                            <Button size="samll">短信</Button>
                            <Button size="samll">微信</Button>
                        </span>
                    )
                }
            ]
        }
    }

    render(){
        let { columns } = this.state
        let data = [
            {
                create_time: '2017-5-14',
                name: '客群名称1',
                count: 2131231,
                desc: '客群描述客群描述客群描述客群描述客群描述客群描述客群描述客群描述',
            },
            {
                create_time: '2017-5-14',
                name: '客群名称1',
                count: 2131231,
                desc: '客群描述客群描述客群描述客群描述客群描述客群描述客群描述客群描述',
            },
            {
                create_time: '2017-5-14',
                name: '客群名称1',
                count: 2131231,
                desc: '客群描述客群描述客群描述客群描述客群描述客群描述客群描述客群描述',
            },
            {
                create_time: '2017-5-14',
                name: '客群名称1',
                count: 2131231,
                desc: '客群描述客群描述客群描述客群描述客群描述客群描述客群描述客群描述',
            },
            {
                create_time: '2017-5-14',
                name: '客群名称1',
                count: 2131231,
                desc: '客群描述客群描述客群描述客群描述客群描述客群描述客群描述客群描述',
            },
            {
                create_time: '2017-5-14',
                name: '客群名称1',
                count: 2131231,
                desc: '客群描述客群描述客群描述客群描述客群描述客群描述客群描述客群描述',
            }
        ]
        return(
            <div>
                <div className="favorite-title">
                    <p>收藏群组</p>
                </div>
                <div>
                    <div><Button>新建用户群</Button></div>
                    <Table columns={columns} dataSource={data} />
                </div>
            </div>
        )
    }
}

export default FavoritePage