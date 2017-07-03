/**
 * Created by pujjr on 2017/7/3.
 */
angular.module('MyController',[])
    .controller('IndexController',["$scope","githubService",function($scope,githubService){
        console.log("IndexController");
        $scope.name = "dreamapple";
        $scope.show = true;
        githubService.getPullRequests().then(function(result){
            $scope.data = result;
        },function(error){
            $scope.data = "error!";
        },function(progress){
            $scope.progress = progress;
            $scope.show = false;
        });
    }]);