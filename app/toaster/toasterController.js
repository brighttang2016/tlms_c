/**
 * Created by pujjr on 2017/7/17.
 */
angular.module('com.tang.controller.ToasterController',['toaster'])
    .controller('ToasterController',function($scope,toaster){
        $scope.pop = function(){
          //toaster.pop('success','title','text');
            toaster.clear(toastInstance);//注释这句和加上这句看看效果就明白了
          //  var toastInstance = toaster.pop({type: 'warning', body: 'Hello',title:'提示信息',timeout:1000});//error\success\info
            var toastInstance = toaster.pop({type: 'error', body: 'Hello',title:'提示信息'});//error\success\info
            toastInstance();

        };
    });
