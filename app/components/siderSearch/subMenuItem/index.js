import React, { PropTypes } from 'react'

import Icon from '../../icon'

import './index.scss'

class SubMenuItem extends React.Component{

    constructor(props, context){
        super(props, context)

        this.state = {
            isMouseOver: false
        }
    }

    onMouseOverHandler(){
        this.setState({isMouseOver: true})
    }

    onMouseOutHandler(){
        this.setState({isMouseOver: false})
    }

    render(){
        let { isMouseOver } = this.props
        let {title, icon} = this.props

        return (
            <div className="submenu-item" onMouseOver={()=>this.onMouseOverHandler()} onMouseOut={()=>this.onMouseOutHandler()}>
                <div className="icon-group">
                    <Icon className="circle-bg" name="circle" size="30" color={isMouseOver ? '#ffffff' : '#000000'} />
                    <Icon className="item-icon" name={icon} size="16" color={isMouseOver ? '#ffffff' : '#000000'} />
                </div>
                <span className="submenu-title" style={{color: isMouseOver ? '#ffffff' : '#000000'}}>{title}</span>
            </div>
        )
    }

}

SubMenuItem.PropTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}

export default SubMenuItem