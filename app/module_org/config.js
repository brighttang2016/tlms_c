/**
 * Created by pujjr on 2017/7/19.
 */
angular.module('com.app.org',[
    'com.app.org.controller.OrgController',
    'com.app.service.OrgService'
]);
angular.module('myApp')
    .config(function($stateProvider,$urlRouterProvider){
        $stateProvider.state('app.org',{
            url:'/org',
            abstract:true,
            template: '<div ui-view class="fade-in-up"></div>'
        }).state('app.org.manage',{
            url:'/manage',
            templateUrl:'html/module_org/tpl/OrgManage.html'
        });
    });
