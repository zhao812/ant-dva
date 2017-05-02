var HTTPUtil = {};  
  import 'whatwg-fetch'  // 可以引入fetch来进行Ajax
/** 
 * 基于 fetch 封装的 GET请求 
 * @param url 
 * @param params {} 
 * @param headers 
 * @returns {Promise} 
 */  
export function fetchGet (url, params, headers) {
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
            return data;
        })  
    }
    
}  
  
  
/** 
 * 基于 fetch 封装的 POST请求  FormData 表单数据 
 * @param url 
 * @param formData   
 * @param headers 
 * @returns {Promise} 
 */  
HTTPUtil.post = function(url, formData, headers) {  
    return new Promise(function (resolve, reject) {
        
      fetch(url, {  
            method: 'POST',  
            headers: headers,  
            body:formData,  
          })  
          .then((response) => {
              if (response.ok) {  
                  return response.json();  
              } else {  
                  reject({status:response.status})  
              }  
          })  
          .then((response) => {  
              resolve(response);  
          })  
          .catch((err)=> {  
            reject({status:-1});  
          })  
    })  
}  
