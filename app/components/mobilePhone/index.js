import React from 'react';
import './index.scss';
import { Upload, Icon, message } from 'antd';

class Mobile extends React.Component{
      constructor(props){
        super(props);
        this.state={
          value:"",
          number:0
        } 
      }
      handlerLinkUrl(e){
        window.location.href=this.props.url
      }
      render() {
          const {logo,title,url,content,data,reLang,oUrl,oImg,code,iframeUrl,fileString,wapLink}=this.props;
          console.log(content,293848)
          let component=data?data.map((item, index)=>{
                if(item.type=='txt'&&item.value){
                  return <div key={index} className="showTitle">{item.value}</div>
                }else if(item.type=='pic'&&item.value){
                  return <img key={index} src={item.value} alt="" className="avatar" /> 
                }
          }):"";
          let iframe=iframeUrl?<div className="iframes" ><iframe src={iframeUrl}></iframe></div>:"";
          let icon=logo?<img src={logo} width="10px" />:""; 
          let oHtml=fileString?<div dangerouslySetInnerHTML={{__html: fileString}}  className="oHtml"/>:"";
          return (
            <div>
              <div className="phoneBg">
              </div>
              <div className="mobileContent">
              <div className="mobileClose" onClick={this.props.oClose.bind(this,0)}>
                <Icon type="close" className="mob_closeicon"/>
              </div>

              <div className="ip"  onClick={(e)=>this.handlerLinkUrl(e)}>
                  <div className="oIp">
                      <div className={title||content?"oHead":""}>
                        {icon}
                        <div>{title}</div>
                        {content||wapLink? <div className="content">{content} <a className="wapLink">{wapLink}</a></div>:""}
                       
                      </div>
                      {component}

                      {iframe}

                      {oHtml}
                  </div>
              </div>
              </div>
            </div>
          );
        }
};
export default Mobile;