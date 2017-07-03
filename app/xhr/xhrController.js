/**
 * Created by pujjr on 2017/6/29.
 */
var app = angular.module('myApp',[]);
//
app.controller('MyController1',function($scope,$http){
    $scope.login = function(){
        alert("login");
        $http({
            method:'POST',
            url:'http://localhost:8090/tlms-web/login/userLogin',
            params:{'page':'1','province':'重庆市','city':'永川区'},
            data:{'name':'brighttang'}
        }).then(function(response){
            alert('请求返回成功');
            //console.log(response);
            //console.log(response.data);
            //console.log(response.status);
            //console.log(response.headers);
            //console.log(response.headers('token'));

            $scope.id = response.data.id;
        },function(response){
            alert('error');
            //console.log(response.data);
            //console.log(response.status);
            //console.log(response.headers);

        });
    };

    $scope.getToken = function(){
        $scope.token = getCookie('token');
    };

    $scope.doTrans = function(){
        //添加特定http头
        $http.defaults.headers.common['token'] = getCookie('token');
        $http.defaults.headers.common['expireTime'] = getCookie('expireTime');
        $http({
            method:'POST',
            url:'http://localhost:8090/tlms-web/login/doTrans',
            data:{}
        }).then(function(response){
            alert('请求返回成功');
        },function(response){
            alert('error');
        });
    };
});

//拦截器定义(创建拦截器服务)
app.factory('myInterceptor',function($q){
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
            console.log(rejection);
            // 请求发生了错误，如果能从错误中恢复，可以返回一个新的请求或promise
            return response; // 或新的promise
            // 或者，可以通过返回一个rejection来阻止下一步
            // return $q.reject(rejection);
        },
        'responseError':function(rejection){
            console.log(rejection);
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
    console.log($httpProvider.defaults.headers.common);
  /*  //扩充http头
    $httpProvider.defaults.headers.post['token'] = getCookie('token');
    $httpProvider.defaults.headers.post['expireTime'] = getCookie('expireTime');*/
});


/*app.controller('MyController2',function($scope,Restangular){

});*/

app.controller("MyController2", ["$scope", "$q", function ($scope, $q) {
    alert("MyController2");
    $scope.flag = true;
    $scope.handle = function () {
        var deferred = $q.defer();
        var promise = deferred.promise;
        console.log("1111");
        promise.then(function (result) {
            result = result + "you have passed the first then()";
            console.log(result);
            $scope.status = result;
            return result;
        }, function (error) {
            error = error + "failed but you have passed the first then()";
            console.log(error);
            $scope.status = error;
            return error;
        }).then(function(result){
            result = "第二个then  success";
            console.log(result);
        },function(error){
            error = "第二个then  error";
            console.log(error);
        });
        console.log("2222");
        if ($scope.flag) {
            deferred.resolve("you are lucky!");
        } else {
            deferred.reject("sorry, it lost!");
        }
        console.log("3333");
    }
}]);
