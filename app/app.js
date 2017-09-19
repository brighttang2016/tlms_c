/**
 * Created by pujjr on 2017/7/11.
 */
var app = angular.module('myApp',[
    'ui.router',
    'ngAnimate',
    'toaster',

    'ngAnimate',
    // 'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'ui.router',
    'ui.bootstrap',
    'ui.load',
    //'ui.jq',//延迟加载jquery构件
    'ui.validate',
    'oc.lazyLoad',
    'pascalprecht.translate',
    'ncy-angular-breadcrumb',
    'ngWebSocket',
    'com.tang.intercepter',
    'com.tang.controller.MyController1',
    'com.tang.service.XhrService',
    'com.tang.controller.MyController2',
    'com.tang.controller.LoginController',
    'com.tang.directive.LoginDirective',
    //'com.tang.appController',
    'com.tang.controller.RouterController',
    'com.tang.controller.ToasterController',
    'com.app.user',
    'com.app.callcenter'

]);
app.config(function($httpProvider) {
    $httpProvider.interceptors.push('myInterceptor');
    //console.log($httpProvider.defaults.headers.common);
    /*  //扩充http头
     $httpProvider.defaults.headers.post['token'] = getCookie('token');
     $httpProvider.defaults.headers.post['expireTime'] = getCookie('expireTime');*/
});

app.config(['$locationProvider',function($locationProvider){
    //$locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('');
}]);
