/**
 * Created by pujjr on 2017/9/21.
 */
angular.module('com.tlms.sys.service',[
    'ngCookies'
])
    .factory('CookieService',['$cookieStore',function($cookieStore){
        var setCookie = function(name,value){
            console.log('setCookie,name='+name+",value="+value);
            //$cookieStore.put('userName','brighttang');
            $cookieStore.put(name,value);

          /*  var date = new Date();
            console.log(date.getTime());
            date.setTime(date.getTime() + 5000);
            var expireTime = date.getTime();
            setCookie("userId","200810405234",expireTime);*/
        };

        var getCookie = function(name){
            return $cookieStore.get(name);
        };
        return {
            'setCookie':setCookie,
            'getCookie':getCookie
        };
    }]);