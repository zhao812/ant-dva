import * as ActionTypes from './ActionTypes'
const initialState = {
    data:[],
    count:0
}
function getData(msg){
    return msg.map((item, key)=>{
        // if (item.sendTunnel=="短信"){
        //         return {  img: "1" , ...item }
        // }else if(item.sendTunnel=="短信"){
        //         return {  img: "2" , ...item }
        // }else{
        //         return {  img: "3" , ...item}
        // }
        if (item.status=='等待中'){
                return {"status":"<img src='../images/icon_1.png'/>等待中",}
        }else if(item.status=='完成'){
                return {  "status": "<img src='../images/icon_2.png'/>等待中" , ...item }
        }else{
                return {  "status": "<img src='../images/icon_3.png'/>等待中" , ...item }
        }
    })
}
export default function update (state = initialState, action){
    switch(action.type){
        case ActionTypes.Active_List:
        console.log(action)
            return { 
                data: getData(action.data.dataList ),
                count:action.data.count
            }
        default:
            return state
    }
}