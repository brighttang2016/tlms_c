/**
 * Created by pujjr on 2017/6/29.
 */

//
angular.module('com.tang.controller.MyController1',[])
    .controller('MyController1',['$scope','$http','xhrService',function($scope,$http,xhrService){
        $scope.$on('loginReturnEvent',function(event,param){
            //alert("收到服务层返回事件");
            console.log(param);
            $scope.id = param.data.id;
        });
        alert("MyController1");
        $scope.login = function(){
            alert("login");
            xhrService.login('200810405234',$scope)
                .then(function(result){
                    alert('服务返回成功');
                    $scope.$emit('loginReturnEvent',result);
                },function(error){

                },function(progress){

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
}]);


