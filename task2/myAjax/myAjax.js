function formateData(data){
    var arr = [];
    // 格式化数据一下，避免一些特殊字符出现影响http请求，造成url出错
    for ( let key in data){
     arr.push(  encodeURIComponent(key) + '=' + data[key] )   
    }
    return arr.join('&')
}

function myAjax(_params) {
    // 预处理传过来的参数
    let params = _params || {};
     params.data = _params.data ||{} 



     params.data = formateData(params.data)
     params.type = (_params.type || 'GET').toUpperCase();
        var xhr =  null;
        if(window.XMLHttpRequest){
            xhr = new XMLHttpRequest()
        }else{
            xhr = ActiveXObject('Microsoft.XMLHTTP')
        }


        // if(! params.type === 'GET' || 'POST' ||'DELETE' || 'OPTIONS' ||'TRACE' ||'CONNECT' ||'PUT' ||'HEAD'){
        //     throw ('请求类型错误，请修改您的请求类型')
        // }
         if(params.type === 'GET'){
            xhr.open(params.type,params.url + '?' + params.data,true)
            xhr.send();
        }
        else{
            xhr.open(params.type,params.url,true)
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
            xhr.send(params.data)
        }

        // 当 readyState === 4 时，会触发xhr.onload事件 
        xhr.onload = function () {
            if (xhr.status === 400 ||304||206){
                var res;

                if(params.success && params.success instanceof Function ){
                    res = xhr.responseText;
                    params.success.call(xhr,res)
                }
                else {
                   if (params.error && params.error instanceof Function){
                    res = xhr.responseText;
                    params.error.call(xhr,res)
                }
            }
            }
        }

       
}









