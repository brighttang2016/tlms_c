/**
 * Created by pujjr on 2017/7/3.
 */
angular.module('com.tang.service.XhrService',[])
    //.factory('xhrService',['$q','$http',function($q,$http){
    .factory('xhrService',['$http','$q',function($http,$q){
        var login = function(userId){
            console.log("**************************xhrService开始**************************");
            console.log(userId);
           var deferred = $q.defer();
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

                //$scope.id = response.data.id;
                //scope.$broadcast('loginReturnEvent',response);
                deferred.resolve(response);
            },function(response){
                alert('error');
                //console.log(response.data);
                //console.log(response.status);
                //console.log(response.headers);
                deferred.reject(response);
            });
            console.log("**************************xhrService结束**************************");
            return deferred.promise;
        };
        return {
            'login':login
        };
    }]);