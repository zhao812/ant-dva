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
      handlerClicktuijianUrl(e){
        window.location.href=this.props.oUrl
      }
      render() {
          const {title,url,content,imageUrl,essay,reLang,oUrl,oImg}=this.props;
          return (
              <div className="ip">
                  <div className="oIp">
                      {reLang?
                        <div onClick={(e)=>this.handlerClicktuijianUrl(e)}>
                          <div className="tuijian">{reLang||""}</div>
                          {oImg ?<Upload className="showImg">
                            <img src={oImg} alt="" className="avatar" /></Upload> :"" }
                        </div>:""
                      }
                      
                      
                      <div className={essay?"oFooter":""}>{essay}</div>
                      <div className={title||content?"oHead":""}>
                        <div onClick={url?(e)=>this.handlerLinkUrl(e):""}>{title}</div>
                        <div className="content">{content}</div>
                      </div>
                      {imageUrl ?<Upload className="showImg"><img src={imageUrl} alt="" className="avatar" /></Upload> :"" }
                      <div className={essay?"oFooter":""}>{essay}</div>
                  </div>
              </div>
          );
        }
};
export default Mobile;