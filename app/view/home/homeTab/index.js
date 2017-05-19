import React, { PropTypes } from 'react'

import TabItem from './tabItem'

import './index.scss'

class HomeTab extends React.Component{

    constructor(props, context){
        super(props, context)

        this.state = {
            selectIndex: 0,
        }
    }

    onChangeSelectIndex(index){
        this.setState({ selectIndex: index })
    }

    render(){
        let { selectIndex } = this.state, { data } = this.props, len = data.length
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
                    <div className="tab-content" dangerouslySetInnerHTML={{__html: len ? data[selectIndex]["content"] : ""}}></div>
                </div>
            </div>
        )
    }
}

HomeTab.PropTypes = {
    data: PropTypes.array.isRequired
}

export default HomeTab