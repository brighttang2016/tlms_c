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
            templateUrl:'app/module-process/tpl/processManage.html'
        }).state('app.process.query',{
            url:'/query',
            templateUrl:'app/module-process/tpl/processQuery.html'
        }) .state('app.process.task',{
                url:'/task',
                templateUrl:'app/module-process/tpl/currTask.html',
                onEnter:function(){
                    console.log("6666666666666");
                }
        }) .state('app.process.detail',{//流程明细
                url:'/detail',
                templateUrl:'app/module-process/tpl/processDetail.html'
        }).state('app.process.detail.dgrmResource',{
                views:{
                    'dgmnView':{
                        url:'/dgrmResource',
                        templateUrl:'app/module-process/tpl/processDiagram.html'
                    }
                }
        }).state('app.process.detail.resource',{
            url:'/resource',
            templateUrl:'app/module-process/tpl/processBpmn.html'
        }).state('app.process.model',{
            url:'model',
            templateUrl:'app/module-process/tpl/modelManage.html'
        }).state('app.process.toTask',{
            url:'toTask',
            templateUrl:'app/module-process/tpl/currTodoTask.html'
        });
    });

