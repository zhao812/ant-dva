import React, { PropTypes } from 'react'

import { Button } from 'antd'

import './index.scss'

class FavoriteItemInfo extends React.Component{
    constructor(props, context){
        super(props, context)
    }

    onCancelHandler(){
        this.props.onClose();
    }

    render(){
        let { data } = this.props

        return(
            <div className="favoriteItem-mask">
                <div className="favoriteItem-container">
                    <button className="bnClose" onClick={()=>this.onCancelHandler()}></button>
                    <div className="favoriteItem-div">
                        <p className="favoriteItem-title">客群名称</p>
                        <div className="favoriteItem-item">
                            <div className="title-div">筛选时间:</div>
                            <div className="content-div">{ data.createTime }</div>
                        </div>
                        <div className="favoriteItem-item">
                            <div className="title-div">客群数量:</div>
                            <div className="content-div">{ data.num }人</div>
                        </div>
                        <div className="favoriteItem-item">
                            <div className="title-div">客群备注:</div>
                            <div className="content-div">{ data.desc }</div>
                        </div>
                        <div className="favoriteItem-item">
                            <div className="title-div-1">标签筛选条件:</div>
                            <div className="favoriteItem-list">
                                {data.option.map((obj, index) => 
                                    <div className="list-item" key={index}><div>{obj.name}</div><div>{obj.value}</div></div>
                                )}
                            </div>
                        </div>
                        <div className="btn-div" onClick={()=>this.onCancelHandler()}><Button>返回</Button></div>
                    </div>
                </div>
            </div>
        )
    }
}

FavoriteItemInfo.PropTypes = {
    onClose: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

export default FavoriteItemInfo