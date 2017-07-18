/**
 * Created by pujjr on 2017/7/11.
 */
angular.module('com.tang.directive.LoginDirective',[])
    .directive('loginForm',function(){
        return {
            restrict:'A',
            replace:true,
            scope:{
                onLogin:'&',
                onRegister:'&',
                myParentName:'@'
            },
            templateUrl:'loginTemplate.tpl.html',
            link:function(scope,el,attrs){
                //scope:指令内隔离作用域
                scope.$watch('myVar',function(newValue,oldValue,s){
                    console.log("************watch begin****************");
                    scope.showLoginForm = newValue;
                    console.log(scope);
                    console.log(s);
                    console.log(scope == s);
                    console.log("newValue:"+newValue+"|oldValue:"+oldValue);
                    console.log("************watch end****************");
                });

                console.log("scope.showLoginForm:"+scope.showLoginForm);
                scope.submitLogin = function(){
                    console.log("loginDirective---------scope.submitLogin");
                    console.log("获取表单值："+scope.userName+"|"+scope.password);
                    console.log("父作用域传入指令隔离作用域中的参数值scope.myParentName："+scope.myParentName);
                    //模拟登录后，后台返回结果，修改界面值：
                    scope.nameRet3 = "模拟后台返回";//子作用域中值赋值后，不可能扩展到父作用域中
                    var user = {'name':'指令隔离作用域值---》controller---》页面展示'};
                    scope.onLogin({user:user,userId:'123456'});//指令调用控制器函数，所有实参封装到json对象中，controller函数解析json对象，根据参数名解析对应参数值，给对应形参赋值。
                };
                scope.submitRegister = function(){
                    console.log("loginDirective---------scope.submitRegister");
                    console.log("获取表单值："+scope.userName+"|"+scope.password);
                    console.log("父作用域传入指令隔离作用域中的参数值scope.myParentName："+scope.myParentName);
                    //模拟登录后，后台返回结果，修改界面值：
                    scope.nameRet3 = "模拟后台返回";
                    var user = {'name':'指令值---》controller---》页面展示'};
                    scope.onRegister({'userName':'brighttang',password:'123456'});//指令调用控制器函数，所有实参封装到json对象中，controller函数解析json对象，根据参数名解析对应参数值，给对应形参赋值。
                    //scope.onLogin({user:user,userId:'123456'});
                };


            }
        };
    });
