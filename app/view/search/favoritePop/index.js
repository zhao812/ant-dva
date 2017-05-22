import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Input, Button, Modal } from 'antd'

import ErrorMessage from '../../../static/const/errorMessage'
import { formatDate } from '../../../utils'
import { collectionFavrite, clearCalculateResult } from '../reducer/actions'

import './index.scss'

class Favorite extends React.Component{
    constructor(props, context){
        super(props, context)
        this.state = {
            favoriteName: "",
            favoriteDesc: ""
        }
    }

    onChangeHandler = (e, type) => {
        let value = e.currentTarget.value, state = {}
        state[type] = value
        this.setState(state)
    }

    onConfirmHandler = () => {
        let { favoriteName, favoriteDesc } = this.state
        if(!this.props.reportId) return
        if(favoriteName == ""){
            Modal.error({ title: '提示', content: ErrorMessage.Error_FAVORITE_NAME });
            return
        }

        let opt = {
            id: this.props.reportId,
            name: favoriteName,
            remark: favoriteDesc
        }
        this.props.collectionFavrite(opt).then(data=>{
            Modal.success({
                title: '提示',
                content: '收藏成功!',
                onOk: ()=>{this.props.onCloseHandler(true)}
            })
        })
    }

    onCancelHandler = () =>{
        this.props.onCloseHandler()
    }

    render(){
        return(
            <div className="favorite-pop-mask">
                <div className="favorite-container">
                    <button className="bnClose" onClick={()=>this.onCancelHandler()}></button>
                    <div className="favorite-div">
                        <p className="favorite-title">收藏筛选</p>
                        <div><span>筛选时间:</span>{formatDate(this.props.reportDate, 'yyyy-MM-dd')}</div>
                        <div><span>客群数量:</span>{this.props.reportNumber}人</div>
                        <div><span>客群名称:</span><Input maxLength="20" value={this.state.favoriteName} onChange={(e)=>this.onChangeHandler(e, 'favoriteName')} /></div>
                        <div><span>客群备注:</span><Input type="textarea" value={this.state.favoriteDesc} maxLength="120" onChange={(e)=>this.onChangeHandler(e, 'favoriteDesc')} /></div>
                        <div className="btn-div">
                            <Button className="bnConfirm" onClick={()=>this.onConfirmHandler()}>确认收藏</Button>
                            <Button className="bnCancel" onClick={()=>this.onCancelHandler()}>取消</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Favorite.PropTypes = {
    reportId: PropTypes.number.isRequired,
    reportDate: PropTypes.number.isRequired,
    reportNumber: PropTypes.number.isRequired,
    onCloseHandler: PropTypes.func.isRequired
}

let mapStateToProps = state => ({
    reportId: state.searchList.reportId,
    reportDate: state.searchList.reportDate,
    reportNumber: state.searchList.reportNumber,
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ collectionFavrite, clearCalculateResult }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorite)