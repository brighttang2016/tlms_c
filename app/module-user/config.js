/**
 * Created by pujjr on 2017/7/19.
 */
angular.module('com.app.user',[
    'com.app.user.controller',
    'com.app.user.service.UserService',
    'com.app.user.directive'
]);
angular.module('com.app.user.directive',[]);
angular.module('com.app.user.controller',[]);

angular.module('myApp')
    .config(function($stateProvider,$urlRouterProvider){
        $stateProvider.state('app.user',{
            url:'/user',
            abstract:true/*,
            template: '<div ui-view class="fade-in-up"></div>'*/
        }).state('app.user.manage',{
            url:'/manage',
            templateUrl:'app/module-user/tpl/user.html'
        });
    });

