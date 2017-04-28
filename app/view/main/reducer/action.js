import HTTPUtil from '../../../components/fetch'

const menuData = data => ({
    data : data
})
//进入加载数据
export const getMenu = () => dispatch => {
    let url = "/mock/menu";
    dispatch(HTTPUtil.get(url, null, null).then((data)=>{
        console.log(data)
    }))
}
