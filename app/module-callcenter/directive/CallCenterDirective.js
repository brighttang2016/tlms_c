/**
 * Created by tom on 2017/7/21.
 * 呼叫中心子级指令，绑定呼叫中心页面所在作用域
 */
angular.module('com.app.callcenter.directive')
    .directive('callCenterDirective',function(){
        return{
            restrict:"EA",
            replace:false,
            scope:{
                activeCallCenter:'=activeCallCenter'//双向数据绑定（采用了绑定策略“=”而非“@”），与指令外的DOM属性some-url值：theirUrl表示的作用域变量相绑定
            },
            templateUrl:'app/module-callcenter/tpl/callcenter.html',
            require:'?^callCenterDirectiveParent',
            link:function(scope,el,attr,ctrl){
                console.log("555555555555555555555555555555555555");
                console.log(ctrl);
                console.log(scope);
                scope.checkIn = ctrl.checkIn;
                scope.checkOut = ctrl.checkOut;
                scope.seatBusy = ctrl.seatBusy;
                scope.seatIdle = ctrl.seatIdle;
                scope.threeTalk = ctrl.threeTalk;
                scope.trans2Group = ctrl.trans2Group;
                scope.trans2Seat = ctrl.trans2Seat;
                scope.stayCall = ctrl.stayCall;
                scope.cancelStayCall = ctrl.cancelStayCall;
                scope.exitThreeCall = ctrl.exitThreeCall;
                scope.killTalk = ctrl.killTalk;
                scope.makeCall = ctrl.makeCall;
                scope.doActiveCallCenter = ctrl.doActiveCallCenter;
                scope.doInit = ctrl.doInit;
                scope.doInit();
            }
        };
    });

