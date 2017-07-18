/**
 * Created by pujjr on 2017/7/3.
 */
angular.module('MyApp.MyService',[])
    .factory('loginService',['$q','$http','$timeout','$interval',function($q,$http,$timeout,$interval){
        console.log("loginService");

        var getPullRequests = function(){
            var deferred = $q.defer();
            //deferred.resolve($q.reject("Can't update user"));
            //deferred.reject("登录失败");
            //deferred.notify("登录信息");
            //deferred.notify('notify');
            //deferred.resolve("返回");
            //var promise = deferred.promise;
            var progess;
            $http({
                method:'POST',
                url:'http://localhost:8090/tlms-web/login/userLogin',
                data:{}
            }).then(function(response){
                var i = 0;//模拟处理进度
                var exeTime = 10;//执行次数
                var timeInterval = 100;//每次间隔200毫秒
                alert('请求返回成功');
                //deferred.resolve("处理成功");
                //deferred.reject("处理失败");
                //deferred.notify("处理进度");
                $interval(function(){
                    i ++;
                    deferred.notify("处理进度"+i+"%");//promiseController，then中的notifyFn每隔一秒执行一次，一共执行
                    //deferred.resolve("处理进度"+i+"%");//promiseController，then中的successFn仅执行一次
                    //deferred.reject("处理进度"+i+"%");//promiseController，then中的errFn仅执行一次
                    console.log("处理进度"+i+"%");
                },timeInterval,exeTime);
                deferred.resolve("处理成功");
            },function(response){
                //deferred.reject(response);
                alert('error');
            });
            return deferred.promise;
        };

        var getUserName = function(){

        };

        /**
         * notify测试
         * 总结： deferred.notify("notify");必须在单独线程中
         */
       var defer1 = $q.defer();
        function fun() {
            var deferred = $q.defer();
           //$interval(function () {
            $timeout(function () {
                deferred.notify("notify");
                deferred.resolve("ttt");
            }, 1000);
            return deferred.promise;
        }

        $q.when(fun())
            .then(function(success){
                console.log("success");
                console.log("11111"+success);
            },function(err){
                console.log("error");
                console.log("22222"+err);
            },function(notify){
                console.log("notify");
                console.log("33333"+notify);
            })
            .catch(function(reson){
                console.log("catch");
                console.log("44444"+reson);
            })
            .finally(function(final){
                console.log('finally');
                console.log("55555"+final);
            });

        return {
            "getPullRequests": getPullRequests,
            "getUsername":getUserName
        };

}]);