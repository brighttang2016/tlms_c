/**
 * Created by pujjr on 2017/7/19.
 */
angular.module('com.app.callcenter',[
    'com.app.callcenter.controller',
    'com.app.callcenter.service',
    'com.app.callcenter.directive'
]).run(['$rootScope',function($rootScope){
    $rootScope.eventShowCallCenter = "eventShowCallCenter";//显示面板
    $rootScope.eventHideCallCenter = "eventHideCallCenter";//隐藏面板
    $rootScope.eventRefreshStatus = "eventRefreshStatus";//刷新状态事件
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
    $rootScope.eventHangUp = "eventHangUp";//挂机
    $rootScope.eventMakeCall = "eventMakeCall";//呼叫
}]);
angular.module('com.app.callcenter.controller',[]);
angular.module('com.app.callcenter.service',[]);
angular.module('com.app.callcenter.directive',[]);