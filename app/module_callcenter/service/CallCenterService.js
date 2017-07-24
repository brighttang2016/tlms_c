/**
 * Created by pujjr on 2017/7/19.
 */
angular.module('com.app.callcenter.service')
    .factory('CallCenterService',['$rootScope','$timeout',function($rootScope,$timeout){
        //报文发送对象
        var ws = 'null';
        //callcenter status
        $rootScope.ccAllStatus = {'未连接':'01',"已连接":"02","未签入":"03","已签入":"04"};
        //callcenter current status
        $rootScope.ccCurrStatus = $rootScope.ccAllStatus.未连接;
        var eventMsg = {"msg":""};
        //获取状态
        var getStateByCode = function(stateCode){
            console.log("stateCode:"+stateCode);
            var stateMsg = "无匹配状态";
            var stateArr = [['0','1','2','3','4','-1','-2','-3','-4','-5','-6','-7','-8','-9','-10','-11','-12','-13','-14','-15'],['操作成功','用户拨入弹屏','外拨用户弹屏','用户或者坐席接通(这个的意图是用来做计时开始)','用户或者坐席挂机(这个的意图是用来作计时停止)','socket断开，需要重新连接','状态错误，','坐席工号错误','登录密码错误','未签入上班，无法进行其他操作','被叫号码非法','呼叫没有空闲线路异常','数据库错误','其他未知错误','坐席已在其他浏览器签入,不能从当前浏览器迁出','坐席分机号码没注册不能签入上班,转接弹屏的时候分机在忙','呼叫用户号码失败,可能是没注册上落地网关或者落地网关返回错误.','呼叫缓存区100个都满了.','坐席没分配队列不能签入上班','被转接的坐席不是空闲,无法转接.']];
            for(var i = 0 ; i < stateArr[0].length ; i ++){
                var tempState = stateArr[0][i];
                console.log("状态码对比："+"****"+tempState+"****"+stateCode);
                if(tempState == stateCode){
                    stateMsg = stateArr[1][i];
                    break;
                }
            }
            return stateMsg;
        };

        var doSend = function(sendMsg){
            eventMsg.msg = "消息发送:";
            if($rootScope.ccCurrStatus == $rootScope.ccAllStatus.未签入 || $rootScope.ccCurrStatus ==  $rootScope.ccAllStatus.未连接){
                eventMsg.msg += '当前用户未签入';
                $timeout(function(){
                    $rootScope.$emit($rootScope.eventRefreshStatus,eventMsg);
                },10);
            }else{
                console.log('发送服务端:'+JSON.stringify(sendMsg));
                ws.send(JSON.stringify(sendMsg));
            }
        };
        var onError = function(evt){
            console.log(evt);
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
                    switch(rcvMsg.cmdsn){
                        case "10001":
                            eventMsg.msg = '坐席签入:'+stateMsg;
                            if(rcvMsg.state == '0'){
                                $rootScope.ccCurrStatus = $rootScope.ccAllStatus.已签入;
                            }else{
                                $rootScope.ccCurrStatus = $rootScope.ccAllStatus.未签入;
                            }
                            $rootScope.$emit($rootScope.eventCheckIn,eventMsg);
                            break;
                        case "10002":
                            eventMsg.msg = '坐席签出:'+stateMsg;
                            $rootScope.$emit($rootScope.eventCheckOut,eventMsg);
                            if(rcvMsg.state == '0'){
                                disCnnnect();
                            }
                            break;
                        case "10005"://设置坐席状态
                            if(rcvMsg.para == 0){
                                eventMsg.msg = '设置坐席状态：闲';
                                $rootScope.$emit($rootScope.eventSeatIdle,eventMsg);
                            }else{
                                eventMsg.msg = '设置坐席状态：忙';
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
                                $rootScope.$emit($rootScope.eventCancelStayCall,eventMsg);
                            }else{
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
            $rootScope.ccCurrStatus = $rootScope.ccAllStatus.未连接;
            eventMsg.msg += '操作成功';
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
            eventMsg.msg = "断开连接:";
            ws.close();
        };

        //坐席签入
        var checkIn = function(sendMsg){
            eventMsg.msg = "坐席签入:";
            if($rootScope.ccCurrStatus == $rootScope.ccAllStatus.已签入){
                $timeout(function(){
                    eventMsg.msg += "已成功签入，请勿重复签入";
                    $rootScope.$emit($rootScope.eventRefreshStatus,eventMsg);
                },10);
            }else{
                connnect(sendMsg);
            }
        };

        //坐席签出
        var checkOut = function(sendMsg){
            eventMsg.msg = "坐席签出:";
            doSend(sendMsg);
        };
        return {
            'connect':connnect,
            'disCnnnect':disCnnnect,
            'doSend':doSend,
            'checkIn':checkIn,
            'checkOut':checkOut
        }
    }]);

