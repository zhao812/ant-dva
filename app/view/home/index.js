import React from 'react';
import './index.scss';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {getUserNumber} from './reducer/action';
class Index extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            num:[]
        }
    }
    componentWillMount(){
    }

    componentDidMount(){
         let  sz=[];
         this.props.getUserNumber().then((data) => {
             let oData=data.result.toString();
                for(var i=0;i<oData.length;i++){
                    sz.push(oData[i])
                }
            }).then(()=>(this.setState({
                num:sz
            })))
    }
    
    render(){
        console.log(this.state.num)
        return (
            <div className="dataPlatform">
                <h6>用户画像大数据平台</h6>
                <div>
                    {
                        this.state.num.map(function(item,key){
                            return(
                                 <span key={key}>{item}</span>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}
Index.propTypes = {
}

let mapStateToProps = state => ({
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUserNumber }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)