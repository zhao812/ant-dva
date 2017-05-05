import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import MirrorItem from './MirrorItem'

import { getUserMirror } from './reducer/actions'

import './index.scss'


class UserMirror extends React.Component{

    constructor(props, context) {
        super(props, context)
    }
    
    componentDidMount(){
        this.props.getUserMirror()
    }

    render(){
        return (
            <div className="user-mirror-container">
                <div className="user-mirror-title">用户标签: {this.props.username}</div>
                { this.props.data.map((obj, key) => <MirrorItem key={key} data={obj} />) }
            </div>
        )
    }
}

UserMirror.PropTypes = {
    data: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired,
}

let mapStateToProps = state => ({
    data: state.userMirror.mirrorData,
    username: state.userMirror.username
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUserMirror }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMirror)