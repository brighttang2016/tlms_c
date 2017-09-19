/**
 * Created by pujjr on 2017/7/19.
 */
angular.module('com.app.callcenter.controller')
    .controller('CallCenterController',['$scope','$rootScope','CallCenterService','$timeout','$interval',function($scope,$rootScope,CallCenterService,$timeout,$interval){
        //tlms_c测试时使用

        $rootScope.account = {};
        $rootScope.account.accountId = '8010';
        $rootScope.account.callcenterExtensionTelephone = '1001';
        $rootScope.account.callcenterLoginPasswd = '123456';
        $rootScope.account.invokeCallcenter = true;//是否加载CallCenter模块;true:显示呼叫中心弹窗并自动签入，false:不显示。
        //定义上送报文
        var sendMsg = {"cmdsn":"","seatno":"","caller":"","para":"","cmd":""};

        eventMsg = {"prefix":"","msg":""};
        console.log("共享controller");
        console.log($scope);

        //电话号码指令初始化
        this.initPhoneIcon = function(){
           var phoneDirectiveScope = this;
            if($rootScope.account.invokeCallcenter == true){
                this.phoneIconShow = "";
            }else{
                this.phoneIconShow = "hide";
            }
            console.log("*********电话指令初始化************");
            console.log(this);
        };
        this.doInit = function(){
            console.log("******************doInit******************");
            directiveScope = this;
            if(!$rootScope.account.invokeCallcenter){
                directiveScope.activeCallCenter = "hide";
                return;
            }
            directiveScope.checkInType = "btn-default";
            directiveScope.checkInName = "坐席签入";
            //连接
            $rootScope.$on($rootScope.eventConnect,function(event,param){
                $rootScope.$emit($rootScope.eventRefreshStatus,param);
            });
            //断开连接
            $rootScope.$on($rootScope.eventDisConnect,function(event,param){
                $rootScope.$emit($rootScope.eventRefreshStatus,param);
            });
            //注册callcenter面板显示事件
            //directiveScope.$on($rootScope.eventShowCallCenter,function(event,param){
            $rootScope.$on($rootScope.eventShowCallCenter,function(event,param){
                //directiveScope.activeCallCenter = 'active';
                $rootScope.activeCallCenter = 'active';
            });
            //注册callcenter面板隐藏事件
            //directiveScope.$on($rootScope.eventHideCallCenter,function(event,param){
            $rootScope.$on($rootScope.eventHideCallCenter,function(event,param){
                $rootScope.activeCallCenter = '';
            });
            //注册刷新状态事件
            $rootScope.$on( $rootScope.eventRefreshStatus,function(event,param){
                $rootScope.$apply(function(){
                    if($rootScope.ccCurrStatus == $rootScope.ccAllStatus.已签入){
                        directiveScope.checkInType = "btn-success";
                        directiveScope.checkInName = "已签入";
                    }
                    if($rootScope.ccCurrStatus == $rootScope.ccAllStatus.未连接){
                        directiveScope.checkInType = "btn-danger";
                        directiveScope.checkInName = "坐席签入";
                    }
                    date = new Date();
                    directiveScope.callCenterStatus =  date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay()+" "+ date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" "
                        + param.prefix + ":" + param.msg
                        + "\n"
                        + (directiveScope.callCenterStatus == undefined ? "" : directiveScope.callCenterStatus);
                 });
            });

            $rootScope.$on($rootScope.eventCheckIn,function(event,param){
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

            $rootScope.$on($rootScope.eventPhoneIconClick,function(event,param){
                $rootScope.$emit($rootScope.eventShowCallCenter,{"msg":""});
                directiveScope.inputParam = param.phoneNum;
            });

            $timeout(function(){
                directiveScope.doActiveCallCenter();
                directiveScope.checkIn();
            },1000);
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

        //签入
        this.checkIn = function(){
            seatno = $rootScope.account.accountId;
            caller = $rootScope.account.callcenterExtensionTelephone;
            callcenterLoginPasswd = $rootScope.account.callcenterLoginPasswd;
            sendMsg.cmdsn = '10001';//交易编码
            sendMsg.seatno = seatno;//坐席号
            sendMsg.para = callcenterLoginPasswd;//密码
            sendMsg.caller = caller;//分机号
            sendMsg.cmd = '1';
            eventMsg.prefix = CallCenterService.getTranName(sendMsg.cmdsn);
            CallCenterService.checkIn(sendMsg,eventMsg);
        };
        //签出
        this.checkOut = function(){
            sendMsg.cmdsn = '10002';
            sendMsg.seatno =seatno;
            sendMsg.para = '';
            sendMsg.caller = '';
            sendMsg.cmd = '2';
            eventMsg.prefix = CallCenterService.getTranName(sendMsg.cmdsn);
            CallCenterService.checkOut(sendMsg,eventMsg);
        };
        //坐席忙
        this.seatBusy = function(){
            sendMsg.cmdsn = '10005';
            sendMsg.seatno =seatno;
            sendMsg.para = '1';//para 为0 时为示闲，为1-99 都是示忙，各个示忙类型自己定义
            sendMsg.caller = '';
            sendMsg.cmd = '5';
            eventMsg.prefix = CallCenterService.getTranName(sendMsg.cmdsn);
            CallCenterService.doSend(sendMsg,eventMsg);
        };
        //坐席闲
        this.seatIdle = function(){
            sendMsg.cmdsn = '10005';
            sendMsg.seatno = seatno;
            sendMsg.para = '0';//para 为0 时为示闲，为1-99 都是示忙，各个示忙类型自己定义
            sendMsg.caller = '';
            sendMsg.cmd = '5';
            eventMsg.prefix = CallCenterService.getTranName(sendMsg.cmdsn);
            CallCenterService.doSend(sendMsg,eventMsg);
        };
        //3方通话
        this.threeTalk = function(){
            sendMsg.cmdsn = '10011';
            sendMsg.seatno =seatno;
            sendMsg.para =  directiveScope.inputParam;
            sendMsg.caller = '';
            sendMsg.cmd = '11';
            eventMsg.prefix = CallCenterService.getTranName(sendMsg.cmdsn);
            CallCenterService.doSend(sendMsg,eventMsg);
        };
        //转其他坐席组
        this.trans2Group = function(){
            sendMsg.cmdsn = '10009';
            sendMsg.seatno =seatno;
            sendMsg.para =  $scope.inputParam;//其他坐席组编号
            sendMsg.caller = '';
            sendMsg.cmd = '9';
            eventMsg.prefix = CallCenterService.getTranName(sendMsg.cmdsn);
            CallCenterService.doSend(sendMsg,eventMsg);
        };
        //转其他坐席
        this.trans2Seat = function(){
            sendMsg.cmdsn = '10012';
            sendMsg.seatno =seatno;
            sendMsg.para =  $scope.inputParam;//其他坐席组编号
            sendMsg.caller = '';
            sendMsg.cmd = '12';
            eventMsg.prefix = CallCenterService.getTranName(sendMsg.cmdsn);
            CallCenterService.doSend(sendMsg,eventMsg);
        };

        this.stayCall = function(){
            sendMsg.cmdsn = '10013';
            sendMsg.seatno =seatno;
            sendMsg.para =  '1';//保持通话
            sendMsg.caller = caller;
            sendMsg.cmd = '13';
            eventMsg.prefix = CallCenterService.getTranName(sendMsg.cmdsn);
            CallCenterService.doSend(sendMsg,eventMsg);
        };

        this.cancelStayCall = function(){
            sendMsg.cmdsn = '10013';
            sendMsg.seatno =seatno;
            sendMsg.para =  '2';//取消保持通话
            sendMsg.caller = caller;
            sendMsg.cmd = '13';
            eventMsg.prefix = CallCenterService.getTranName(sendMsg.cmdsn);
            CallCenterService.doSend(sendMsg,eventMsg);
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
            eventMsg.prefix = CallCenterService.getTranName(sendMsg.cmdsn);
            CallCenterService.doSend(sendMsg,eventMsg);
        };
        //挂机
        this.killTalk = function(){
            sendMsg.cmdsn = '10004';
            sendMsg.seatno =seatno;
            sendMsg.para =  $scope.inputParam;
            sendMsg.caller = caller;
            sendMsg.cmd = '4';
            eventMsg.prefix = CallCenterService.getTranName(sendMsg.cmdsn);
            CallCenterService.doSend(sendMsg,eventMsg);
        };
        //外呼
        this.makeCall = function(){
            sendMsg.cmdsn = '10003';
            sendMsg.seatno =seatno;
            sendMsg.para =  $scope.inputParam;
            sendMsg.caller = caller;
            sendMsg.cmd = '3';
            eventMsg.prefix = CallCenterService.getTranName(sendMsg.cmdsn);
            CallCenterService.doSend(sendMsg,eventMsg);
        };

        this.doActiveCallCenter = function(){
            if(this.activeCallCenter == 'active'){
                //directiveScope.$emit($rootScope.eventHideCallCenter,{msg:'隐藏callcenter面板'});
                $rootScope.$emit($rootScope.eventHideCallCenter,{msg:'隐藏callcenter面板'});
            }
            else{
                //directiveScope.$emit($rootScope.eventShowCallCenter,{msg:'展开callcenter面板'});
                $rootScope.$emit($rootScope.eventShowCallCenter,{msg:'展开callcenter面板'});
            }
        };
    }]);
