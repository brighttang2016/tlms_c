/**
 * Created by pujjr on 2017/6/28.
 */
var app = angular.module('myApp',['ngRoute'])
    .config(['$locationProvider',function($locationProvider){
        $locationProvider.html5Mode(false);
        $locationProvider.hashPrefix('');
    }]);
app.run(['$rootScope','$location',function($rootScope,$location){
    $rootScope.$on('$routeChangeStart',function(evt,next,current){
        //console.log(evt);
        //console.log(next);
        //console.log(current);
    });
}]);

app.config(['$routeProvider',function($routeProvider){
    $routeProvider
        .when('/', {
            template: '首页'
         })
        .when('/#computers',{
            template:'电脑页面'
        })
        .when('/printers',{
            template:'打印机页面'
        })
        .when('/blabla',{
            template:'其他页面'
        })
        .when('/userManage',{
            templateUrl:'route.tpl.html'
})
        .when('/userManage/:name',{
            controller:'UserManageController',
            redirectTo:function(route,path,search){
                //console.log(route.name);
            }
        })
        .when('/toMain',{
            redirectTo:function(route,path,search){
                //console.log(route);
                //console.log(path);
                //console.log(search);
                return "/";
            }
        })
        .otherwise({
            redirect:'/'
        });
}]);

app.controller('UserManageController',function($scope,$routeParams,$location){
    //console.log($location.path());
    //console.log($location.url());
});

app.factory('greeter',function(){
    //console.log(app.factory);
    return {
        greet:function(msg){
          alert(msg);
      }
    };
});
app.controller("MyController",function($scope,greeter){
    //console.log("MyController");
    console.log(greeter);
    $scope.sayHello = function(){
        greeter.greet("Hello!");
    };
});

