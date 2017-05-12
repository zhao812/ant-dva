import * as HTTPUtil from '../../../components/fetch'
import * as ActionType from './actionType'

let receiveData = data => ({
    type: ActionType.MESSAGE_LIST_UPDATE_TABLE,
    data: data
})


export const getMessageList = () => dispatch => {
    let url = "mock/messageData.json"
    dispatch(HTTPUtil.fetchGet(url, null, null)).then(data=>dispatch(receiveData(data)))
}