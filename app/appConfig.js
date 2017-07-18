/**
 * Created by pujjr on 2017/7/18.
 */
angular.module('myApp')
    .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
        $urlRouterProvider.otherwise('/home');
    }]);
