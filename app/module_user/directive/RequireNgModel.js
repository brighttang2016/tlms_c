/**
 * Created by pujjr on 2017/7/31.
 */
angular.module('com.app.user.directive')
    .directive('requireNgModel',['$compile',function($compile){
        return {
            restrict:'A',
            require:'ngModel',
            link:function(scope,el,attr,ngModelController){
                console.log("***********requireNgModel***********");
                console.log(scope);
                console.log(ngModelController);
                var mobileIcon='<label>&nbsp;<i class="fa fa-phone-square fa-xs phone-cls" ng-click="makeCallByClickPhoneNum()" ></i></label>';
                var template = angular.element(mobileIcon);
                var mobileElement = $compile(mobileIcon)(scope);
                //angular.element("#"+scope.id).after(mobileElement);
                el.after(mobileElement);

                scope.makeCallByClickPhoneNum = function(){
                    console.log("获取输入框值："+scope.applyPhone);
                    scope.applyPhone = "test";
                };

                ngModelController.$validators.requireNgModel = function(modelVal){
                    console.log(modelVal);
                };
            }
        };
    }]);
