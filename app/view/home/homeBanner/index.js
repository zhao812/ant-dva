import React, { PropTypes } from 'react'

import { Button } from 'antd'
import BannerAnim from 'rc-banner-anim'
import QueueAnim from 'rc-queue-anim'
import TweenOne from 'rc-tween-one'

import './index.scss'
import '../../../static/css/banner.scss'
import banner1 from '../image/banner1.jpg'
import banner2 from '../image/banner2.jpg'

class HomeBanner extends React.Component {

    constructor(props, content) {
        super(props, content)

        this.state = {
            bgStyle1: {
                backgroundImage: 'url('+banner1+')',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            },
            bgStyle2: {
                backgroundImage: 'url('+banner2+')',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }
        }
    }

    openHandler(){

    }

    viewHandler(){

    }

    getNumberItems(){
        let arr = this.props.data.toString().split(""), len = arr.length
        return arr.reverse().map(function (item, key) {
            return (
                <span className="number-item" key={key}>
                    { (key + 1) % 3 == 0 && (key + 1) < len ? <span className="fuhao"></span> : ""}
                    <span className="number">{item}</span>
                </span>
            )
        }).reverse()
    }

    render() {
        let { Element } = BannerAnim, BgElement = Element.BgElement


        return (
            <BannerAnim prefixCls="banner-user">
                <Element key="banner1" prefixCls="banner-user-elem banner1">
                    <BgElement key="bg" className="bg" style={this.state.bgStyle1} />
                    <QueueAnim className="title-anim" name="QueueAnim">
                        <p className="big-title" key="p1">用户画像大数据平台</p>
                        <p className="sub-title" key="p2">覆盖活跃用户</p>
                    </QueueAnim>
                    <TweenOne className="tween1" animation={{ y: 80, opacity: 0, type: 'from', delay: 200 }} name="TweenOne1">
                        { this.getNumberItems() }
                    </TweenOne>
                    <TweenOne className="tween2" animation={{ y: 100, opacity: 0, type: 'from', delay: 300 }} name="TweenOne2">
                        <Button className="btn-open" onClick={()=>this.openHandler()}>立即开启画像营销</Button>
                    </TweenOne>
                </Element>
                <Element key="banner2" prefixCls="banner-user-elem banner2">
                    <BgElement key="bg" className="bg" style={this.state.bgStyle2} />
                    <QueueAnim name="QueueAnim">
                        <p key="p1" className="yellow-title">千人千面·用户标签</p>
                        <p key="p2" className="sub-title">稀缺数据独家开发，洞悉用户需求，助力商业决策</p>
                    </QueueAnim>
                    <TweenOne className="tween2" animation={{ y: 80, opacity: 0, type: 'from', delay: 200 }} name="TweenOne2">
                        <Button className="btn-view" onClick={()=>this.viewHandler()}>立即查看</Button>
                    </TweenOne>
                </Element>
            </BannerAnim>
        )
    }
}

HomeBanner.PropTypes = {
    data: PropTypes.number.isRequired
}

export default HomeBanner