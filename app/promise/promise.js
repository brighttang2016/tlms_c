/**
 * Created by pujjr on 2017/7/3.
 */
var app = angular.module('MyApp',[
    "ngRoute",
    "MyApp.MyController",
    "MyApp.MyService"])
    .config(['$locationProvider',function($locationProvider){
        $locationProvider.html5Mode(false);
        $locationProvider.hashPrefix('');
 }]);

app.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/',{
        templateUrl:'template.html',
        controller:'IndexController'
    });
}]);

