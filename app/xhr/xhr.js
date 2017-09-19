/**
 * Created by pujjr on 2017/7/10.
 */
//拦截器定义(创建拦截器服务)
angular.module('com.tang.intercepter',[])
    .factory('myInterceptor',function($q){
    var interceptor = {
        'request':function(config){
            //console.log(config);
            //alert("request");
            //每次http请求，token数据放入http头中
            config.headers.token = getCookie('token');
            config.headers.expireTime = getCookie('expireTime');
            // 成功的请求方法
            return config; // 或者 $q.when(config);
        },
        'response':function(response){
            //console.log($q);
            //console.log(response);
            var token = response.headers('token');
            var expireTime =  response.headers('expireTime');
            setCookie('token',token,expireTime);
            // 响应成功
            return response; // 或者 $q.when(config);
        },
        'requestError':function(rejection){
            //console.log(rejection);
            // 请求发生了错误，如果能从错误中恢复，可以返回一个新的请求或promise
            return response; // 或新的promise
            // 或者，可以通过返回一个rejection来阻止下一步
            // return $q.reject(rejection);
        },
        'responseError':function(rejection){
            //console.log(rejection);
            // 请求发生了错误，如果能从错误中恢复，可以返回一个新的响应或promise
            return rejection; // 或新的promise
            // 或者，可以通过返回一个rejection来阻止下一步
            // return $q.reject(rejection);
        }
    };
    return interceptor;
});
//注册拦截器
app.config(function($httpProvider) {
    $httpProvider.interceptors.push('myInterceptor');
    //console.log($httpProvider.defaults.headers.common);
    /*  //扩充http头
     $httpProvider.defaults.headers.post['token'] = getCookie('token');
     $httpProvider.defaults.headers.post['expireTime'] = getCookie('expireTime');*/
});