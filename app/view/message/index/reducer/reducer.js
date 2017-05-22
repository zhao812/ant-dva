import * as ActionTypes from './ActionTypes'
const initialState = {
    data:[],
    count:0
}
function getData(msg){
    return msg.map((item, key)=>{
        switch (item.tunnelId){
            case 1:
                return {  ...item ,img: "1"  }
            case 2:
                return {  ...item ,img: "2" }
            default:
                return item;
            
        }

        
    })
    
}
export default function update (state = initialState, action){
    switch(action.type){
        case ActionTypes.Active_List:
            return { 
                data: getData(action.data.dataList),
                count:action.data.count
            }
        default:
            return state
    }
}