/**
 * Created by pujjr on 2017/7/26.
 */
angular.module('com.app.user.controller')
    .controller('UserController2',['$scope','$rootScope','TlmsRestangular','CookieService',function($scope,$rootScope,TlmsRestangular,CookieService){
        console.log("**************UserController*****************");
        var globalParam = "";//全局变量测试
        //var userList =  TlmsRestangular.all('user').getList();
       /* TlmsRestangular.all('user').get({})
            .then(function(data){
                console.log(JSON.stringify(data));
            });
        TlmsRestangular.all('user').get({'id':'2008'})
            .then(function(data){
                console.log(JSON.stringify(data));
            });
        TlmsRestangular.one('user').get({'id':'2008'})
            .then(function(data){
                console.log(JSON.stringify(data));
            });*/

        /*
        var userList = TlmsRestangular.one('user').getList()
            .then(function(data){
                console.log(JSON.stringify(data[0]));
            });
        //console.log(userList);
        var user = TlmsRestangular.one('user','2008').get()
            .then(function(data){
                console.log(JSON.stringify(data));
            });
*/
        /**
         * get 测试开始
         */
        $scope.allGet = function(){
            TlmsRestangular.allUrl('http://baidu.com');
            var baseAccounts = TlmsRestangular.all('user');
            baseAccounts.getList().then(function(accounts){
                $scope.allAccounts = accounts;
                console.log(accounts);
                for(var i = 0 ; i <  accounts.length ; i ++){
                    console.log(accounts[i]);
                    console.log(JSON.stringify(accounts[i]));
                }
            });
        };
        $scope.oneGet = function(){
            //TlmsRestangular.one('user','123').get()
            /*
            * user和/user效果相同
            * */
            TlmsRestangular.one('/user','123').get()
                .then(function(account){
                    console.log(account);
                    console.log(JSON.stringify(account));
                });
        };

        $scope.oneGet2 = function(){
            //TlmsRestangular.one('user','123').get()
            /*
             * user和/user效果相同
             */
            TlmsRestangular.one('user/v1','123').get()
                .then(function(account){
                    console.log(account);
                    console.log(JSON.stringify(account));
                });
        };

        $scope.oneGet3 = function(){
            TlmsRestangular.one('user/v2').get({'id':'123','userId':'200810405234'})
                .then(function(account){
                    console.log(account);
                    console.log(JSON.stringify(account));
                });
        };

        $scope.oneGet4 = function(){
            TlmsRestangular.one('user/v3','123').one('456').get()
                .then(function(account){
                    console.log(account);
                    console.log(JSON.stringify(account));
                });
        };
        $scope.oneGet5 = function(){
            TlmsRestangular.one('user/v4','123').one('name','456').get()
                .then(function(account){
                    console.log(account);
                    console.log(JSON.stringify(account));
                });
        };

        $scope.oneGet6 = function(){
            TlmsRestangular.all('user/v3').one('456').one('789').get()
                .then(function(account){
                    console.log(account);
                    console.log(JSON.stringify(account));
                });
        };

        $scope.oneGet7 = function(){
            TlmsRestangular.all('user/v5').one('456').one('name','789').getList()
                .then(function(accounts){
                    console.log(accounts);
                    console.log(JSON.stringify(accounts));
                });
        };


        /**
         * post 测试开始
         */
        $scope.allPost = function(){
            TlmsRestangular.all('user').post({"userId":"2008","userName":"唐"})
                .then(function(data){
                    console.log('发送成功');
                });
        };

        /**
         * 用户登录
         */
        $scope.userLogin = function(){
            CookieService.setCookie('userName','brighttang');
            TlmsRestangular.one('login').one('userLogin').post()
                .then(function(data){
                    console.log(data);
                });
        };

        $scope.doTrans = function(){
            TlmsRestangular.one('login').one('doTrans').post()
                .then(function(data){
                    console.log(data);
                });
        };
    }]);
