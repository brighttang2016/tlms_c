/**
 * Created by pujjr on 2017/7/19.
 */
angular.module('com.app.callcenter.controller')
    .controller('CallCenterController',['$scope','$rootScope','CallCenterService','$timeout',function($scope,$rootScope,CallCenterService,$time0ut){

        $scope.getFormData = function(){
            console.log($scope.userName);
        };

        $scope.myData = {};
        //定义上送报文
        $scope.firstName = "tttttttt";
        var sendMsg = {"cmdsn":"","seatno":"","caller":"","para":"","cmd":""};
        //链接
        $scope.connect = function(){
            $time0ut(function(){
                $scope.$emit($scope.eventRefreshStatus,{"msg":"呼叫系统签入中,请等待..."});
            },10);
            sendMsg.cmdsn = '100';//交易编码
            sendMsg.seatno = '8010';//坐席号
            sendMsg.para = '123456';//密码
            sendMsg.caller = '1001';//分机号
            sendMsg.cmd = '1';
            CallCenterService.connect(sendMsg);
        };

        $scope.disCnnnect = function(){
            CallCenterService.disCnnnect();
        };
        $scope.doSend = function(sendStr){
            CallCenterService.doSend(sendStr);
        };
        //签入
        $scope.checkIn = function(){
            //$scope.data.phoneNo = "1111";
            console.log($scope);
            console.log($scope.firstName);
            $time0ut(function(){
                $scope.$emit($scope.eventRefreshStatus,{"msg":"呼叫系统签入中,请等待..."});
            },10);
            sendMsg.cmdsn = '100';//交易编码
            sendMsg.seatno = '8010';//坐席号
            sendMsg.para = '123456';//密码
            sendMsg.caller = '1001';//分机号
            sendMsg.cmd = '1';
            //CallCenterService.connect(sendMsg);
        };
        //签出
        $scope.checkOut = function(){
            sendMsg.cmdsn = '101';
            sendMsg.seatno = '8010';
            sendMsg.para = '';
            sendMsg.caller = '';
            sendMsg.cmd = '2';
            CallCenterService.doSend(sendMsg);
        };
        //坐席忙
        $scope.seatBusy = function(){
            sendMsg.cmdsn = '105';
            sendMsg.seatno = '8010';
            sendMsg.para = '1';//para 为0 时为示闲，为1-99 都是示忙，各个示忙类型自己定义
            sendMsg.caller = '';
            sendMsg.cmd = '5';
            CallCenterService.connect(sendMsg);
        };
        //坐席闲
        $scope.seatIdle = function(){
            sendMsg.cmdsn = '105';
            sendMsg.seatno = '8010';
            sendMsg.para = '0';//para 为0 时为示闲，为1-99 都是示忙，各个示忙类型自己定义
            sendMsg.caller = '';
            sendMsg.cmd = '5';
            CallCenterService.connect(sendMsg);
        };
        //3方通话
        $scope.threeTalk = function(){
            sendMsg.cmdsn = '109';
            sendMsg.seatno = '8010';
            sendMsg.para =  this.phoneNo;
            sendMsg.caller = '';
            sendMsg.cmd = '24';
            CallCenterService.connect(sendMsg);
        };

        $scope.trans2Group = function(){
            CallCenterService.otherGroup();
        };

        $scope.trans2Sroup = function(){
            CallCenterService.otherSeat();
        };

        $scope.stayCall = function(){
            CallCenterService.stayCall();
        };

        $scope.cancelStayCall = function(){
            CallCenterService.cancelStayCall();
        };

        $scope.exitThreeCall = function(){
            CallCenterService.exitThreeCall();
        };

        $scope.hangUp = function(){
            CallCenterService.hangUp();
        };

        $scope.makeCall = function(){
            CallCenterService.makeCall();
        };


        /*$scope.doActiveCallCenter = function(){
            //$scope.myUrl4 = 'active';
            if($scope.myUrl4 == 'active'){
                $rootScope.$emit($rootScope.eventHideCallCenter,{msg:'隐藏callcenter面板'});
            }
            else{
                $rootScope.$emit($rootScope.eventShowCallCenter,{msg:'展开callcenter面板'});
            }
        };*/

        $scope.doActiveCallCenter = function(){
            if($scope.activeCallCenter == 'active'){
                $rootScope.$emit($rootScope.eventHideCallCenter,{msg:'隐藏callcenter面板'});
            }
            else{
                $rootScope.$emit($rootScope.eventShowCallCenter,{msg:'展开callcenter面板'});
            }
        };
        //注册callcenter面板显示事件
        $rootScope.$on($rootScope.eventShowCallCenter,function(event,param){
            $scope.activeCallCenter = 'active';
            console.log(param.msg);
        });
        //注册callcenter面板隐藏事件
        $rootScope.$on($rootScope.eventHideCallCenter,function(event,param){
            $scope.activeCallCenter = '';
            console.log(param.msg);
        });
        //注册刷新状态事件
        $rootScope.$on( $rootScope.eventRefreshStatus,function(event,param){
            $scope.$apply(function(){
                date = new Date();
                $scope.callCenterStatus =  date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay()+" "+ date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" " + param.msg + "\n" + ($scope.callCenterStatus == undefined ? "" : $scope.callCenterStatus);
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

        $rootScope.$on($rootScope.eventOtherGroup,function(event,param){
            $rootScope.$emit($rootScope.eventRefreshStatus,param);
        });

        $rootScope.$on($rootScope.eventOtherSeat,function(event,param){
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

        $rootScope.$on($rootScope.eventHangUp,function(event,param){
            $rootScope.$emit($rootScope.eventRefreshStatus,param);
        });
        $rootScope.$on($rootScope.eventMakeCall,function(event,param){
            $rootScope.$emit($rootScope.eventRefreshStatus,param);
        });

    }]);
