import * as HTTPUtil from '../../../components/fetch'
import * as ActionType from './actionType'

let receiveData = data => ({
    type: ActionType.USER_MIRROR_UPDATE,
    data: data
})

export const getUserMirror = () => dispatch => {
    let url = 'userMirror'
    dispatch(HTTPUtil.fetchGet(url, null, null)).then((data)=>dispatch(receiveData(data)))
}