/**
 * Created by pujjr on 2017/7/26.
 */
angular.module('com.app.block.controller')
    .controller('BlockController',['$scope','$rootScope','TlmsRestangular','$state',function($scope,$rootScope,TlmsRestangular,$state){
        $scope.signOut = function(){
            console.log("777777777");
            TlmsRestangular.all('service/signout').post($scope.user)
                .then(function(data){
                    console.log("11");
                    console.log(data);
                    //$rootScope.user.userId = $scope.user.userId;
                    $state.go('signin');
                });
        };
    }]);
