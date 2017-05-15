import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import SearchChart from '../../../components/searchChart'

import './index.scss'

class AntVContainer extends React.Component {

    constructor(props,context) {
        super(props,context)
    }
    
    componentDidMount(){
    }

    render(){
        return (
            <div className="chart-container">
                <div className="chart-title-div">
                    <p>标签图</p>
                </div>
                <div className="chart-list">
                    {
                        this.props.reports.map((obj, index) => 
                            <SearchChart key={index} title={obj.name} type={obj.type} data={obj.data} />
                        )
                    }
                </div>  
            </div>
        )
    }
}

AntVContainer.PropTypes = {
    reports: PropTypes.array.isRequired
}

let mapStateToProps = state => ({
    reports: state.searchList.reportList
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AntVContainer)