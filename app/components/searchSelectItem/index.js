import React, { PropTypes } from 'react'

import { Select, Icon } from 'antd'

import './index.scss'


class SelectItem extends React.Component{

    constructor(props,context) {
        super(props,context)
    }

    componentDidMount(){
    }

    render(){
        let { title } = this.props
        return (
            <div className="selectItem">
                <span>{title}</span>
                <Select className="select"></Select>
                <Icon className="btn-close" type="close" onClick={this.props.onCloseHandler} />
            </div>
        )
    }
}

SelectItem.PropTypes = {
    title: PropTypes.string.isRequired,
    options: PropTypes.array,
    type: PropTypes.string,
    onChangeHandler: PropTypes.func,
    onCloseHandler: PropTypes.func
}

export default SelectItem