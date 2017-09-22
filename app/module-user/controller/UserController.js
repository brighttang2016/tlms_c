/**
 * Created by pujjr on 2017/7/26.
 */
angular.module('com.app.user.controller')
    .controller('UserController',['$scope','$rootScope','TlmsRestangular','$state',function($scope,$rootScope,TlmsRestangular,$state){

        $scope.user = {};
        $scope.signIn = function(){
            console.log($scope.user);
            TlmsRestangular.all('login/userLogin').post( $scope.user)
                .then(function(data){
                    console.log("用户登录");
                    console.log(data);
                    $state.go('app');
                })
        };
        /*console.log("**************UserController*****************");
        console.log($scope);
        var globalParam = "";//全局变量测试
        $scope.extendTest = '集成测试（UserController初始化数据）';
        $scope.applyPhone = "1111111";
        $scope.applyPhone2 = "22222222222";
        $scope.showCallCenter = function(){
            globalParam = '全局变量测试';
            console.log("doActiveCallCenter："+globalParam);
            $rootScope.$emit($rootScope.eventShowCallCenter,{"msg":""});
        };
        $scope.hideCallCenter = function(){
            console.log("doActiveCallCenter:"+globalParam);
            $rootScope.$emit($rootScope.eventHideCallCenter,{"msg":""});
        };

        var userList =  TlmsRestangular.all('user').getList();
        console.log("UserService");
        console.log(userList);*/
    }]);
