/**
 * Created by pujjr on 2017/7/26.
 */
angular.module('com.app.process.controller')
    .controller('ProcessModelController',['$scope','$rootScope','TlmsRestangular','$state','StorageService',function($scope,$rootScope,TlmsRestangular,$state,StorageService){

        $scope.queryModel = function(){
            TlmsRestangular.one('process/model').getList()
                .then(function(records){
                   $scope.models = records;
                });
        };
        $scope.editModel = function(modelId){
            window.open("http://localhost:8090/tlms-web/modeler.html?modelId="+modelId);
            /*TlmsRestangular.one('proces/model',modelId).post()
                .then(function(){
                });*/
        };

        $scope.deployModel = function(modelId){
            TlmsRestangular.one('process/model/deploy',modelId).post()
                .then(function(){
                });
        };

        $scope.deleteModel = function(modelId){
            TlmsRestangular.one('process/model',modelId).remove()
                .then(function(){
                    $scope.queryModel();
                });
        };

        $scope.designProcess = function(){
            console.log($scope);
            TlmsRestangular.one('process/design').get()
                .then(function(data){
                    $scope.queryModel();
                });
        };

/*
        $scope.deployProcess = function(){
            TlmsRestangular.one('process/deploy').get()
                .then(function(data){
                });
        };
        $scope.deleteProcess = function(){
            TlmsRestangular.one('process/delete').get()
                .then(function(data){
                });
        };
        $scope.startProcess = function(){
            console.log($scope);
            TlmsRestangular.one('process/start',$scope.processId).get()
                .then(function(data){
                });
        };
        $scope.designProcess = function(){
            console.log($scope);
            TlmsRestangular.one('process/design').get()
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
        $scope.readResource = function(){
            var procInstId = StorageService.getStorage('procInstId')+"";
            window.open("http://localhost:8090/tlms-web/process/source/"+procInstId+"/resource");
        };

        /!**
         * 当前任务查询
         *!/
       /!* TlmsRestangular.one('process/task').getList()
            .then(function(records){
                console.log(records);
                //$scope.records = records;
                $rootScope.records = records;
                console.log('当前任务查询');
                console.log($rootScope);
            });*!/
        $scope.queryCurrProcess = function(){
        };

        $scope.readDgrmResource = function(){
            //$scope.process.processInstId = processInstId;
            //$scope.process.processInstId = $rootScope.process.processInstId;
            $scope.process = {};
            var procInstId =StorageService.getStorage('procInstId')+"";
            $scope.process.processInstId = procInstId;
            $scope.process.resourceType = 'dgrmResource';
            console.log($rootScope);
            console.log($scope);

            /!**
             * 流程图模板页面显示流程图
             * @type {string}
             *!/
            $scope.dgrmSrc = 'http://localhost:8090/tlms-web/process/source/'+procInstId+'/dgrmResource?uuid='+new Date();
            $state.go("app.process.detail.dgrmResource");
            /!**
             * diagram view 显示流程图
             *!/

            window.open('html/diagramviewer/showDiagramViewer.html');
        };


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
        };*/

        $scope.goBack = function(){
            console.log('返回');
            console.log($scope);
            window.history.back();
        };
    }]);
