/**
 * Created by pujjr on 2017/6/26.
 */
var app = angular.module('myApp', []);
app.controller('MyContryller0', function($scope) {
    //alert($scope);
    //console.log($scope);
    $scope.firstName = "John";
    $scope.lastName = "Doe";
});
app.controller('MyController1',function MyController($scope) {
    $scope.clock = {
        now: new Date()
    };
    var updateClock = function() {
        $scope.clock.now = new Date()
    };
    setInterval(function() {
        $scope.$apply(updateClock);
    }, 1000);
    updateClock();
});

app.controller('MyController2',function($scope,$timeout){
   var updateClock = function(){
       $scope.clock2 = {now:new Date()};
       $timeout(function(){
           updateClock();
       },1000);
   };
    updateClock();
    $scope.amount = 0;
    $scope.add = function(offset){
      $scope.amount = $scope.amount + offset;
    };
    $scope.substract = function(offset){
        $scope.amount = $scope.amount - offset;
    };
});

app.controller("ParentController",function($scope){
    $scope.person = {name:"brighttang"};
});
app.controller("ChildController",function($scope){
    $scope.sayHello = function(){
        $scope.person.name = "王小二";
    };
});
app.controller("MyController3",function($scope,$parse){
    var watch =  $scope.$watch("expression",function(newVal,oldVal,scope){
        if(newVal == oldVal){
            return;
        }else{
            var parseFun = $parse(newVal);
            //console.log(parseFun);
            $scope.parseValue = parseFun(scope);
        }
    });
    // 注销监听
    //watch();
});


app.controller('mainCtrl', function ($scope) {
        $scope.person = {
            name:"allen",
            age:21
        };
        $scope.$watch("person", function(n, o){
            //取消第一次加载时的监听响应
            if(n == o){
                return;
            }
            $scope.status = n;
        },true)
});

app.controller("MyController4",function($scope,$interpolate){
    $scope.$watch("emailBody",function(newVal, oldVal, scope){
        if(newVal){
            var interpolatedFunc = $interpolate(newVal);
            console.log(interpolatedFunc);
            //$scope.interpolatedValue = interpolatedFunc({myName: $scope.myName});
            $scope.interpolatedValue = interpolatedFunc(scope);
        }
    });
});

