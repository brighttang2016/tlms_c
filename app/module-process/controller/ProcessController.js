/**
 * Created by pujjr on 2017/7/26.
 */
angular.module('com.app.process.controller')
    .controller('ProcessController',['$scope','$rootScope','TlmsRestangular','$state','StorageService',function($scope,$rootScope,TlmsRestangular,$state,StorageService){
        //$scope.process = {};
        //$rootScope.process = {processInstId:"11"};
        $scope.deployProcess = function(){
            TlmsRestangular.one('process/deploy').get()
                .then(function(data){
                });
        };

        $scope.deleteProcessDefCascade = function(pdid){
            TlmsRestangular.one('process/def/cascade',pdid).remove()
                .then(function(data){
                });
        };

        $scope.deleteProcessDef = function(pdid){
            TlmsRestangular.one('process/def',pdid).remove()
                .then(function(data){
                });
        };


        $scope.startProcessByKey = function(key){
            console.log($scope);
            TlmsRestangular.one('process/start',key).get()
                .then(function(data){
                });
        };

        $scope.queryProcess = function(){
            TlmsRestangular.one('process/query').getList()
                .then(function(records){
                    console.log(records);
                    $scope.records = records;
                });
        };
        $scope.querySpecialProc = function(){
            TlmsRestangular.one('process/query',$scope.bysiKey).one($scope.pdKey).getList()
                .then(function(records){
                    console.log(records);
                    $scope.records = records;
                });
        };
        $scope.queryDefineProcess = function(){
            TlmsRestangular.one('process/query/def').getList()
                .then(function(records){
                    $scope.records = records;
                });
        };


       /* $scope.readDgrmResource = function(processInstId){
            //$scope.process.processInstId = processInstId;
            //$scope.process.resourceType = 'dgrmResource';
            $scope.process = StorageService.getStorage('process');
            $state.go("app.process.query.dgrmResource");
        };*/
        $scope.readResource = function(){
            var procInstId = StorageService.getStorage('procInstId')+"";
            window.open("http://localhost:8090/tlms-web/source/"+procInstId+"/resource");
        };

        /**
         * 当前任务查询
         */
        TlmsRestangular.one('process/task').getList()
            .then(function(records){
                console.log(records);
                //$scope.records = records;
                $rootScope.records = records;
                console.log('当前任务查询');
                console.log($rootScope);
            });
        $scope.queryCurrProcess = function(){
           /* TlmsRestangular.one('process/task').getList()
                .then(function(records){
                    console.log(records);
                    //$scope.records = records;
                    $rootScope.records = records;
                    console.log('当前任务查询');
                    console.log($scope);
                });*/
        };

        /*$scope.readCurrDgrmResource = function(processInstId){
            console.log('跳转流程图状态');
            $scope.process.processInstId = processInstId;
            $scope.process.resourceType = 'dgrmResource';
            StorageService.setStorage("process",$scope.process);
            $state.go("app.process.task.dgrmResource");
        };*/

        $scope.readDgrmResource = function(){
            //$scope.process.processInstId = processInstId;
            //$scope.process.processInstId = $rootScope.process.processInstId;
            $scope.process = {};
            var procInstId =StorageService.getStorage('procInstId')+"";
            $scope.process.processInstId = procInstId;
            $scope.process.resourceType = 'dgrmResource';
            console.log($rootScope);
            console.log($scope);

            /**
             * 流程图模板页面显示流程图
             * @type {string}
             */
            $scope.dgrmSrc = 'http://localhost:8090/tlms-web/source/'+procInstId+'/dgrmResource?uuid='+new Date();
            $state.go("app.process.detail.dgrmResource");
            /**
             * diagram view 显示流程图
             */

            window.open('html/diagramviewer/showDiagramViewer.html');
        };



       /* $scope.queryProcessDetailCommon = function(processInstId){
            console.log('点击查询明细(全流程监控)');
            console.log(processInstId);
            console.log($scope);
            //$rootScope.process = {processInstId:processInstId};
            //$scope.process.processInstId = processInstId;
            StorageService.setStorage("procInstId",processInstId);
            console.log($rootScope);
            $state.go("app.process.detail");
        };*/

        $scope.queryProcessDetail = function(procInstId,pdid){
            console.log('点击查询明细');
            console.log(procInstId);
            console.log($scope);

            //$rootScope.process = {processInstId:procInstId};
            //$scope.process.procInstId = procInstId;
            StorageService.setStorage("procInstId",procInstId);
            StorageService.setStorage("pdid",pdid);
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
        $scope.agree = function(){
            TlmsRestangular.one('process/agree', StorageService.getStorage('procInstId')).post()
                .then(function(records){
                });
        };
        $scope.reject = function(){
            TlmsRestangular.one('process/reject', StorageService.getStorage('procInstId')).post()
                .then(function(records){
                });
        };

    }]);
