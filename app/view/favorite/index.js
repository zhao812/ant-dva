import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Table, Button } from 'antd'
import Icon from '../../components/icon'

import FavoriteItemInfo from './favoriteItemInfo'

import { getFavoriteData } from './reducer/actions'

import './index.scss'

class FavoritePage extends React.Component{

    constructor(props, context){
        super(props, context)

        this.state = {
            rowData: null,
            columns: [
                {
                    title: '筛选事件',
                    dataIndex: 'createTime',
                    // key: 'create_time',
                },
                {
                    title: '客群名称',
                    // key: 'name',
                    dataIndex: 'name',
                    width: 140,
                },
                {
                    title: '客群数量',
                    dataIndex: 'num',
                    // key: 'count',
                },
                {
                    title: '客群描述',
                    dataIndex: 'desc',
                    // key: 'desc',
                    render: (text, record) => (
                        <div className="table-desc">{text}</div>
                    )
                },
                {
                    title: '操作',
                    // key: "operation",
                    width: 150,
                    render: (text, record) => (
                        <span>
                            <Button className="btn_mail" onClick={(e)=>this.onMailHandler(e)}><span className="btn-icon"><Icon name="mail" color="#000" size="14" /></span>短信</Button>
                            <Button className="btn_wx" onClick={(e)=>this.onWeiXinHandler(e)}><span className="btn-icon"><Icon name="weixing" color="#000" size="14" /></span>微信</Button>
                        </span>
                    )
                }
            ]
        }
    }

    componentDidMount(){
        this.sendData()        
    }

    sendData(pagination){
        let opt = {
            page: pagination ? pagination.current : 0,
            size: 10
        }
        this.props.getFavoriteData(opt)
    }

    onPageChange(pagination){
        this.sendData(pagination)
    }

    onMailHandler(e){
        e.stopPropagation()
        e.preventDefault()

        console.log("onMailHandler")
    }

    onWeiXinHandler(e){
        e.stopPropagation()
        e.preventDefault()

        console.log("onWeiXinHandler")
    }

    onClickHandler(e){
        this.setState({rowData: e})
    }

    onCloseHandler(){
        this.setState({rowData: null})
    }

    render(){
        let { columns, loading, rowData } = this.state
        console.log(this.props.pagination)
        return(
            <div className="favorite-page-container">
                <div className="favorite-title">
                    <p>收藏群组</p>
                </div>
                <div className="favorite-tab">
                    <div><Button className="bnNew">新建用户群</Button></div>
                    <Table
                            columns={columns} 
                            dataSource={this.props.favoriteList}
                            pagination={this.props.pagination}
                            loading={this.props.loading}
                            onRowClick={(e)=>this.onClickHandler(e)}
                            onChange={(pagination)=>this.onPageChange(pagination)}
                    />
                </div>
                { rowData ? <FavoriteItemInfo data={rowData} onClose={()=>this.onCloseHandler()} /> : ""}
            </div>
        )
    }
}

FavoritePage.PropTypes = {
    favoriteList: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    pagination: PropTypes.object.isRequired
}

let mapStateToProps = state => ({
    favoriteList: state.favoriteReducer.favorite_list,
    loading: state.favoriteReducer.loading,
    pagination: state.favoriteReducer.pagination
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getFavoriteData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoritePage)