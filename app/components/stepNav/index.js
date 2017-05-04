import React from 'react'
import './index.scss' 

class StepNav extends React.Component{
    constructor(props) {
        super(props);
        
    }
    handleMenuClick(e){
        
    }
    componentDidMount(){
    }
    render(){
        return (
           <div className="steps">
                <ul>
                    <li className={this.props.stepNum==1?"stepOne active":"stepOne"}>
                        <span>1</span>发给谁
                        <i className="triangle-right-bg"></i>
                        <i className="triangle-right"></i>
                    </li>
                    <li className={this.props.stepNum==2?"stepTwo active":"stepTwo"}>
                        <span>2</span>发什么
                        <i className="triangle-right-bg"></i>
                        <i className="triangle-right"></i>
                    </li>
                    <li className={this.props.stepNum==3?"stepThree active":"stepThree"}>
                        <span>3</span>准备发
                    </li>
                </ul>
            </div>
        )
    }
}

export default StepNav