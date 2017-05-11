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
          const {title,url,content,data,reLang,oUrl,oImg,code,iframeUrl,fileString}=this.props;
          let component=data?data.map((item, index)=>{
                if(data[index].type=='txt'&&data[index].value){
                  return <div key={index} className="showTitle">{data[index].value}</div>
                }else if(data[index].type=='pic'&&data[index].value){
                  return <img key={index} src={data[index].value} alt="" className="avatar" /> 
                }
          }):"";
          let iframe=iframeUrl?<div className="iframes" ><iframe src={iframeUrl}></iframe></div>:"";
          let oHtml=fileString?<div dangerouslySetInnerHTML={{__html: fileString}}  className="oHtml"/>:"";
          return (
              <div className="ip"  onClick={(e)=>this.handlerLinkUrl(e)}>
                  <div className="oIp">
                      <div className={title||content?"oHead":""}>
                        <div>{title}</div>
                        <div className="content">{content}</div>
                      </div>
                      {component}

                      {iframe}

                      {oHtml}
                  </div>
              </div>
          );
        }
};
export default Mobile;