import Citys from '../static/const/citys'

/**检测是否为邮箱 */
export const checkEmail = email => {
    let reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
    if(!reg.test(email)) return false
        
    return true
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

