/**
 * Created by pujjr on 2017/7/19.
 */
angular.module('com.app.websocket.controller')
    .controller('WebsocketController',['$scope','$rootScope','$timeout','$interval','PujjrPushRestangular','WebsocketService','$interval','$log',function($scope,$rootScope,$timeout,$interval,PujjrPushRestangular,WebsocketService,$interval,$log){

        //*****************单机测试使用*********开始*************
        $rootScope.account = {};
        $rootScope.account.accountId = '8020';
        $rootScope.account.callcenterExtensionTelephone = '1001';
        $rootScope.account.callcenterLoginPasswd = '123456';
        $rootScope.account.invokeCallcenter = true;//是否加载CallCenter模块;true:显示呼叫中心弹窗并自动签入，false:不显示。
        //*****************单机测试使用*********结束*************
        //上送报文
        $scope.sendMsg = {"tranCode":"","accountId":"","passwd":"","heartBeatTime":"","msg":"","msgId":"","list":[]};
        //返回报文
        $scope.recvMsg = {"tranCode":"","accountId":"","passwd":"","heartBeatTime":"","msg":"","msgId":"","state":"","list":[]};
        //心跳检测频率
        $scope.heartBeatFreq = 20000;
        //接收消息队列扫描频率
        $scope.recvMsgScanFreq = 1000;
        //网络连接状态扫描频率
        $scope.netStatusScanFreq = 3000;
        //网络连接状态
        $scope.netStatus = '';
        //用户登录状态
        $scope.loginStatus = '';

        $rootScope.$on($rootScope.eventTodoTask,function(event,param){
            console.log("待办任务收到事件");
            console.log(param);
        });
        /**
         * 开发发送心跳检测
         * 心跳频率：20s
         */
        $scope.startHeartbeat = function(){
            //WebsocketService.doSend(sendMsg);
            $scope.heartBeatInterval = $interval(function(){
                var sendMsg ={"tranCode":"","accountId":"","passwd":"","heartBeatTime":"","list":[]};
                sendMsg.tranCode = '1002';
                sendMsg.accountId = $rootScope.account.accountId;
                sendMsg.heartBeatTime = $scope.recvMsg.heartBeatTime;
                //console.log("发送心跳检测:"+JSON.stringify(sendMsg));
                WebsocketService.doSend(sendMsg);
            },$scope.heartBeatFreq);
        };

        /**
         * 停止发送心跳检测
         */
        $scope.stopHeartbeat = function(){
            console.log("停止心跳检测");
            $interval.cancel($scope.heartBeatInterval);
        };

        /**
         * websocket消息队列扫描
         * 扫描频率：1s
         */
        $scope.receiveMsgScan = function(){
            var inter =  $interval(function(){
                //$log.log("**********websocket返回消息扫描*************");
                var results = WebsocketService.getResults();
                popResult = {};
                if(results.length > 0){
                    var rcvMsg = results.pop();
                    popResult = JSON.parse(rcvMsg);
                    console.log("获取返回报文："+rcvMsg);
                }
                //更新心跳时间
                if(popResult.heartBeatTime > 0){
                    $scope.recvMsg.heartBeatTime = popResult.heartBeatTime;
                    $scope.sendMsg.heartBeatTime = popResult.heartBeatTime;
                }
                $scope.recvMsg.state = popResult.state;//消息状态
                switch(popResult.tranCode){
                    case "1001"://成功连接返回
                        //启动心跳
                        $scope.startHeartbeat();
                        //签入
                        $scope.signIn();
                        break;
                    case '1002'://返回心跳报文
                        if(popResult.state == "01"){//坐席未签入
                            $scope.signIn();
                        }
                        break;
                    case '1003'://签入返回
                        $scope.loginStatus = '签入成功';
                        break;
                    case '1004'://用户签出
                        break;
                    case '1005'://待办任务
                        /**
                         * 待办任务业务逻辑处理
                         */
                        //////////////////////////////////////////////////
                        //$scope.recvMsg.msg = popResult.msg;
                        $scope.sendMsg.msgId = popResult.msgId;
                        console.log( $scope.sendMsg);
                        $rootScope.$emit($rootScope.eventTodoTask,popResult);
                        /**
                         * 发送待办任务接收回执
                         */
                        $scope.sendMsg.tranCode = '1005';
                        $scope.sendMsg.msg = "待办任务接收成功";
                        WebsocketService.doSend($scope.sendMsg);

                        break;
                }
            },$scope.recvMsgScanFreq);
        };
        /**
         * 网络监控扫描
         * 扫描频率
         */
        $scope.netStatusScan = function(){
            $interval(function(){
                console.log("当前连接状态（0:connecting;1:open;2:closing;3:closed）:"+WebsocketService.getWsStatus());
                $scope.netStatus = WebsocketService.getWsStatus();
                if(WebsocketService.getWsStatus() == undefined){
                    console.log("网络初始化连接");
                    $scope.stopHeartbeat();
                    WebsocketService.wsConnect();
                }else if(WebsocketService.getWsStatus() == '0'){
                    console.log("网络连接中...");
                }else if(WebsocketService.getWsStatus() == '1'){
                    console.log("网络已连接");
                }else if(WebsocketService.getWsStatus() == '2'){
                    console.log("网络断开连接中...");
                }else if(WebsocketService.getWsStatus() == '3'){
                    console.log("网络已断开连接");
                    $scope.stopHeartbeat();
                    WebsocketService.wsConnect();
                }
            },$scope.netStatusScanFreq);
        };
        //启动websocket消息队列扫描
        $scope.receiveMsgScan();
        //网络扫描
        $scope.netStatusScan();

        /********************************
         * *********以下测试区域***************
         ********************************/
        $scope.signIn = function(){
            $scope.sendMsg.tranCode = "1003";
            $scope.sendMsg.accountId = $rootScope.account.accountId;
            $scope.sendMsg.passwd = '123456';
            WebsocketService.doSend($scope.sendMsg);
        };
        /**
         * 创建连接
         */
      /*  $scope.wsConnect = function(){
            WebsocketService.wsConnect();
        };*/
        /**
         * 断开连接
         */
       /* $scope.wsClose = function(){
            console.log('断开连接');
            ws.close();
        };*/

        /**
         * 测试：服务端断开所有websocket连接
         */
        $scope.serverClose = function(){
            PujjrPushRestangular.one('closeall').get()
                .then(function(responseData){

                });
        };

        $scope.doSend = function(){
            console.log("消息发送");
            console.log($scope);
            console.log($scope);
            WebsocketService.doSend($scope.sendMsg);
        };

        $scope.doPush = function(){
            PujjrPushRestangular.one('startpush').get()
                .then(function(responseData){

                });
        };


    }]);
