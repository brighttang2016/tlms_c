/**
 * Created by pujjr on 2017/6/30.
 */
/*angular测试一直报错 20170630*/
// Add Restangular as a dependency to your app
/*var app = angular.module('myApp', ['restangular']);

// Inject Restangular into your controller
app.controller('MyController1', function($scope, Restangular) {
    $scope.doTrans = function(){
        alert("tttt");
    };
});*/


var app = angular.module('myApp', ['restangular','lodash']);

// Inject Restangular into your controller
app.controller('MyController1', function($scope,Restangular) {
  /*  $scope.doTrans = function(){
    };*/
});
