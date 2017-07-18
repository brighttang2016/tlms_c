/**
 * Created by pujjr on 2017/7/17.
 */
angular.module('com.tang.controller.RouterController',[])
    .controller('routerController',function($scope){

    }).config(function($stateProvider,$urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('home',{
                url: '/home',
                template: '<div ui-view>home</div>'
            }).state('home.toaster',{
                url:'/toaster',
                templateUrl:'html/toaster/toaster.tpl.html'
            }).state('user',{
                url:'/home2/user',
                template: '<div>user</div>'
            }).state('photo',{
                //abstract:true,
                url: '/photo/:photoId',
                templateUrl: 'html/uirouter/photo.tpl.html',
                controller:function($scope,$stateParams){
                    console.log($stateParams);
                }
            }).state('photo.detail',{//嵌套路由测试
                url: '/detail/:detailId',
                templateUrl: 'html/uirouter/photo-detail.tpl.html',
                controller:function($scope,$stateParams){
                    console.log("----------------------------");
                    console.log($stateParams);
                }

            });
           /* .state('inbox', {
                url: '/inbox:inboxId',
                templateUrl: 'html/uirouter/uirouter.tpl.html'
            }).state('inbox.priority.',{
                url:'/priority',
                templateUrl: 'html/uirouter/userManage.tpl.html',
                controller:function($scope,$stateParams){
                    console.log($stateParams);
                }
            })*/

    });