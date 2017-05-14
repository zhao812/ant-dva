import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Button, Select, Tabs } from 'antd'
import SelectItem from '../../../components/searchSelectItem'

import { changeFilterMenuList, changeFilterMenuSelect, getReportData } from '../reducer/actions'

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
                title={obj.name}
                defautlValue={obj.defaultValue}
                options={obj.options || []}
                onChangeHandler={(value)=>this.props.changeFilterMenuSelect(obj.id, value)}
                onCloseHandler={()=>this.props.changeFilterMenuList(obj.id)} 
            />
        )
    }

    getFavorites(){
        return this.props.favorites.map((obj, index)=><Select.Option key={index} value={obj.id + ""}>{obj.name}</Select.Option>)
    }

    getTabs(){
        let TabPane = Tabs.TabPane

        return this.props.menuData.map((menu, key)=>
            <TabPane tab={menu.name} key={key}>
                {
                    menu.list.map((item, index) => 
                        <div>
                            <SelectItem 
                                key={index} 
                                title={item.name}
                                defautlValue={item.defaultValue}
                                options={item.options || []}
                                onChangeHandler={(value)=>this.props.changeFilterMenuSelect(item.id, value)}
                                onCloseHandler={()=>this.props.changeFilterMenuList(item.id)} 
                            />
                        </div>
                    )
                }
            </TabPane>
        )
    }

    render(){

        let { userTotal, riseTime, reportCount, getReportData} = this.props

        return (
            <div className="selectContainer">
                <Tabs defaultActiveKey="0">{ this.getTabs() }</Tabs>

                <div className="select-div">{ this.getSelectItems() }</div>
                <div className="button-div">
                    <span><Button size="large" onClick={getReportData}>用户画像计算</Button></span>
                    <span>计算用户总数{userTotal}，计算时间{riseTime}毫秒，生成{reportCount}个报表</span>
                    <span><Button>导出user_id</Button></span>
                    <span><Button>开启精准营销</Button></span>
                    <span className="left-div">
                        <span><Button>收藏本次筛选</Button></span>
                        <span><Select style={{"width":"120px"}}>{this.getFavorites()}</Select></span>
                    </span>
                </div>
            </div>
        )
    }
}

SelectContainer.PropTypes = {
    menuData: PropTypes.array.isRequired,

    favorites: PropTypes.array.isRequired,
    filterMenuList: PropTypes.array.isRequired,
    userTotal: PropTypes.number.isRequired,
    riseTime: PropTypes.number.isRequired,
    reportCount: PropTypes.number.isRequired
}

let mapStateToProps = state => ({
    menuData: state.searchList.menuData,

    favorites: state.searchList.favorites,
    filterMenuList: state.searchList.filterMenuList,
    userTotal: state.searchList.userTotal,
    riseTime: state.searchList.riseTime,
    reportCount: state.searchList.reportCount,
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ changeFilterMenuList, changeFilterMenuSelect, getReportData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectContainer)