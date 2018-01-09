/**
 * Created by pujjr on 2017/7/19.
 */

angular.module('com.app.websocket.service')
    .provider('MessagePushService',function($injector){
        //消息推送服务，websocket地址
        var  wsUrl = "";
        return {
            setWebSocketUrl:function(webSocketUrl){
                wsUrl = webSocketUrl;
            },
            $get:function($http,$rootScope,$interval){
                var ws = "";
                var connectStatus = "01";//连接状态,01:断开连接；00：打开连接
                var loginStatus = '';//登录状态
                //var results = [];//存储服务端返回消息
                var wsStatus = "";
                var sendMsg = {"tranCode":"","accountId":"","passwd":"","heartBeatTime":"","msg":"","msgId":"","list":[]};
                //返回报文
                var recvMsg = {"tranCode":"","accountId":"","passwd":"","heartBeatTime":"","msg":"","msgId":"","state":"","list":[]};
                //心跳检测频率
                var heartBeatFreq = 20000;
                //网络连接状态扫描频率
                var netStatusScanFreq = 3000;
                var heartBeatInterval;
                //当前登录账户信息
                var account = {};

                /**
                 * 启动消息推送服务
                 */
                var startPushService = function(obj){
                    console.log("启动推送服务:"+ getWebSocketUrl());
                    account = obj;
                    startHeartbeat();
                    netStatusScan();
                };

                /**
                 * 开始发送心跳检测
                 * 心跳频率：20s
                 */
                var startHeartbeat = function(){
                     //WebsocketService.doSend(sendMsg);
                     heartBeatInterval = $interval(function(){
                         var sendMsg ={"tranCode":"","accountId":"","passwd":"","heartBeatTime":"","list":[]};
                         sendMsg.tranCode = '1002';
                         sendMsg.accountId = account.accountId;
                         sendMsg.heartBeatTime = recvMsg.heartBeatTime;
                         //console.log("发送心跳检测:"+JSON.stringify(sendMsg));
                         doSend(sendMsg);
                     },heartBeatFreq);
                 };

                /**
                 * 停止发送心跳检测
                 */
                var stopHeartbeat = function(){
                    console.log("停止心跳检测");
                    console.log(heartBeatInterval);
                    $interval.cancel(heartBeatInterval);
                };

                /**
                 * 网络监控扫描
                 * 扫描频率
                 */
                var netStatusScan = function(){
                    $interval(function(){
                        console.log("当前连接状态（0:connecting;1:open;2:closing;3:closed）:"+getWsStatus()+"|ws:"+ws);
                        if(getWsStatus() == undefined){
                            console.log("网络初始化连接");
                            stopHeartbeat();
                            wsConnect();
                        }else if(getWsStatus() == '0'){
                            console.log("网络连接中..."+wsUrl);
                        }else if(getWsStatus() == '1'){
                            console.log("网络已连接"+wsUrl);
                        }else if(getWsStatus() == '2'){
                            console.log("网络断开连接中..."+wsUrl);
                        }else if(getWsStatus() == '3'){
                            console.log("网络已断开连接"+wsUrl);
                            console.log(heartBeatInterval);
                            stopHeartbeat();
                            wsConnect();
                        }
                    },netStatusScanFreq);
                };



                /**
                 * 获取websocket连接状态
                 * @returns {string}
                 */
                var getWsStatus = function(){
                    /**
                     * readyState说明：
                     * 0:connecting；1:open;2:closing;3:closed
                     */
                    wsStatus = ws.readyState;
                    return wsStatus;
                };

                /**
                 * 用户签入
                 */
                var signIn = function(){
                    sendMsg.tranCode = "1003";
                    sendMsg.accountId = account.accountId;
                    sendMsg.passwd = '123456';
                    doSend(sendMsg);
                };

                /**
                 * socket连接
                 */
                var wsConnect = function(){
                    if(connectStatus == "01"){
                        ws = new WebSocket(wsUrl);
                        ws.onopen = function(evt){
                            console.log('连接成功'+wsUrl);
                            connectStatus = "00";
                        };
                        ws.onclose = function(evt){
                            console.log(evt);
                            connectStatus = "01";
                        };
                        ws.onmessage = function(responseData){
                            //results.push(responseData.data);
                            handleMessage(responseData.data);
                        };
                        ws.onerror = function(evt){
                            console.log(evt);
                        };
                    }else{
                        console.log("当前客户端已建立websocket连接");
                    }
                };

                //坐席签出
                var checkOut = function(sendMsg,eventMsg){
                };

                /**
                 * 获取网络连接状态
                 * @returns {string} 01：断开；00：连接
                 */
                var getConnectStatus = function(){
                    return connectStatus;
                };
                var doSend = function(sendMsg){
                    console.log("发送报文："+JSON.stringify(sendMsg));
                    ws.send(JSON.stringify(sendMsg));
                };
                var getWebSocketUrl = function(){
                    return wsUrl;
                };

                /**
                 * 消息处理
                 */
                var handleMessage = function(rcvMsg){
                    console.log("获取返回报文："+rcvMsg);
                    var popResult = JSON.parse(rcvMsg);
                    //更新心跳时间
                    if(popResult.heartBeatTime > 0){
                        recvMsg.heartBeatTime = popResult.heartBeatTime;
                        sendMsg.heartBeatTime = popResult.heartBeatTime;
                    }
                    recvMsg.state = popResult.state;//消息状态
                    switch(popResult.tranCode){
                        case "1001"://成功连接返回
                            //启动心跳
                            startHeartbeat();
                            //签入
                            signIn();
                            break;
                        case '1002'://返回心跳报文
                            if(popResult.state == "01"){//坐席未签入
                                signIn();
                            }
                            break;
                        case '1003'://签入返回
                            loginStatus = '签入成功';
                            break;
                        case '1004'://用户签出
                            break;
                        case '1005'://待办任务
                            /**
                             * 待办任务业务逻辑处理
                             */
                                //////////////////////////////////////////////////
                                //recvMsg.msg = popResult.msg;
                            sendMsg.msgId = popResult.msgId;
                            console.log( sendMsg);
                            $rootScope.$emit($rootScope.eventTodoTask,popResult);
                            /**
                             * 发送待办任务接收回执
                             */
                            sendMsg.tranCode = '1005';
                            sendMsg.msg = "待办任务接收成功";
                            doSend(sendMsg);
                            break;
                    }
                };

                return {
                    'startPushService':startPushService
                }
            }
        }
    });

