/**
 * Created by Administrator on 2017/7/21.
 */
angular.module('com.app.callcenter.directive')
    /*.directive('callCenterDirective',function(){
        return{
            restrict:'A',
            //replace:true,
            scope:{
                activeCallCenter:'=activeCallCenter'
            },
            template:'指令内：输入需要跳转到地址(指令内输入，无法同步外部信息【p54页内容】)<input type="text" ng-model="myOutUrl"><a href="{{myUrl3}}">{{myLinkText3}}</a>',
            //templateUrl:'html/module_callcenter/tpl/callcenter.html',
            controller:'CallCenterController',
            link:function(scope,el,attr){
                console.log('初始激活');
                scope.activeCallCenter = 'active';
            }
        };
    });*/
    .directive('callCenterDirective',function(){
        return{
            restrict:"A",
            replace:false,
            scope:{
                activeCallCenter:'=activeCallCenter',//双向数据绑定（采用了绑定策略“=”而非“@”），与指令外的DOM属性some-url值：theirUrl表示的作用域变量相绑定
                myLinkText4:'@'
            },
            /*template:'指令内：输入需要跳转到地址(指令内)(指令内输入，同时同步外部信息【p55页内容】)<input type="text" ng-model="myUrl4"/>' +
             '<a href="{{myLinkText4}}">{{myLinkText4}}</a>' +
             '<button type="button" ng-click="getData()">点击获取指令模板表单值表单值</button>',*/
            templateUrl:'html/module_callcenter/tpl/callcenter.html',
            /*controller:function($scope){
             $scope.doActiveCallCenter = function(){
             $scope.myUrl4 = 'active';
             };
             $scope.getData = function(){
             console.log($scope.myUrl4);
             };
             }*/
            controller:'CallCenterController'
        };
    });

