/**
 * Created by pujjr on 2017/7/3.
 */
angular.module('MyService',[])
    .factory('githubService',['$q','$http',function($q,$http){
        console.log("githubService");
        var getPullRequests = function(){
            var deffered = $q.defer();
            var promise = deffered.promise;
            var progess;
            $http({
                method:'POST',
                url:'http://localhost:8090/tlms-web/login/userLogin',
                data:{}
            }).then(function(response){
                alert('请求返回成功');
            },function(response){
                alert('error');
            });
            return promise;
        };
        return {
            getPullRequests: getPullRequests
        };
    }]);