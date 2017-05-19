import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Table, Icon,Button ,Menu, Dropdown  } from 'antd';
import './index.scss'

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">个推</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">极光推送</a>
    </Menu.Item>
  </Menu>
);

class setUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            data: ""
        }
    }

   
    componentDidMount() {
     
    }

    render() {
        return (
          <div></div>
        );
    }
}


setUp.propTypes = {
}

let mapStateToProps = state => ({
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(setUp)