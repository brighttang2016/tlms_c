/**
 * Created by pujjr on 2017/7/19.
 */
angular.module('com.app.websocket',[
    'com.app.websocket.controller',
    'com.app.websocket.service',
    'com.app.websocket.directive'
]).run(['$rootScope',function($rootScope){
    /*$rootScope.eventShowCallCenter = "eventShowCallCenter";//显示面板
    $rootScope.eventHideCallCenter = "eventHideCallCenter";//隐藏面板
    $rootScope.eventRefreshStatus = "eventRefreshStatus";//刷新状态事件

    $rootScope.eventPhoneIconClick = "eventPhoneIconClick";//电话图标点击事件

    $rootScope.eventConnect = "eventConnect";//建立链接
    $rootScope.eventDisConnect = 'eventDisConnecct';//断开连接
    $rootScope.eventCheckIn = "eventCheckIn";//签入
    $rootScope.eventCheckOut = "eventCheckOut";//签出
    $rootScope.eventSeatBusy = "eventSeatBusy";//坐席忙
    $rootScope.eventSeatIdle = "eventSeatIdle";//坐席闲
    $rootScope.eventThreeTalk = "eventThreeTalk";//三方通话
    $rootScope.eventTrans2Group = "eventTrans2Group";//转其他坐席组
    $rootScope.eventTrans2Seat = "eventTrans2Seat";//转其他坐席
    $rootScope.eventStayCall = "eventStayCall";//保持通话
    $rootScope.eventCancelStayCall = "eventStayCallCancel";//取消保持通话
    $rootScope.eventExitThreeCall = "eventExitThreeCall";//退出三方通话
    $rootScope.eventKillCall = "eventKillCall";//挂机
    $rootScope.eventMakeCall = "eventMakeCall";//呼叫

    $rootScope.eventCallIn = "eventCallIn";//呼入弹屏事件*/
}]);
angular.module('com.app.websocket.controller',[]);
angular.module('com.app.websocket.service',[]);
angular.module('com.app.websocket.directive',[]);

//声明：呼叫中心指令作用域对象
//var callCenterDirectiveScope;

angular.module('myApp')
    .config(function($stateProvider,$urlRouterProvider){
        $stateProvider.state('app.websocket',{
            url:'/websocket',
            abstract:true/*,
             template: '<div ui-view class="fade-in-up"></div>'*/
        }).state('app.websocket.manage',{
            url:'/manage',
            templateUrl:'app/module-websocket/tpl/webSocketTest.html'
        });
    });

