import React, { PropTypes } from 'react'
import { Input, Button } from 'antd'

import './index.scss'

class Favorite extends React.Component{
    constructor(props, context){
        super(props, context)
    }

    onConfirmHandler = () => {
        this.props.onCloseHandler()
    }

    onCancelHandler = () =>{
        this.props.onCloseHandler()
    }

    render(){
        return(
            <div className="favorite-mask">
                <div className="favorite-container">
                    <button className="bnClose" onClick={()=>this.onCancelHandler()}></button>
                    <div className="favorite-div">
                        <p className="favorite-title">收藏筛选</p>
                        <div><span>筛选时间:</span>2017-05-08</div>
                        <div><span>客群数量:</span>20000人</div>
                        <div><span>客群名称:</span><Input maxLength="20" /></div>
                        <div><span>客群备注:</span><Input type="textarea" maxLength="120" /></div>
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
    onCloseHandler: PropTypes.func.isRequired
}

export default Favorite