import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router' 

import SelectResultContainer  from './selectResult'
import SelectContainer from './selectContainer'
import AntVContainer from './antVContainer'

import { getSearchMenu } from './reducer/actions'

import './index.scss'

class SearchList extends React.Component {

    constructor(props,context) {
        super(props,context)
    }
    
    componentDidMount(){
        this.props.getSearchMenu()
    }

    render(){
        return (
            <div className="search-container">
                <div className="search-title">
                    <span>筛选条件</span>
                    <Link>查看收藏用户群</Link>
                </div>
                
                <SelectResultContainer />
                <SelectContainer />
                <AntVContainer />
            </div>
        )
    }
}

SearchList.PropTypes = {
    menuData: PropTypes.array.isRequired
}

let mapStateToProps = state => ({
    menuData: state.searchList.menuData
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getSearchMenu }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchList)