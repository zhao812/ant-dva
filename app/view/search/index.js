import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router' 

import SelectResultContainer  from './selectResult'
import SelectContainer from './selectContainer'
import AntVContainer from './antVContainer'
import FavoriteContainer from './favoritePop'

import { getSearchMenu } from './reducer/actions'

import * as RouterConst from '../../static/const'

import './index.scss'

class SearchList extends React.Component {

    constructor(props,context) {
        super(props,context)

        this.state = {
            isShowFavorite: false,
            btnFavoriteStatus: true
        }
    }
    
    componentDidMount(){
        this.props.getSearchMenu()
    }

    onShowFavorite = () => {
        this.setState({isShowFavorite: true})
    }

    onCloseFavorite = () => {
        this.setState({isShowFavorite: false, btnFavoriteStatus: true})
    }

    onChangeBtnFavoriteStatus = val => {
        this.setState({btnFavoriteStatus: val})
    }

    render(){
        return (
            <div className="search-container">
                <div className="search-title">
                    <span>筛选条件</span>
                    <Link to={RouterConst.ROUTER_FAVORITE}>查看收藏用户群</Link>
                </div>
                
                <SelectResultContainer />
                <SelectContainer onShowFavorite={()=>this.onShowFavorite()} btnFavoriteStatus={this.state.btnFavoriteStatus} onChangeBtnFavoriteStatus={(value)=>this.onChangeBtnFavoriteStatus(value)}/>
                <AntVContainer />
                {this.state.isShowFavorite ? <FavoriteContainer onCloseHandler={()=>this.onCloseFavorite()}/> : ""}
            </div>
        )
    }
}

SearchList.PropTypes = {
    menuData: PropTypes.array.isRequired,
}

let mapStateToProps = state => ({
    menuData: state.searchList.menuData
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getSearchMenu }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchList)