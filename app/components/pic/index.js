import React from 'react'
import { Icon,Button ,Input ,Upload, Modal } from 'antd'
import NumberInput from '../numberInput'

function getBase64(img, callback) {
const reader = new FileReader();
reader.addEventListener('load', () => callback(reader.result));
reader.readAsDataURL(img);
}

function beforeUpload(file) {
const isJPG = file.type === 'image/jpeg';
if (!isJPG) {
Modal.error('只能输入JPG图片');
return false;
}
const isLt2M = file.size / 1024 / 1024 /1024 *300 < 300;
if (!isLt2M) {
Modal.error('图片不能大于300K');
return false;
}
return  isLt2M;
}
let datas=[]
class Pic extends React.Component{

constructor(props) {
    super(props)
    this.state = {
        imageUrl:""
    }
}
handleChange = (info) => {
    if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, imageUrl => {
            this.setState({ imageUrl })
            this.props.pic(imageUrl)
        });
    }
}
handlerChangeContent(index,e){
    this.props.txt(index,e)
}
handlerClick(index,event){
    event.stopPropagation();
    this.props.del(index)
}
render() {
    const imageUrl = this.state.imageUrl;
    return (
            <li className="addPics">
                <span>页面</span>
                <Upload className="avatar-uploader"
                        name="avatar"
                        showUploadList={false}
                        action="//jsonplaceholder.typicode.com/posts/"
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange}>
                    {
                    imageUrl ?
                    <div>
                        <img src={imageUrl} alt="" className="avatar"/>
                        <div className="modfieldUpload">更改</div>
                        <div className="closeUpload" onClick={this.handlerClick.bind(this,['index','event'])}>
                            <Icon type="close" className="closeBtn" />
                        </div>
                    </div> :
                    <div>
                        <div className="add-icon">
                            <div className="iconBg"></div>
                            <Icon type="plus" className="avatar-uploader-trigger"/>
                        </div>
                        <span>上传图像分辨率1200 x 800，300kb以内</span>
                    </div>
                    }
                </Upload>
                <NumberInput number={180} isOne={6} nInputValue={this.handlerChangeContent.bind(this)} />
            </li>
        )
    }
}
export default Pic;