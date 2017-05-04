import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Button, Select } from 'antd'
import SelectItem from '../../../components/searchSelectItem'

import { changeFilterMenuList } from '../reducer/actions'

import './index.scss'

class SelectContainer extends React.Component {

    constructor(props,context) {
        super(props,context)
    }
    
    componentDidMount(){
    }

    getSelectItems(){
        return this.props.filterMenuList.map((obj, index) => 
            <SelectItem 
                key={index} 
                title={obj.title} 
                onCloseHandler={()=>this.props.changeFilterMenuList(obj.id)} 
            />
        )
    }

    render(){
        return (
            <div className="selectContainer">
                <div className="select-div">{ this.getSelectItems() }</div>
                <div className="button-div">
                    <span><Button size="large">用户画像计算</Button></span>
                    <span>计算用户总数20000000，计算时间1000毫秒，生成30个报表</span>
                    <span><Button>导出user_id</Button></span>
                    <span><Button>开启精准营销</Button></span>
                    <span className="left-div">
                        <span><Button>收藏本次筛选</Button></span>
                        <span><Select style={{"width":"120px"}}></Select></span>
                    </span>
                </div>
            </div>
        )
    }
}

SelectContainer.PropTypes = {
    filterMenuList: PropTypes.array.isRequired
}

let mapStateToProps = state => ({
    filterMenuList: state.searchList.filterMenuList
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ changeFilterMenuList }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectContainer)