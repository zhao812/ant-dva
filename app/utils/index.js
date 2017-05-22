import Citys from '../static/const/citys'

/**检测是否为邮箱 */
export const checkEmail = email => {
    let reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
    if(!reg.test(email)) return false
        
    return true
}

export const formatDate = (time, format) => {
    let t = new Date(time);
    let tf = (i) => { return (i < 10 ? '0' : '') + i }
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, (a) => {
        switch (a) {
            case 'yyyy':
                return tf(t.getFullYear());
            case 'MM':
                return tf(t.getMonth() + 1);
            case 'mm':
                return tf(t.getMinutes());
            case 'dd':
                return tf(t.getDate());
            case 'HH':
                return tf(t.getHours());
            case 'ss':
                return tf(t.getSeconds());
        }
    })
}

export const getCityNameByValue = code => {
    let c1 = Citys.find(c => c.value == code.substring(0, 2) + "0000")
    if(!c1) return ""

    let c2 = c1.children.find(c => c.value == code.substring(0, 4)+"00")
    if(!c2) return c1.label

    let c3 = c2.children.find(c => c.value == code)
    if(!c3) return c1.label + "/" +c2.label

    return c1.label + "/" +c2.label + "/" +c3.label
}

export const setCookie = (c_name, value, expiredays=null, path="/") =>{
    let exdate=new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie=c_name+ "=" +escape(value)+
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString()) +
    ((path==null) ? "" : ";path="+path)
}

export const getCookie = name => {
    let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)){
        return unescape(arr[2]);
    }
    
    return null;
}

