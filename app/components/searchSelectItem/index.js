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
        let { title, defautlValue, isShowAdd } = this.props
        return (
            <div className="selectItem">
                <div>
                    <span className="selectItem-title">{title}</span>
                    {isShowAdd ? <Icon className="btn-add" type="plus-circle-o" onClick={this.props.onAddHandler} /> : ""}
                </div>
                <Select className="select" value={defautlValue + ""} onChange={this.props.onChangeHandler}>
                    <Select.Option key="-1" value="">未选择</Select.Option>
                    {
                        this.props.options.map((obj, index) => 
                            <Select.Option key={index} value={obj.value  + ""}>{obj.name}</Select.Option>
                        )
                    }
                </Select>
            </div>
        )
    }
}

SelectItem.PropTypes = {
    title: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    defautlValue: PropTypes.any,
    onChangeHandler: PropTypes.func.isRequired,
    isShowAdd: PropTypes.bool.isRequired,
    onAddHandler: PropTypes.func
}

export default SelectItem