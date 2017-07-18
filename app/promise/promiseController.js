/**
 * Created by pujjr on 2017/7/3.
 */
angular.module('MyApp.MyController',[])
    .controller('IndexController',["$scope","loginService",function($scope,loginService){
        console.log("IndexController");
        $scope.name = "dreamapple";
        $scope.show = true;
       loginService.getPullRequests().then(function(result){
                    console.log(result);
                    $scope.data = result+'resolve';
                },function(error){
                    console.log(error);
                    $scope.data = error+'reject';
                },function(progress){
                    console.log("progress:"+progress);
                    $scope.data = "progress:"+progress;
                   //$scope.progress = progress;
                   //$scope.show = false;
           }).catch(function(reason){
                alert("reason:"+reason);
           }).finally(function(final){
                alert("final:"+final);
           });
        //loginService.getPullRequests();
    }]);