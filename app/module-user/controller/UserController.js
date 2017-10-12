/**
 * Created by pujjr on 2017/7/26.
 */
angular.module('com.app.user.controller')
    .controller('UserController',['$scope','$rootScope','TlmsRestangular','$state','CookieService','StorageService',function($scope,$rootScope,TlmsRestangular,$state,CookieService,StorageService){

        console.log("*****UserController*****");
        console.log($rootScope);
        console.log(StorageService.getStorage("user"));
        if( StorageService.getStorage("user") != null  && StorageService.getStorage("user") != 'user')
            $rootScope.user = StorageService.getStorage("user");
        else{
            //StorageService.clearStorage();
        }
        //$rootScope.user = CookieService.getCookie('user');
        $scope.signIn = function(){
            console.log($scope.user);
            TlmsRestangular.all('user/signin').post($scope.user)
                .then(function(data){
                    //StorageService.clearStorage();
                    CookieService.setCookie('user',$scope.user);
                    StorageService.setStorage('user',$scope.user);
                    $rootScope.user = {};
                    $rootScope.user.userId = "200810405234";
                    console.log("用户登录");
                    console.log(data);
                    console.log($scope);
                    console.log($scope.user);
                    console.log($scope.user.userId);
                    var userId = $scope.user.userId + '';
                    $rootScope.user.userId = $scope.user.userId;
                    console.log($rootScope);
                    $rootScope.user.userId = userId;
                    console.log($rootScope);
                    $state.go('app');
                });
        };

        $scope.signOut = function(){
            /*TlmsRestangular.all('service/signout').post($scope.user)
                .then(function(data){
                    console.log("用户登出");
                    $state.go('signin');
                });*/
            $state.go('signin');
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
