/**
 * Created by pujjr on 2017/7/26.
 */
angular.module('com.app.process.controller')
    .controller('ProcessController',['$scope','$rootScope','TlmsRestangular','$state',function($scope,$rootScope,TlmsRestangular,$state){
        //$scope.process = {};
        //$rootScope.process = {processInstId:"11"};
        $scope.deployProcess = function(){
            TlmsRestangular.one('service/process/deploy').get()
                .then(function(data){
                });
        };
        $scope.deleteProcess = function(){
            TlmsRestangular.one('service/process/delete').get()
                .then(function(data){
                });
        };
        $scope.startProcess = function(){
            console.log($scope);
            TlmsRestangular.one('service/process/start',$scope.processId).get()
                .then(function(data){
                });
        };

        $scope.queryProcess = function(){
            TlmsRestangular.one('service/process/query').getList()
                .then(function(records){
                    console.log(records);
                    $scope.records = records;
                });
        };
        $scope.readDgrmResource = function(processInstId){
            $scope.process.processInstId = processInstId;
            $scope.process.resourceType = 'dgrmResource';
            $state.go("app.process.query.dgrmResource");
        };
        $scope.readResource = function(processInstId){
            $scope.process.processInstId = processInstId;
            $scope.process.resourceType = 'resource';
            //$state.go("app.process.query.resource");
            window.open("http://localhost:8090/tlms-web/process/source/"+processInstId+"/resource");
            /*TlmsRestangular.one('service/process/source',pdid).get()
             .then(function(records){
             console.log(records);
             //$scope.records = records;
             });*/
            //window.location.href = "http://localhost:8090/tlms-web/service/process/source/2";
        };

        /**
         * 当前任务查询
         */
        TlmsRestangular.one('service/process/task').getList()
            .then(function(records){
                console.log(records);
                //$scope.records = records;
                $rootScope.records = records;
                console.log('当前任务查询');
                console.log($rootScope);
            });
        $scope.queryCurrProcess = function(){
           /* TlmsRestangular.one('service/process/task').getList()
                .then(function(records){
                    console.log(records);
                    //$scope.records = records;
                    $rootScope.records = records;
                    console.log('当前任务查询');
                    console.log($scope);
                });*/
        };

        $scope.readCurrDgrmResource = function(processInstId){
            $scope.process.processInstId = processInstId;
            $scope.process.resourceType = 'dgrmResource';
            $state.go("app.process.task.dgrmResource");
        };

        $scope.readCurrDetailDgrmResource = function(processInstId){
            //$scope.process.processInstId = processInstId;
            $scope.process.processInstId = $rootScope.process.processInstId;
            $scope.process.resourceType = 'dgrmResource';
            console.log($rootScope);
            console.log($scope);
            $state.go("app.process.detail.dgrmResource");
        };

        $scope.queryProcessDetail = function(processInstId){
            console.log('点击查询明细');
            console.log(processInstId);
            console.log($scope);

            $rootScope.process = {processInstId:processInstId};
            $scope.process.processInstId = processInstId;
            console.log($rootScope);
            $state.go("app.process.detail");
        };

        $scope.goBack = function(){
            console.log('返回');
            console.log($scope);
            window.history.back();
        };

        /**
         * 审批操作
         */

        $scope.agree = function(procInstId){
            TlmsRestangular.one('service/process/agree',procInstId).post()
                .then(function(records){
                });
        }
    }]);
