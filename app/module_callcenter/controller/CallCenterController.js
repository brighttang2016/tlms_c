/**
 * Created by pujjr on 2017/7/19.
 */
angular.module('com.app.callcenter.controller')
    .controller('CallCenterController',['$scope','$rootScope','CallCenterService','$timeout','$interval',function($scope,$rootScope,CallCenterService,$timeout,$interval){


        //定义上送报文
        var sendMsg = {"cmdsn":"","seatno":"","caller":"","para":"","cmd":""};
        var seatno = '8010';
        var caller = '1001';

        //directiveScope = "";

        this.doInit = function(){
            console.log("******************doInit******************");
            directiveScope = this;
            console.log(directiveScope);
            //连接
            $rootScope.$on($rootScope.eventConnect,function(event,param){
                console.log(event);
                console.log(param);
                $rootScope.$emit($rootScope.eventRefreshStatus,param);
            });
            //断开连接
            $rootScope.$on($rootScope.eventDisConnect,function(event,param){
                console.log(event);
                console.log(param);
                $rootScope.$emit($rootScope.eventRefreshStatus,param);
            });
            //注册callcenter面板显示事件
            //directiveScope.$on($rootScope.eventShowCallCenter,function(event,param){
            $rootScope.$on($rootScope.eventShowCallCenter,function(event,param){
                console.log("1111111111111111eventShowCallCenter1111111111111111111111");
                console.log(this);
                console.log($scope);
                console.log(directiveScope);
                //directiveScope.activeCallCenter = 'active';
                $rootScope.activeCallCenter = 'active';
                console.log(param.msg);
            });
            //注册callcenter面板隐藏事件
            //directiveScope.$on($rootScope.eventHideCallCenter,function(event,param){
            $rootScope.$on($rootScope.eventHideCallCenter,function(event,param){
                console.log("1111111111111111eventHideCallCenter1111111111111111111111");
                console.log(this);
                console.log($scope);
                console.log(directiveScope);
                //directiveScope.activeCallCenter = '';
                $rootScope.activeCallCenter = '';
                console.log(param.msg);
            });
            //注册刷新状态事件
            $rootScope.$on( $rootScope.eventRefreshStatus,function(event,param){
                console.log(event);
                console.log(param);
                $rootScope.$apply(function(){
                 console.log("1111111111111111$rootScope.eventRefreshStatus1111111111111111111111");
                 console.log(this);
                 console.log($(this));
                 console.log($scope);
                 console.log(directiveScope);
                 date = new Date();
                 directiveScope.callCenterStatus =  date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay()+" "+ date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" " + param.msg + "\n" + (directiveScope.callCenterStatus == undefined ? "" : directiveScope.callCenterStatus);
                 });
                //date = new Date();
                //directiveScope.callCenterStatus =  date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay()+" "+ date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" " + param.msg + "\n" + (directiveScope.callCenterStatus == undefined ? "" : directiveScope.callCenterStatus);
            });

            $rootScope.$on($rootScope.eventCheckIn,function(event,param){
                console.log("1111111111111111$rootScope.eventCheckIn1111111111111111111111");
                console.log(this);
                console.log($scope);
                console.log(directiveScope);
                $rootScope.$emit($rootScope.eventRefreshStatus,param);
            });

            $rootScope.$on($rootScope.eventCheckOut,function(event,param){
                $rootScope.$emit($rootScope.eventRefreshStatus,param);
            });

            $rootScope.$on($rootScope.eventSeatBusy,function(event,param){
                $rootScope.$emit($rootScope.eventRefreshStatus,param);
            });

            $rootScope.$on($rootScope.eventSeatIdle,function(event,param){
                $rootScope.$emit($rootScope.eventRefreshStatus,param);
            });

            $rootScope.$on($rootScope.eventThreeTalk,function(event,param){
                $rootScope.$emit($rootScope.eventRefreshStatus,param);
            });

            $rootScope.$on($rootScope.eventTrans2Group,function(event,param){
                $rootScope.$emit($rootScope.eventRefreshStatus,param);
            });

            $rootScope.$on($rootScope.eventTrans2Seat,function(event,param){
                $rootScope.$emit($rootScope.eventRefreshStatus,param);
            });

            $rootScope.$on($rootScope.eventStayCall,function(event,param){
                $rootScope.$emit($rootScope.eventRefreshStatus,param);
            });

            $rootScope.$on($rootScope.eventCancelStayCall,function(event,param){
                $rootScope.$emit($rootScope.eventRefreshStatus,param);
            });

            $rootScope.$on($rootScope.eventExitThreeCall,function(event,param){
                $rootScope.$emit($rootScope.eventRefreshStatus,param);
            });

            $rootScope.$on($rootScope.eventKillCall,function(event,param){
                $rootScope.$emit($rootScope.eventRefreshStatus,param);
            });
            $rootScope.$on($rootScope.eventMakeCall,function(event,param){
                $rootScope.$emit($rootScope.eventRefreshStatus,param);
            });
            $rootScope.$on($rootScope.eventCallIn,function(event,param){
                $rootScope.$emit($rootScope.eventRefreshStatus,param);
                $rootScope.$emit($rootScope.eventShowCallCenter);
            });

        };
        this.makeCallByClickPhoneNum = function(){
            console.log("**************************makeCallByClickPhoneNum*********************************");
            console.log(this);
            console.log($scope);
            console.log($(this));
            console.log(directiveScope);
            //directiveScope.$emit($rootScope.eventShowCallCenter,{"msg":""});
            $rootScope.$emit($rootScope.eventShowCallCenter,{"msg":""});
            directiveScope.inputParam = this[this['attrName']];
        };

        //链接
       /* $scope.connect = function(){
         sendMsg.cmdsn = '100';//交易编码
         sendMsg.seatno =seatno;//坐席号
         sendMsg.para = '123456';//密码
         sendMsg.caller = seatno;//分机号
         sendMsg.cmd = '1';
         CallCenterService.connect(sendMsg);
         };*/
       /* $scope.disCnnnect = function(){
            CallCenterService.disCnnnect();
        };*/
       /* $scope.doSend = function(sendStr){
         CallCenterService.doSend(sendStr);
         };*/
        //签入
        this.checkIn = function(){

            console.log("0000000000000000000000000000000000");
            console.log(this);
            console.log($scope);
            console.log(directiveScope);
            //this.activeCallCenter = 'active';
            sendMsg.cmdsn = '10001';//交易编码
            sendMsg.seatno =seatno;//坐席号
            sendMsg.para = '123456';//密码
            sendMsg.caller = caller;//分机号
            sendMsg.cmd = '1';
            CallCenterService.checkIn(sendMsg);
        };
        //签出
        this.checkOut = function(){
            sendMsg.cmdsn = '10002';
            sendMsg.seatno =seatno;
            sendMsg.para = '';
            sendMsg.caller = '';
            sendMsg.cmd = '2';
            CallCenterService.checkOut(sendMsg);
        };
        //坐席忙
        this.seatBusy = function(){
            sendMsg.cmdsn = '10005';
            sendMsg.seatno =seatno;
            sendMsg.para = '1';//para 为0 时为示闲，为1-99 都是示忙，各个示忙类型自己定义
            sendMsg.caller = '';
            sendMsg.cmd = '5';
            CallCenterService.doSend(sendMsg);
        };
        //坐席闲
        this.seatIdle = function(){
            sendMsg.cmdsn = '10005';
            sendMsg.seatno = seatno;
            sendMsg.para = '0';//para 为0 时为示闲，为1-99 都是示忙，各个示忙类型自己定义
            sendMsg.caller = '';
            sendMsg.cmd = '5';
            CallCenterService.doSend(sendMsg);
        };
        //3方通话
        this.threeTalk = function(){
            sendMsg.cmdsn = '10011';
            sendMsg.seatno =seatno;
            sendMsg.para =  directiveScope.inputParam;
            sendMsg.caller = '';
            sendMsg.cmd = '11';
            CallCenterService.doSend(sendMsg);
        };
        //转其他坐席组
        this.trans2Group = function(){
            sendMsg.cmdsn = '10009';
            sendMsg.seatno =seatno;
            sendMsg.para =  $scope.inputParam;//其他坐席组编号
            sendMsg.caller = '';
            sendMsg.cmd = '9';
            CallCenterService.doSend(sendMsg);
        };
        //转其他坐席
        this.trans2Seat = function(){
            sendMsg.cmdsn = '10012';
            sendMsg.seatno =seatno;
            sendMsg.para =  $scope.inputParam;//其他坐席组编号
            sendMsg.caller = '';
            sendMsg.cmd = '12';
            CallCenterService.doSend(sendMsg);
        };

        this.stayCall = function(){
            sendMsg.cmdsn = '10013';
            sendMsg.seatno =seatno;
            sendMsg.para =  '1';//保持通话
            sendMsg.caller = caller;
            sendMsg.cmd = '13';
            CallCenterService.doSend(sendMsg);
        };

        this.cancelStayCall = function(){
            sendMsg.cmdsn = '10013';
            sendMsg.seatno =seatno;
            sendMsg.para =  '2';//取消保持通话
            sendMsg.caller = caller;
            sendMsg.cmd = '13';
            CallCenterService.doSend(sendMsg);
        };
        /**
         * 退出3方通话
         * 0 坐席退出3 方通话,
         1 拨入时，客服退出3 方通话,
         2 新加入3 方通话的C 用户退出3 方通话.
         3 结束3 方通话:所有人都退出3 方通话挂机.
         */
        this.exitThreeCall = function(){
            sendMsg.cmdsn = '10014';
            sendMsg.seatno =seatno;
            sendMsg.para =  '0';
            sendMsg.caller = caller;
            sendMsg.cmd = '14';
            CallCenterService.doSend(sendMsg);
        };
        //挂机
        this.killTalk = function(){
            sendMsg.cmdsn = '10004';
            sendMsg.seatno =seatno;
            sendMsg.para =  $scope.inputParam;
            sendMsg.caller = caller;
            sendMsg.cmd = '4';
            CallCenterService.doSend(sendMsg);
        };
        //外呼
        this.makeCall = function(){
            sendMsg.cmdsn = '10003';
            sendMsg.seatno =seatno;
            sendMsg.para =  $scope.inputParam;
            sendMsg.caller = caller;
            sendMsg.cmd = '3';
            CallCenterService.doSend(sendMsg);
        };

        this.doActiveCallCenter = function(){

            $rootScope.isInvoked = false;
            console.log("****************doActiveCallCenter***************");
            console.log(this);
            console.log($scope);
            console.log(directiveScope);

            //directiveScope = this;

            if(this.activeCallCenter == 'active'){
                console.log("****************隐藏***************");
                //if(!$rootScope.isInvoked)
                //directiveScope.$emit($rootScope.eventHideCallCenter,{msg:'隐藏callcenter面板'});
                $rootScope.$emit($rootScope.eventHideCallCenter,{msg:'隐藏callcenter面板'});
            }
            else{
                console.log("****************展开***************");
                //if(!$rootScope.isInvoked)
                //directiveScope.$emit($rootScope.eventShowCallCenter,{msg:'展开callcenter面板'});
                $rootScope.$emit($rootScope.eventShowCallCenter,{msg:'展开callcenter面板'});
            }
        };




    }]);
