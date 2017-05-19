import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Icon } from 'antd'

import { onCloseFilter } from '../reducer/actions'

import { getCityNameByValue } from '../../../utils'

import './index.scss'

class SelectResultContainer extends React.Component{
    constructor(props, context){
        super(props, context)
    }

    getItems(){
        return this.props.filterMenuList.map((menu, key)=>
            menu.list.map((item, index) => {
                if(item.isShowResult){
                    let value=""
                    if(item.type == "3" || item.type == "4"){
                        value = getCityNameByValue(item.defaultValue)
                    }else{
                        value = item.options ? item.options.find(obj=>obj.value==item.defaultValue).name : ""
                    }
                    
                    return <div className="select-result-item">
                                <span>{ item.name + ": " + value }</span>
                                <Icon className="bnClose" type="close" onClick={()=>this.props.onCloseFilter(item.id, index)} />
                            </div>
                }
                return ""
            })
        )
    }

    render(){
        return(
            <div className="search-select-result-container">
                {this.getItems()}
            </div>
        )
    }
}

SelectResultContainer.PropTypes = {
    filterMenuList: PropTypes.array.isRequired,
}

let mapStateToProps = state => ({
    filterMenuList: state.searchList.filterMenuList,
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ onCloseFilter }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectResultContainer)