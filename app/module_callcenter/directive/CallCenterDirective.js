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
            template:'ָ���ڣ�������Ҫ��ת����ַ(ָ�������룬�޷�ͬ���ⲿ��Ϣ��p54ҳ���ݡ�)<input type="text" ng-model="myOutUrl"><a href="{{myUrl3}}">{{myLinkText3}}</a>',
            //templateUrl:'html/module_callcenter/tpl/callcenter.html',
            controller:'CallCenterController',
            link:function(scope,el,attr){
                console.log('��ʼ����');
                scope.activeCallCenter = 'active';
            }
        };
    });*/
    .directive('callCenterDirective',function(){
        return{
            restrict:"A",
            replace:false,
            scope:{
                activeCallCenter:'=activeCallCenter',//˫�����ݰ󶨣������˰󶨲��ԡ�=�����ǡ�@��������ָ�����DOM����some-urlֵ��theirUrl��ʾ��������������
                myLinkText4:'@'
            },
            /*template:'ָ���ڣ�������Ҫ��ת����ַ(ָ����)(ָ�������룬ͬʱͬ���ⲿ��Ϣ��p55ҳ���ݡ�)<input type="text" ng-model="myUrl4"/>' +
             '<a href="{{myLinkText4}}">{{myLinkText4}}</a>' +
             '<button type="button" ng-click="getData()">�����ȡָ��ģ���ֵ��ֵ</button>',*/
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

