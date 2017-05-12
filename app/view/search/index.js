import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import SelectContainer from './selectContainer'
import AntVContainer from './antVContainer'

import { getSearchMenu } from './reducer/actions'

class SearchList extends React.Component {

    constructor(props,context) {
        super(props,context)
    }
    
    componentDidMount(){
        this.props.getSearchMenu()
    }

    render(){
        return (
            <div>
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