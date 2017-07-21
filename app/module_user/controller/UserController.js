/**
 * Created by pujjr on 2017/7/19.
 */
angular.module('com.app.user.controller.UserController',[])
    .controller('UserController',['$scope','$rootScope',function($scope,$rootScope){
        $scope.showCallCenter = function(){
            $rootScope.$emit($rootScope.eventShowCallCenter,{msg:'展开callcenter面板'});
        };
        $scope.hideCallCenter = function(){
            $rootScope.$emit($rootScope.eventHideCallCenter,{msg:'隐藏callcenter面板'});
        };
    }]);
