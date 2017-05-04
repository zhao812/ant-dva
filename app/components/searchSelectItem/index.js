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
        let { title, defautlValue } = this.props
        console.log(defautlValue, "12345678")
        return (
            <div className="selectItem">
                <span>{title}</span>
                <Select className="select" value={defautlValue + ""} onChange={this.props.onChangeHandler}>
                    {
                        this.props.options.map((obj, index) => 
                            <Select.Option key={index} value={obj.value  + ""}>{obj.name}</Select.Option>
                        )
                    }
                </Select>
                <Icon className="btn-close" type="close" onClick={this.props.onCloseHandler} />
            </div>
        )
    }
}

SelectItem.PropTypes = {
    title: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    defautlValue: PropTypes.any,
    onChangeHandler: PropTypes.func.isRequired,
    onCloseHandler: PropTypes.func
}

export default SelectItem