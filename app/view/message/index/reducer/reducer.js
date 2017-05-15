import * as ActionTypes from './ActionTypes'
const initialState = {
    data:[],
    count:0
}
function getData(msg){
    return msg.map((item, key)=>{
        switch (item.sendTunnel){
            case '1':
                return {  img: "1" , ...item }
            case '2':
                return {  img: "2" , ...item }
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