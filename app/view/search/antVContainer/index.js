import React, { PropTypes } from 'react';

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
                <div>
                    <SearchChart title="姓名" type="pie" />
                    <SearchChart title="姓名" type="pie" />
                    <SearchChart title="姓名" type="pie" />

                    <SearchChart title="姓名" type="bar" />
                    <SearchChart title="姓名" type="bar" />
                    
                    <SearchChart title="姓名" type="pie" />
                    <SearchChart title="姓名" type="pie" />
                    <SearchChart title="姓名" type="waterfall" />
                    <SearchChart title="姓名" type="waterfall" />
                </div>  
            </div>
        )
    }
}

export default AntVContainer