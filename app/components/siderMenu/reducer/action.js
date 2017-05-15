import * as HTTPUtil from '../../fetch'
import * as ActionTypes from './ActionTypes'


export const getCurrent =(current) => dispatch => {
    dispatch({
        type : ActionTypes.GetCurrent,
        current: current
    })
}
export const getOpenKeys =(openKeys) => dispatch => {
    dispatch({
        type : ActionTypes.GetOpenKeys,
        openKeys: openKeys
    })
}
