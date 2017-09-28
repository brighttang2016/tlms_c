/**
 * Created by pujjr on 2017/9/21.
 */
angular.module('com.tlms.sys.service')
    .factory('StorageService',function(){
        var setStorage = function(name,value){
            console.log(name);
            console.log(value);
            try{
                window.localStorage[name] = JSON.stringify(value);
            }catch(e){
                window.localStorage[name] = value;
            }

            //window.localStorage.a = 3;
        };

        var getStorage = function(name){
            var ret;
            try{
                ret = JSON.parse(window.localStorage[name]);
            }catch(e){
                ret = window.localStorage[name];
            }
            console.log('ret:'+ret);
            return  ret;
        };

        var clearStorage = function(name){
            window.localStorage.clear();
        };

        return {
            'setStorage':setStorage,
            'getStorage':getStorage
        };
    });