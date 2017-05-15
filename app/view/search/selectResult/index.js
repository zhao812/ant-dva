import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Icon } from 'antd'

import { onCloseFilter } from '../reducer/actions'

import './index.scss'

class SelectResultContainer extends React.Component{
    constructor(props, context){
        super(props, context)
    }

    getItems(){
        console.log(this.props.filterMenuList)
        return this.props.filterMenuList.map((menu, key)=>
            menu.list.map((item, index) => {
                if(item.isShowResult){
                    let opt = item.options ? item.options.find(obj=>obj.value==item.defaultValue) : []
                    return <div className="select-result-item">
                                <span>{ item.name + ": " + opt.name || "" }</span>
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