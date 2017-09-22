/**
 * Created by pujjr on 2017/7/31.
 *电话图标指令
 * 用法:
 * <div class="col-sm-8 form-inline">
 <!--<label ng-model="applyInfo.spouse.mobile" require-ng-model="">{{applyInfo.spouse.mobile}}</label>-->
 <input type="text" class="form-control" ng-disabled="editable==false" minlength="11" maxlength="11"  verify-mobile ng-model="applyInfo.spouse.mobile" ng-required="requiredMap.spouse_mobile" require-ng-model="">
 </div>
 */

angular.module('com.app.callcenter.directive')
    .directive('phoneIconDirective',['$compile','$rootScope',function($compile,$rootScope){
        return {
            restrict:'A',
            require:'ngModel',
            link:function(scope,el,attr,ngModelController){
                console.log("************phoneIconDirective*****************");
                console.log(scope);
                var mobileIcon='<label>&nbsp;&nbsp;<i  class="fa fa-phone-square fa-xs phone-cls {{mobileIcon}} " ng-click="makeCallByClickPhoneNum($event,value)" ></i></label>';
                var template = angular.element(mobileIcon);
                var mobileElement = $compile(mobileIcon)(scope);
                $rootScope.account.invokeCallcenter = true;
                if( $rootScope.account.invokeCallcenter == true){
                    scope.mobileIcon = 'callcenter-phone-icon';
                    el.after(mobileElement);
                }
                scope.makeCallByClickPhoneNum = function($event,value){
                    console.log($('#phoneIconLabel'));
                    console.log($('#phoneIconLabel~input:first'));
                    console.log(this);
                    console.log(scope);
                    console.log(angular.element());
                    console.log($event);
                    console.log(value);
                    console.log($($event.target).parent().prev());
                    console.log($($event.target).parent().prev()[0]);
                    console.log($($event.target).parent().prev()[0].localName);
                    console.log($($event.target).parent().prev().localName);
                    console.log($($event.target).parent().prev().val());
                    var nodeType = $($event.target).parent().prev()[0].localName;
                    var phoneNum = "";
                    if(nodeType == 'input'){
                        phoneNum = $($event.target).parent().prev().val();
                    }else{
                        phoneNum = $($event.target).parent().prev().html();
                    }

                    $rootScope.$emit($rootScope.eventPhoneIconClick,{"phoneNum":phoneNum});
                };
                //监控变量值改变
                ngModelController.$validators.requireNgModel = function(modelVal){
                    console.log(modelVal);
                    scope.phoneNum = modelVal;
                };
            }
        };
    }]);
