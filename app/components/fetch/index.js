import { Modal, Button } from 'antd';

var HTTPUtil = {};
import 'whatwg-fetch'  // 可以引入fetch来进行Ajax
/** 
 * 基于 fetch 封装的 GET请求 
 * @param url 
 * @param params {} 
 * @param headers 
 * @returns {Promise} 
 */
export function fetchGet(url, params, headers) {
    if (process.env.NODE_ENV == "develop") {
        url = "mock/" + url + ".json"
    }

    return (dispatch, getState) => {
        if (params) {
            let paramsArray = [];
            //encodeURIComponent  
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }

        return fetch(url, {
            method: 'GET',
            headers: headers,
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data && !data.success) {
                Modal.error({
                    title: '提示',
                    content: data.message,
                });
                return false;
            }
            return data.data;
        })
    }

}


/** 
 * 基于 fetch 封装的 POST请求  FormData 表单数据 
 * @param url 
 * @param formData   
 * @returns {Promise} 
 */
export function fetchPost(url, formData) {

    return (dispatch, getState) => {
        let method = "POST"
        if (process.env.NODE_ENV == "develop") {
            url = "mock/" + url + ".json"
            method = "GET"
        }

        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS"
        }

        return fetch(url, {
                method: method,
                headers: headers,
                //body: JSON.stringify(formData)
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data && !data.success) {
                    Modal.error({
                        title: '提示',
                        content: data.message,
                    });
                    return false;
                }
                return data.data || null;
            })
    }
}  
