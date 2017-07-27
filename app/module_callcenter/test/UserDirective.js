/**
 * Created by Administrator on 2017/7/21.
 */
angular.module('com.app.user.directive')
    .directive('myDirective4',function(){
        return{
            restrict:"EA",
            replace:true,
            scope:{
                myUrl4:'=someUrl'//双向数据绑定（采用了绑定策略“=”而非“@”），与指令外的DOM属性some-url值：theirUrl表示的作用域变量相绑定
                //myLinkText4:'@'
            },
            /*template:'指令内：输入需要跳转到地址(指令内)(指令内输入，同时同步外部信息【p55页内容】)<input type="text" ng-model="myUrl4"/>' +
            '<a href="{{myLinkText4}}">{{myLinkText4}}</a>' +
            '<button type="button" ng-click="getData()">点击获取指令模板表单值表单值</button>',*/
            //templateUrl:'html/module_user/tpl/myDirective4.tpl.html',
            /*controller:function($scope){
                $scope.getData = function(){
                    console.log($scope.myUrl4);
                };
            }*/
            controller:'UserController'
        };
       /* return {
            restrict: 'EA',
            scope:{},
            controller: function() {
                // this.data = ['1', '2', '3', '4', '5'];
                data = ['1', '2', '3', '4', '5'];
                this.click = function() {
                    data.pop();
                    console.log(data);
                };
                this.myLinkTest = function(){
                    alert("myLinkTest");
                    console.log($(this));
                };
                this.sonClick = function(){
                    alert("sonClick");
                    console.log($(this));
                };


            },
            link: function(scope, elem, attrs) {
                scope.name = '123';
            },
            template: '<span>{{name}}<div ng-transclude></div></span>',
            replace: true,
            transclude: true
        };*/
    });

