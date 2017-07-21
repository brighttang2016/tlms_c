/**
 * Created by pujjr on 2017/7/19.
 */
angular.module('com.app.callcenter.service')
    .factory('CallCenterService',['$rootScope',function($rootScope){
        //报文发送对象
        var eventMsg = {"msg":""};
        var stateArr = [['0','1','2','3','4','-1','-2','-3','-4','-5','-6','-7','-8','-9','-10','-11','-12','-13','-14','-15'],['操作成功','用户拨入弹屏','外拨用户弹屏','用户或者坐席接通(这个的意图是用来做计时开始)','用户或者坐席挂机(这个的意图是用来作计时停止)','socket断开，需要重新连接','状态错误，','坐席工号错误','登录密码错误','未签入上班，无法进行其他操作','被叫号码非法','呼叫没有空闲线路异常','数据库错误','其他未知错误','坐席已在其他浏览器签入,不能从当前浏览器迁出','坐席分机号码没注册不能签入上班,转接弹屏的时候分机在忙','呼叫用户号码失败,可能是没注册上落地网关或者落地网关返回错误.','呼叫缓存区100个都满了.','坐席没分配队列不能签入上班','被转接的坐席不是空闲,无法转接.']];

        var doSend = function(sendMsg){
            console.log('发送服务端：'+JSON.stringify(sendMsg));
            if(ws == null){
                eventMsg.msg = '错误：请先签到';
                $rootScope.$emit($rootScope.eventRefreshStatus,eventMsg);
            }else{
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
                switch(rcvMsg.cmdsn){
                    case "100":
                        eventMsg.msg = '签入成功';
                        $rootScope.$emit($rootScope.eventCheckIn,eventMsg);
                        break;
                    case "101":
                        disCnnnect();
                        eventMsg.msg = '签出成功';
                        $rootScope.$emit($rootScope.eventCheckOut,eventMsg);
                        break;
                    case "105":
                        if(rcvMsg.para == 0){
                            eventMsg.msg = '设置坐席状态：闲';
                            $rootScope.$emit($rootScope.eventSeatIdle,eventMsg);
                        }else{
                            eventMsg.msg = '设置坐席状态：忙';
                            $rootScope.$emit($rootScope.eventSeatBusy,eventMsg);
                        }
                        break;
                }
            }else{//操作失败，服务端返回失败消息
                for(var i = 0 ; i < stateArr[0].length ; i ++){
                    for(var j = 0 ; j < stateArr[1].length ; j++){
                        if(stateArr[0][i] == stateCode){
                            stateMsg = stateArr[1][j];
                        }
                    }
                }
                eventMsg.msg = stateMsg;
                $rootScope.$emit($rootScope.eventRefreshStatus,eventMsg);
            }
        };

        var onClose = function(evt){
            console.log(event);
        };
        var onOpen = function(evt){
            console.log(evt);
            checkIn();
        };
        //连接
        var connnect = function(sendMsg){
            ws = new WebSocket(SERVER_URL.WS_URI);
            //ws = $WebSocket(SERVER_URL.WS_URI);
            ws.onopen = function(evt){
                //onOpen(evt);
                //checkIn(sendMsg);
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
            }

        };
        //断开链接
        var disCnnnect = function(){
            ws.close();
        };

      /* var checkIn = function(sendMsg){
            //connnect();
            var cmdsn = '100';
            var seatno = '8010';
            var password = '123456';
            var caller = '1001';
            var cmd = '1';
            sendMsg.cmdsn = cmdsn;
            sendMsg.seatno = seatno;
            sendMsg.para = password;
            sendMsg.caller = caller;
            sendMsg.cmd = cmd;
            doSend(sendMsg);
        };*/

        /*var checkOut = function(){
            sendMsg.cmdsn = '101';
            sendMsg.seatno = '8010';
            sendMsg.para = '';
            sendMsg.caller = '';
            sendMsg.cmd = '2';
            doSend(sendMsg);
        };*/

        return {
            'connect':connnect,
            'disCnnnect':disCnnnect,
            'doSend':doSend/*,
            'checkIn':checkIn,
            'checkOut':checkOut*/
        }
    }]);

