/**
 * Created by pujjr on 2017/7/26.
 */
angular.module('com.app.user.controller',[])
    .controller('UserController',['$scope','$rootScope',function($scope,$rootScope){
        console.log("**************UserController*****************");
        console.log($scope);
        var globalParam = "";//全局变量测试
        $scope.showCallCenter = function(){
            globalParam = '全局变量测试';
            console.log("doActiveCallCenter："+globalParam);
            $rootScope.$emit($rootScope.eventShowCallCenter,{"msg":""});
        };
        $scope.hideCallCenter = function(){
            console.log("doActiveCallCenter:"+globalParam);
            $rootScope.$emit($rootScope.eventHideCallCenter,{"msg":""});
        }
    }]);
