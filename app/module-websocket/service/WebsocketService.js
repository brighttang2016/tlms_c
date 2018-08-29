/**
 * Created by pujjr on 2017/7/19.
 */

angular.module('com.app.websocket.service')
    .provider('WebsocketService',['$injector',function($injector){
        var wsUrl = "";
        var ws = "";
        var connectStatus = "01";//连接状态,01:断开连接；00：打开连接
        var results = [];//存储服务端返回消息
        var wsStatus = "";

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
        var wsConnect = function(){
            console.log("客户端发起连接，connectStatus="+connectStatus+",wsUrl="+wsUrl);
            if(connectStatus == "01"){
                ws = new WebSocket(wsUrl);
                ws.onopen = function(evt){
                    console.log('连接成功');
                    connectStatus = "00";
                };
                ws.onclose = function(evt){
                    console.log(evt);
                    connectStatus = "01";
                };
                ws.onmessage = function(responseData){
                    results.push(responseData.data);
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
         * get区域
         */
        var getResults = function(){
          return results;
        };
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

       this.setWebSocketUrl = function(webSocketUrl){
            wsUrl = webSocketUrl;
            console.log("设置参数setBaseUrl:"+wsUrl);
        };
        /*return {
            $get : function(){
                var name = 'aa';
                console.log("*******$get********");
                function getName(){
                    var $rootScope = $injector.get('$rootScope');
                    return name;
                }
                function setWebSocketUrl(webSocketUrl){
                    var $rootScope = $injector.get('$rootScope');
                    wsUrl = webSocketUrl;
                    console.log("设置参数setBaseUrl:"+wsUrl);
                }

                return {
                    'wsConnect':wsConnect,
                    'doSend':doSend,
                    'getWebSocketUrl':getWebSocketUrl,
                    'getResults':getResults,
                    'getConnectStatus':getConnectStatus,
                    'getWsStatus':getWsStatus,
                    getName:getName,
                    setWebSocketUrl:setWebSocketUrl
                }
            }
        };*/
        this.$get = function(){
            var name = 'aa';
            console.log("*******$get********");
            return {
                'wsConnect':wsConnect,
                'doSend':doSend,
                'getWebSocketUrl':getWebSocketUrl,
                'getResults':getResults,
                'getConnectStatus':getConnectStatus,
                'getWsStatus':getWsStatus
            }
        };
    }]);

