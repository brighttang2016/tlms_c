/**
 * Created by pujjr on 2017/7/26.
 */
angular.module('com.app.process.controller')
    .controller('ProcessController',['$scope','$rootScope','TlmsRestangular','$state',function($scope,$rootScope,TlmsRestangular,$state){
        $scope.deployProcess = function(){
            TlmsRestangular.one('service/process/deploy').get()
                .then(function(data){

                });
        };

    }]);
