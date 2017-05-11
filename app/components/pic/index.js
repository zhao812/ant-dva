import React from 'react'
import { Icon,Button ,Input ,Form,Upload, message } from 'antd'

const FormItem = Form.Item;

function getBase64(img, callback) {
const reader = new FileReader();
reader.addEventListener('load', () => callback(reader.result));
reader.readAsDataURL(img);
}

function beforeUpload(file) {
const isJPG = file.type === 'image/jpeg';
if (!isJPG) {
message.error('只能输入JPG图片');
return false;
}
const isLt2M = file.size / 1024 / 1024 < 2;
if (!isLt2M) {
message.error('图片不能大于2M');
return false;
}
//return isJPG && isLt2M;
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
render() {
    const imageUrl = this.state.imageUrl;
    return (
            <FormItem
                    label="图片" labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
            >
                <Upload className="avatar-uploader"
                        name="avatar"
                        showUploadList={false}
                        action="//jsonplaceholder.typicode.com/posts/"
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange}>
                    {
                    imageUrl ?
                    <img src={imageUrl} alt="" className="avatar"/> :
                    <Icon type="plus" className="avatar-uploader-trigger"/>
                    }
                </Upload>
            </FormItem>
        )
    }
}
export default Pic;