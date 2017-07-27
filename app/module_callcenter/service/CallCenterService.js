/**
 * Created by pujjr on 2017/7/19.
 */
angular.module('com.app.callcenter.service')
    .factory('CallCenterService',['$rootScope','$timeout','$interval',function($rootScope,$timeout,$interval){
        //报文发送对象
        var ws = 'null';
        //callcenter status
        $rootScope.ccAllStatus = {'未连接':'01',"已连接":"02","未签入":"03","已签入":"04"};
        //callcenter current status
        $rootScope.ccCurrStatus = $rootScope.ccAllStatus.未连接;

        eventMsg = {"prefix":"","msg":""};

        //根据code获取对应name
        var getNameByCode = function(code,paraArr){
            var name = "无匹配名称";
            for(var i = 0 ; i < paraArr[0].length ; i ++){
                var tempCode = paraArr[0][i];
                //console.log("状态码对比："+"****"+tempCode+"****"+code);
                if(tempCode == code){
                    name = paraArr[1][i];
                    break;
                }
            }
            return name;
        };
        //获取交易按钮名称
        var getTranName = function(cmdsn){
            var tranDef = [['10001','10002','10005','10011','10009','10012','10013','10014','10004','10003'],['坐席签入','坐席签出','坐席忙、坐席闲','三方通话','转其他坐席组','转其他坐席','保持/取消保持通话','退出三方通话','结束通话','拨号']];
            return "【"+getNameByCode(cmdsn,tranDef)+"】";
        };

        //获取服务端返回状态
        var getStateByCode = function(stateCode){
            var stateMsg = "无匹配状态";
            var stateArr = [['0','1','2','3','4','-1','-2','-3','-4','-5','-6','-7','-8','-9','-10','-11','-12','-13','-14','-15'],['操作成功','用户拨入弹屏','外拨用户弹屏','用户或者坐席接通(这个的意图是用来做计时开始)','用户或者坐席挂机(这个的意图是用来作计时停止)','socket断开,需要重新连接','状态错误','坐席工号错误','登录密码错误','未签入上班，无法进行其他操作','被叫号码非法','呼叫没有空闲线路异常','数据库错误','其他未知错误','坐席已在其他浏览器签入,不能从当前浏览器迁出','坐席分机号码没注册不能签入上班,转接弹屏的时候分机在忙','呼叫用户号码失败,可能是没注册上落地网关或者落地网关返回错误.','呼叫缓存区100个都满了.','坐席没分配队列不能签入上班','被转接的坐席不是空闲,无法转接.']];
            console.log("stateCode:"+stateCode);
/*            for(var i = 0 ; i < stateArr[0].length ; i ++){
                var tempState = stateArr[0][i];
                //console.log("状态码对比："+"****"+tempState+"****"+stateCode);
                if(tempState == stateCode){
                    stateMsg = stateArr[1][i];
                    break;
                }
            }*/
            return getNameByCode(stateCode,stateArr);
            //return stateMsg;
        };

        var doSend = function(sendMsg,eventMsg){
            //eventMsg.msg = "消息发送";
            if($rootScope.ccCurrStatus == $rootScope.ccAllStatus.未签入 || $rootScope.ccCurrStatus ==  $rootScope.ccAllStatus.未连接){
                eventMsg.msg = '当前用户未签入';
                $timeout(function(){
                    $rootScope.$emit($rootScope.eventRefreshStatus,eventMsg);
                },10);
            }else{
                console.log('发送服务端:'+JSON.stringify(sendMsg));
                ws.send(JSON.stringify(sendMsg));
            }
        };
        var onError = function(evt){
            //console.log(evt);
        };
        //消息接收
        var onMessage = function(evt){
            rcvMsg = JSON.parse(evt.data);
            console.log("**********接收消息rcvMsg begin*************");
            console.log(rcvMsg);
            console.log("**********接收消息rcvMsg end*************");
            var stateCode = rcvMsg.state;//返回码
            var stateMsg = "";//返回信息
            if(stateCode >= 0){//操作成功，服务端返回成功消息
                var stateMsg = getStateByCode(rcvMsg.state);
                if(stateCode == '1'){//用户拨入弹屏
                    $rootScope.$emit($rootScope.eventCallIn,stateMsg);
                }else{
                    eventMsg.prefix = getTranName(rcvMsg.cmdsn);
                    switch(rcvMsg.cmdsn){
                        case "10001":
                            eventMsg.msg = stateMsg;
                            if(rcvMsg.state == '0'){
                                startheartBeat();
                                $rootScope.ccCurrStatus = $rootScope.ccAllStatus.已签入;
                            }else{
                                $rootScope.ccCurrStatus = $rootScope.ccAllStatus.未签入;
                            }
                            $rootScope.$emit($rootScope.eventCheckIn,eventMsg);
                            break;
                        case "10002":
                            eventMsg.msg = stateMsg;
                            $rootScope.$emit($rootScope.eventCheckOut,eventMsg);
                            if(rcvMsg.state == '0'){
                                $interval.cancel(heartBeatTimer);
                                disCnnnect();
                            }
                            break;
                        case "10005"://设置坐席状态
                            if(rcvMsg.para == 0){
                                eventMsg.prefix = "【坐席闲】";
                                eventMsg.msg = '设置当前坐席状态为：闲';
                                $rootScope.$emit($rootScope.eventSeatIdle,eventMsg);
                            }else{
                                eventMsg.prefix = "【坐席忙】";
                                eventMsg.msg = '设置当前坐席状态为：忙';
                                $rootScope.$emit($rootScope.eventSeatBusy,eventMsg);
                            }
                            break;
                        case "10011"://三方通话
                            eventMsg.msg = stateMsg;
                            $rootScope.$emit($rootScope.eventThreeTalk,eventMsg);
                            break;
                        case "10009"://转其他坐席组
                            eventMsg.msg = stateMsg;
                            $rootScope.$emit($rootScope.eventTrans2Group,eventMsg);
                            break;
                        case "10012"://转其他坐席
                            eventMsg.msg = stateMsg;
                            $rootScope.$emit($rootScope.eventTrans2Seat,eventMsg);
                            break;
                        case "10013"://保持/取消保持通话
                            eventMsg.msg = stateMsg;
                            if(rcvMsg.para == "0"){
                                eventMsg.prefix = "【取消保持通话】";
                                $rootScope.$emit($rootScope.eventCancelStayCall,eventMsg);
                            }else{
                                eventMsg.prefix = "【保持通话】";
                                $rootScope.$emit($rootScope.eventStayCall,eventMsg);
                            }
                            break;
                        case "10014"://退出三方通话
                            eventMsg.msg = stateMsg;
                            $rootScope.$emit($rootScope.eventExitThreeCall,eventMsg);
                            break;
                        case "10004"://结束通话
                            eventMsg.msg = stateMsg;
                            $rootScope.$emit($rootScope.eventKillCall,eventMsg);
                            break;
                        case "10003"://拨号
                            eventMsg.msg = stateMsg;
                            $rootScope.$emit($rootScope.eventMakeCall,eventMsg);
                            break;
                    }
                }
            }else{//操作失败，服务端返回失败消息
                eventMsg.msg = "错误信息:"+getStateByCode(stateCode);
                $rootScope.$emit($rootScope.eventRefreshStatus,eventMsg);
            }
        };

        var onClose = function(evt){
            //console.log($rootScope);
            console.log("关闭链接");
            endHeartBeat();
            if($rootScope.ccCurrStatus == $rootScope.ccAllStatus.未连接){
                eventMsg.msg = '签入失败，无法连接服务器';
            }else{
                eventMsg.msg = '关闭连接成功';
                $rootScope.ccCurrStatus = $rootScope.ccAllStatus.未连接;
            }
            $rootScope.$emit($rootScope.eventDisConnect,eventMsg);
        };

        //连接
        var connnect = function(sendMsg){
            ws = new WebSocket(SERVER_URL.WS_URI);
            //ws = $WebSocket(SERVER_URL.WS_URI);
            ws.onopen = function(evt){
                eventMsg.msg = '连接成功';
                $rootScope.$emit($rootScope.eventConnect,eventMsg);
                $rootScope.ccCurrStatus = $rootScope.ccAllStatus.已连接;
                doSend(sendMsg);
            };
            ws.onclose = function(evt){
                onClose(evt);
            };
            ws.onmessage = function(evt){
                onMessage(evt);
            };
            ws.onerror = function(evt){
                onError(evt);
            };
        };

        //断开链接
        var disCnnnect = function(){
            eventMsg.prefix = "【断开连接】";
            ws.close();
        };

        //坐席签入
        var checkIn = function(sendMsg,eventMsg){
            //eventMsg.prefix = "【坐席签入】";
            if($rootScope.ccCurrStatus == $rootScope.ccAllStatus.已签入){
                $timeout(function(){
                    eventMsg.msg = "已成功签入，请勿重复签入";
                    $rootScope.$emit($rootScope.eventRefreshStatus,eventMsg);
                },10);
            }else{
                $timeout(function(){
                    eventMsg.msg = "坐席签入中，请稍候...";
                    $rootScope.$emit($rootScope.eventRefreshStatus,eventMsg);
                },20);
                connnect(sendMsg);
            }
        };

        //启动呼叫中心心跳检测：web 每10s 发一次心跳数据包， 超过30s 没收到心跳,ivr 将关闭连接
        function startheartBeat(){
            heartBeatTimer = $interval(function(){
                doSend("{}",{});
            },10000);
        };

        //停止呼叫中心心跳检测
        function endHeartBeat(){
            $interval.cancel(heartBeatTimer);
        }

        //坐席签出
        var checkOut = function(sendMsg,eventMsg){
            //eventMsg.prefix = "【坐席签出】";
            doSend(sendMsg,eventMsg);
        };
        return {
            'connect':connnect,
            'disCnnnect':disCnnnect,
            'doSend':doSend,
            'checkIn':checkIn,
            'checkOut':checkOut,
            'getTranName':getTranName
        }
    }]);

