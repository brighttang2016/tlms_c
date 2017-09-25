/**
 * Created by pujjr on 2017/7/19.
 */
angular.module('com.app.process',[
    'com.app.process.controller',
    'com.app.process.service',
    'com.app.process.directive'
]);
angular.module('com.app.process.directive',[]);
angular.module('com.app.process.controller',[]);

angular.module('myApp')
    .config(function($stateProvider,$urlRouterProvider){
        $stateProvider.state('app.process',{
            url:'/process',
            abstract:true/*,
            template: '<div ui-view class="fade-in-up"></div>'*/
        }).state('app.process.manage',{
            url:'/manage',
            templateUrl:'app/module-process/tpl/process.html'
        });
    });

