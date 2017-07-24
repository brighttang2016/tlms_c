/**
 * Created by Administrator on 2017/7/21.
 */
angular.module('com.app.callcenter.directive')
    .directive('callCenterDirective',function(){
        return{
            restrict:"A",
            replace:false,
            scope:{
                activeCallCenter:'=activeCallCenter',//双向数据绑定（采用了绑定策略“=”而非“@”），与指令外的DOM属性some-url值：theirUrl表示的作用域变量相绑定
                myLinkText4:'@'
            },
            templateUrl:'html/module_callcenter/tpl/callcenter.html',
            controller:'CallCenterController'
        };
    });

