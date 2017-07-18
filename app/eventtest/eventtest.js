/**
 * Created by pujjr on 2017/7/6.
 */
var app = angular.module('myApp',[]);
app.controller("myControl",['$scope',function($scope){
    $scope.$on('directiveClick',function(event,param){
        console.log("**********父级监听directiveClick事件函数执行开始***********");
        console.log(event);
        console.log(param);
        console.log("**********父级监听directiveClick事件函数执行结束***********");
    });
    $scope.myChange = function(title){
        console.log("********************myChange执行开始**************************");
        console.log(title);
        var result = '我是父级广播下来的父级作用域的消息';
        $scope.$broadcast('myParentBroadcast',{msg:result});
        console.log("********************myChange执行借宿**************************");
    };
}]);

app.directive('eventDirective',function(){
    return {
        restrict:'A',
        replace:false,
        scope:{
            tangChange:'&'
        },
        template:'<a>点我向上冒泡</a>',
        link:function(scope,el,attr){
            console.log(scope);
            console.log(el);
            console.log(attr);
            el.on('click',function(){
                scope.$emit('directiveClick',{msg:'我是来自子级作用域的消息'});
               scope.tangChange();
            });

            scope.$on('myParentBroadcast',function(event,msg){
                console.log("**********子级监听父级广播事件执行开始***********");
                console.log(event);
                console.log(msg);
                console.log("**********子级监听父级广播事件执行结束***********");
            });
        }
    };
});

app.directive("myDirective",function(){
    return {
        restrict:'A',
        replace:false,
        template:'<a href="http://www.baidu.com">跳转百度</a>'
    };
});


