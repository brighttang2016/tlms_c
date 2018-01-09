/**
 * Created by pujjr on 2017/7/19.
 */
angular.module('com.app.websocket.controller')
    .controller('WebsocketController',['$scope','$rootScope','$timeout','$interval','PujjrPushRestangular','WebsocketService','$interval','$log','MessagePushService',function($scope,$rootScope,$timeout,$interval,PujjrPushRestangular,WebsocketService,$interval,$log,MessagePushService){

        //*****************单机测试使用*********开始*************
        $rootScope.account = {};
        $rootScope.account.accountId = '8010';
        $rootScope.account.callcenterExtensionTelephone = '1001';
        $rootScope.account.callcenterLoginPasswd = '123456';
        $rootScope.account.invokeCallcenter = true;//是否加载CallCenter模块;true:显示呼叫中心弹窗并自动签入，false:不显示。
        //*****************单机测试使用*********结束*************

        $rootScope.$on($rootScope.eventTodoTask,function(event,param){
            console.log("待办任务收到事件");
            console.log(param);
        });

        MessagePushService.startPushService($rootScope.account);
    }]);
