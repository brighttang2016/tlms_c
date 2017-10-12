/**
 * Created by pujjr on 2017/7/19.
 */
angular.module('com.app.uibootstrap',[
    'com.app.uibootstraop.controller'
]);
angular.module('com.app.uibootstraop.controller',[]);

angular.module('myApp')
    .config(function($stateProvider,$urlRouterProvider){
        $stateProvider.state('app.angularuibootstrap',{
            url:'/uibootstrap',
            abstract:true,
            template: '<div ui-view class="fade-in-up"></div>'
        }).state('app.angularuibootstrap.test',{
            url:'/test',
            templateUrl:'app/module-angularuibootstrap/tpl/angularuibootstrap.html'
        });
    });

