/**
 * Created by pujjr on 2017/6/27.
 */
angular.module("com.tang.directive",[]);
app.directive("myDirective",function(){
    return {
        restrict:'A',
        replace:true,
        template:'<a href="http://www.baidu.com">跳转百度</a>'
    };
});

app.directive("myDirective2",function(){
    return{
        restrict:'A',
        replace:true,
        template: '<a href="{{ myUrl }}">{{ myLinkText }}</a>',
        scope:{
            myUrl:'@',
            myLinkText:'@'
        }
        /*controller:function($scope){
            $scope.myUrl = "myUrl with @ binding";
            $scope.myLinkText = "myLinkText with @ binding";
        }*/
    };
});

app.directive("myDirective3",function(){
    return{
        restrict:'A',
        //replace:true,
        scope:{
            myUrl3:'@',
            myLinkText3:'@'
        },
        template:'指令内：输入需要跳转到地址(指令内输入，无法同步外部信息【p54页内容】)<input type="text" ng-model="myOutUrl"><a href="{{myUrl3}}">{{myLinkText3}}</a>'

    };
});

app.directive("myDirective4",function(){
    return{
        restrict:"A",
        replace:false,
        scope:{
            myUrl4:'=someUrl',//双向数据绑定（采用了绑定策略“=”而非“@”），与指令外的DOM属性some-url值：theirUrl表示的作用域变量相绑定
            myLinkText4:'@'
        },
        template:'指令内：输入需要跳转到地址(指令内)(指令内输入，同时同步外部信息【p55页内容】)<input type="text" ng-model="myUrl4"/><a href="{{myLinkText4}}">{{myLinkText4}}</a>'

    };
});

app.controller("SomeController",function($scope){
    $scope.someBareValue = "SomeController1";
    $scope.someAction = function(){
        $scope.someBareValue = "SomeController2";
    };
});
app.controller("ChildController",function($scope){
    $scope.childAction = function(){
        $scope.someBareValue = "ChildController";
    };
});

app.controller("SomeController",function(){

});

app.config(function($provide,$compileProvider){
    $provide.factory('myFactory',function(){
        var service = {};
        return service;
    });
    $compileProvider.directive("myDirective5",function(){
        return {
            restrict:"A",
            template:'<button>Click me</button>'
        }
    });
});