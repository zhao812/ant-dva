import React, { PropTypes } from 'react'

import TabItem from './tabItem'

import './index.scss'

class HomeTab extends React.Component{

    constructor(props, context){
        super(props, context)

        this.state = {
            selectIndex: 0,
            data: [
                { name: "人口标签", icon: "people", content: "人口标签人口标签人口标签<br />人口标签人口标签人口标签", },
                { name: "购物标签", icon: "bag", content: "购物标签购物标签购物标签购物\n标签购物标签购物标签购物标签", },
                { name: "上网标签", icon: "arrow", content: "上网标签上网标签上网标签上\n网标签上网标签上网标签上网标签", },
                { name: "投资标签", icon: "pig", content: "投资标签投资标签投资标签投资\n标签投资标签投资标签投资标签", },
                { name: "娱乐标签", icon: "music", content: "娱乐标签娱乐标签娱乐标签娱\n乐标签娱乐标签娱乐标签娱乐标签娱乐标签", },
                { name: "人脉标签", icon: "group", content: "人脉标签人脉标签人脉标签人\n脉标签人脉标签人脉标签人脉标签人脉标签", },
                { name: "位置标签", icon: "place", content: "位置标签位置标签位置标签位\n置标签位置标签位置标签位置标签位置标签", }
            ]
        }
    }

    onChangeSelectIndex(index){
        this.setState({ selectIndex: index })
    }

    render(){
        let { selectIndex, data } = this.state, len = data.length
        let arrowStyle = { transform: "translateX(" + selectIndex*146 + "px)" }
        return(
            <div className="tab-container">
                <p className="tabs-title">多维度解析用户标签属性</p>
                <div className="tabs-div">
                    { 
                        data.map((obj, key) => 
                            <div className="tab-item-div" key={key}>
                                <TabItem data={obj} selected={selectIndex == key ? true : false} onSelectHandler={()=>this.onChangeSelectIndex(key)}/>
                                {key < len -1 ? <div className="tabs-line"></div> : ""}
                            </div>
                        )
                    }
                </div>
                <div className="tab-content-div">
                    <div className="tab-content-arrow" style={arrowStyle} />
                    <div className="tab-content" dangerouslySetInnerHTML={{__html: data[selectIndex]["content"]}}></div>
                </div>
            </div>
        )
    }
}

export default HomeTab