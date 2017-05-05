import React, { PropTypes } from 'react'

import TreeChart from '../../../components/treeChart'

import './index.scss'

class MirrorItem extends React.Component{
    constructor(props, context){
        super(props, context)
    }

    render(){
        let { data } = this.props
        let title = data.name || "", list = data.children || []
        return (
            <div className="mirror-item">
                <div className="mirror-item-title">{title}</div>
                <div className="mirror-item-chart">
                    <TreeChart data={list} />
                </div>
            </div>
        )
    }
}

MirrorItem.PropTypes = {
    data: PropTypes.object.isRequired
}

export default MirrorItem