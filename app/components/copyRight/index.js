import React, { PropTypes } from 'react'
import QRCode from 'qrcode.react' 

import './index.scss'

class CopyRights extends React.Component{
    
    constructor(props, context){
        super(props, context)
    }

    render(){
        return (
            <div className="copyrights-div">
                <div className="copyrights-align">
                    <div className="text-div">
                        <p>Copyright © 1998-2016 Ficus-hederacea. All Rights Reserved.</p>
                        <p>藤榕网络 版权所有</p>
                    </div>
                    <QRCode value="https://www.qbao.com/" size={58} />
                </div>
            </div>
        )
    }
}

export default CopyRights