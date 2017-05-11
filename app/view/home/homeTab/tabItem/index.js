import React, { PropTypes } from 'react'

import Icon from '../../../../components/icon'

import './index.scss'

class TabItem extends React.Component{
    
    constructor(props, context){
        super(props, context)
        this.state = {
            isAnimation: false
        }
    }

    onMouseOverHandler(){
        this.setState({ isAnimation: true })
        this.props.onSelectHandler()
    }

    onMouseOutHandler(){
        this.setState({ isAnimation: false })
    }

    render(){
        let { data, selected } = this.props
        return (
            <div className={ "tab-item " + (selected ? "selected" : "")} onMouseOver={()=>this.onMouseOverHandler()} onMouseOut={()=>this.onMouseOutHandler()}>
                <div className="tab-item-icon-group">
                    <Icon className={"circle-bg " + ( this.state.isAnimation ? "circle-animation" : "")} name="circle" size="45" color={selected ? "#1b5cfb" : "#999999"} />
                    <Icon className="tab-item-icon" name={data.icon} size="26" color={selected ? "#1b5cfb" : "#999999"} />
                </div>
                <p className="tab-item-name">{data.name}</p>
            </div>
        )
    }
}

TabItem.PropTypes = {
    data: PropTypes.shape({
        icon: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    selected: PropTypes.bool,
    onSelectHandler: PropTypes.func.isRequired
}

export default TabItem