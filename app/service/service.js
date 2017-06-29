/**
 * Created by pujjr on 2017/6/29.
 */
var app = angular.module('myApp',[]/*,function($provide){
    //p120 测试
    $provide.provider('myService3',function(){
        this.$get = function(){
            return {
                userName2:"brighttang33"
            }
        };
    });
}*/);

app.factory('myService',function(){
    var myService = {
        name:"brighttang",
        sex:"男",
        age:10,
        getName:function(){
            return this.name;
        }
    };
    myService.getSex = function(){
        return this.sex;
    };
    myService.setAge = function(age){
        this.age = age;
    };
    myService.getAge = function(){
        return this.age;
    };

    return myService;
});

app.controller('ServiceController',function($scope,myService){
    console.log(myService.getSex);
    console.log(myService.getSex());
    console.log(myService.getName());
    //设置年龄
    $scope.setAge = function(){
        myService.setAge($scope.age);
        alert("设置后年龄myService.getAge()："+myService.getAge());
    };
    //获取年龄
   $scope.getAge = function(){
       myService.setAge(100);
       $scope.age = myService.getAge();
   };

});

app.constant('appId1','111111');
app.value('appId2','222222');
app.config(function(appId1){
    alert("通过"+appId1) ;
});
//通过value函数注册的服务对象，无法注入到配置（config）中，下面语句运行将报错
/*app.config(function(appId2){
    alert(appId2);
});*/

app.controller("ServiceController2",function($scope,myService2,myService3){
    $scope.userName = myService2.userName;
    $scope.userName2 = myService3.userName2;
});
app.provider('myService2',{
    $get:function(){
        return{
            'userName':'brightang'
        }
    }
});

app.provider('myService3',function(){
    this.$get = function(){
        return {
            userName2:"brighttang33"
        }
    };
});



