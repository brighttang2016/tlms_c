/**
 * Created by pujjr on 2017/7/25.
 */
angular.module('com.app.user.directive')
    .directive('myLink2',function(){
      return {
           restrict:"EA",
           scope:{
               myUrl4:'=someUrl',//双向数据绑定（采用了绑定策略“=”而非“@”），与指令外的DOM属性some-url值：theirUrl表示的作用域变量相绑定
               myLinkText4:'@',
               attrName:'@',
               phoneNum:'=phoneNum'
           },
           replace:false,
           transclude:true,
           templateUrl:'html/module_user/tpl/myLink.html',
           //require:'?^myDirective4',
           require:'?^callCenterDirectiveParent',
           link:function(scope,el,attr,ctrl){
               console.log("*************8888888888888888888888888888888888888888***************");
               console.log(scope);
               console.log(ctrl);
               //scope.phoneNum = "18723290701";
               scope.myLinkTest = ctrl.myLinkTest;
               scope.doActiveCallCenter = ctrl.doActiveCallCenter;
           },
           /*controller:function($scope){
               //$scope.item = {};
               $scope.myLinkTest2 = function(){
                   alert("myLinkTest");
                   console.log($scope);
                   console.log($(this));
                   //sonClick();
               };
           }*/
          controller:'UserController'
       };
    });

var myapp = angular.module('com.app.user.directive');

myapp.controller("MyController", ['$scope', function($scope) {
    $scope.name = "mario";
    $scope.age = "13";
    $scope.send = function() {
        console.log('.............');
    };
}]);
myapp.directive("parent", function() {
    return {
        restrict: 'EA',
        scope:{},
        controller: function() {
            // this.data = ['1', '2', '3', '4', '5'];
            data = ['1', '2', '3', '4', '5'];
            this.click = function() {
                data.pop();
                console.log(data);
            };
            this.myLinkTest2 = function(){
                alert("myLinkTest");
                console.log($(this));
            };
            this.myLinkTest = function(){
                alert("myLinkTest");
                console.log($(this));
            };

        },
        link: function(scope, elem, attrs) {
            scope.name = '123';
        },
        template: '<span>{{name}}<div ng-transclude></div></span>',
        replace: true,
        transclude: true
    };
});
myapp.directive("son", function() {
    return {
        restrict: 'EA',
        repalce: true,
        require: '^?parent',
        template: '<div ng-click="sonClick()">sonClick</div>',
        link: function(scope, elem, atts, ctrl) {
            console.log("ttttttttttttttttttttttttttttttttttttttt");
            console.log(ctrl);
            scope.sonClick = ctrl.click;
            // tmp = ctrl.data;
            // console.log(tmp);
            // ctrl.data.pop();
        }
    };
});
myapp.directive("daughter", function() {
    return {
        restrict: 'EA',
        repalce: true,
        require: '^?parent',
        template: '<div ng-click="daughterClick()">daughterClick</div>',
        link: function(scope, elem, atts, ctrl) {
            console.log(ctrl);
            scope.daughterClick = ctrl.click;
            // tmp = ctrl.data;
            // console.log(tmp);
        }
    };
});
