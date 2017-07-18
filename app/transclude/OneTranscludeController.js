/**
 * Created by pujjr on 2017/7/7.
 */
angular.module('OneTranscludeController',[])
    .controller('oneTranscludeController',['$scope',function($scope){
        $scope.onTranscludeClick = function(){
          console.log("onTranscludeClick");
        };
    }]);

