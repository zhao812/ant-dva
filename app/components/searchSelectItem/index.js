import React, { PropTypes } from 'react'

import { Select, Icon, Cascader } from 'antd'

import CityConst from '../../static/const/citys'

import './index.scss'


class SelectItem extends React.Component{

    constructor(props,context) {
        super(props,context)
    }

    componentDidMount(){
    }

    onCascaderChange(value){
        if(value.length == 3){
            this.props.onChangeHandler(value[2])
        }else{
            this.props.onChangeHandler("")
        }
    }

    getComponents(){
        let { type, defautlValue } = this.props
        if(type == "city"){
            let value = defautlValue ? [defautlValue.substring(0, 2) + "0000", defautlValue.substring(0, 4) + "00", defautlValue] : ""
            return (
                <Cascader options={CityConst} onChange={(e)=>this.onCascaderChange(e)} value={value} placeholder="未选择" />
            )
        }else{
            return (
                <Select className="select" value={defautlValue + ""} onChange={this.props.onChangeHandler}>
                    {
                        this.props.options.map((obj, index) => 
                            <Select.Option key={index} value={obj.value  + ""}>{obj.name}</Select.Option>
                        )
                    }
                </Select>
            )
        }
    }

    render(){
        let { title, defautlValue, isShowAdd } = this.props
        return (
            <div className="selectItem">
                <div>
                    <span className="selectItem-title">{title}</span>
                    {isShowAdd ? <Icon className="btn-add" type="plus-circle-o" onClick={this.props.onAddHandler} /> : ""}
                </div>
                { this.getComponents() }
            </div>
        )
    }
}

SelectItem.PropTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    defautlValue: PropTypes.any,
    onChangeHandler: PropTypes.func.isRequired,
    isShowAdd: PropTypes.bool.isRequired,
    onAddHandler: PropTypes.func
}

export default SelectItem