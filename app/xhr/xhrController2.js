/**
 * Created by pujjr on 2017/7/11.
 */
angular.module('com.tang.controller.MyController2',[])
    .controller("MyController2", ["$scope", "$q", function ($scope, $q) {
        alert("MyController2");
        $scope.flag = true;
        $scope.handle = function () {
            var deferred = $q.defer();
            var promise = deferred.promise;
            console.log("1111");
            promise.then(function (result) {
                result = result + "you have passed the first then()";
                console.log(result);
                $scope.status = result;
                return result;
            }, function (error) {
                error = error + "failed but you have passed the first then()";
                console.log(error);
                $scope.status = error;
                return error;
            }).then(function(result){
                result = "第二个then  success";
                console.log(result);
            },function(error){
                error = "第二个then  error";
                console.log(error);
            });
            console.log("2222");
            if ($scope.flag) {
                deferred.resolve("you are lucky!");
            } else {
                deferred.reject("sorry, it lost!");
            }
            console.log("3333");
        }
    }]);
