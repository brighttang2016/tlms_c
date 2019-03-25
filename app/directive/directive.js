/**
 * Created by pujjr on 2017/6/27.
 */
var app = angular.module("app",[]);

app.controller('formValidController',function($scope){
    $scope.user = {};
    // $scope.user.userName = 1234;
});

app.directive('formValid', function($parse) {
    return {
        restrict: 'EA',
        require:'ngModel',
        scope: {
            user: '='
        },
        /*restrict: 'EA',
        scope: {
            root: '='
        },*/
        // template: '<div>{{title}}<div ng-transclude></div></div>',
        // replace:false,
        transclude: true,
        link:function(scope,el,attr,ctrl){
            var el = $(el);
            console.log("111111111111111111");
            // test  ng-invalid-required
            console.log(el.hasClass("test"));

            console.log("99999999999999999999");
            console.log(ctrl);
            console.log(attr);
            ctrl.$validate();
            scope.el = el;
            scope.errorMsg = "";

            scope.handleMsg = function(isValid){

                var errorTextEle = null;
                if(!(el.attr("errorText"))){
                    el.after('<div class="validation-errorText">数据非法</div>');
                    el.attr('errorText', true);
                    errorTextEle = el.next();
                }



                if(isValid){
                    el.next().hide();
                }else{
                    el.next().show();
                }
            };


            scope.doValid = function(value){
                console.log("1111111111111111111");
                console.log(value);
                var isValid = false;
                if(value < 0 || value >= 5){
                    console.log("非法");
                    //设置为非法：false  合法：formValid：true
                    ctrl.$setValidity('formValid',false);
                    if(scope.errorMsg == ""){
                        scope.errorMsg = "数据非法";
                    }
                    isValid = false;
                }else if(value==undefined || value=='undefined'){
                    console.log("必输项");
                    ctrl.$setValidity('formValid',false);
                    if(scope.errorMsg == ""){
                        scope.errorMsg = "必输项";
                    }
                    isValid = false;
                }else{
                    console.log("合法");
                    ctrl.$setValidity('formValid',true);
                    isValid = true;
                }
                //ctrl.$error["formValid"] true:表示非法    false:表示合法
                // console.log("formValid:"+ctrl.$error["formValid"]);
                console.log("formValid:"+ctrl.$error["formValid"]);
                console.log("brighttang:"+ctrl.$error["brighttang"]);

                console.log(el.hasClass("ng-invalid-required"));


                return isValid;
            };


            ctrl.$validators.customValidator = function (value) {
               /* var emailsRegexp = /^([a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*[;；]?)+$/i;
                var validity = ctrl.$isEmpty(value) || emailsRegexp.test(value);
                ctrl.$setValidity("multipleEmail", validity);

                return validity ? value : undefined;*/

               console.log("customValidator");
               console.log(value);
               console.log(el);
               console.log(scope);
                console.log(scope.number);
                var isValid = scope.doValid(value);
                scope.handleMsg(isValid);
               return true;
            };

            var isValid = scope.doValid(value);
            scope.handleMsg(isValid);

            ctrl.$validate();

            // ctrl.$formatters.push(scope.customValidator);
            // ctrl.$parsers.push(scope.customValidator);
            // ctrl.$validators.push(customValidator);
        }
    };
});

app.directive('sidebox', function($parse) {
        return {
            restrict: 'EA',
            scope: {
                title: '@'
            },
            template: '<div>{{title}}<div ng-transclude></div></div>',
            // replace:false,
            transclude: true,
            link:function(scope,el,attr,ctrl){
                console.log("sidebox");
                console.log(scope);
                var date = new Date(parseFloat("1543680000000"));
                console.log(date);
                scope.sideboxName= "名称";
                scope.appId = "sidebox-appid5555555555555";
            }
        };
    });

app.directive("myDirectiveParse",function($parse){
    return {
        restrict:'A',
        replace:false,
        template:'<a href="http://www.baidu.com">跳转百度</a>',
        transclude:true,
        link:function(scope,element,attr,value4,ctrl,value6,value7){
            console.log("************myDirectiveParse 开始**************");
            scope.obj = {};
            scope.obj.expression = "a+b+c";
            console.log(scope);
            console.log(element);
            console.log(attr);
            console.log(attr.username);
            console.log(value4);
            console.log(ctrl);
            console.log(value6);
            console.log(value7);

            //测试
            scope.testParse = function(){
                console.log("************scope.testParse 开始**************");
                var context = {
                    serviceFee: 5000,
                    boardFee:3000
                };
                var expression = "serviceFee + boardFee";
                var parseFunc = $parse(expression);
                console.log("parse 函数属性：");
                console.log(parseFunc.literal);
                console.log(parseFunc.constant);
                console.log(parseFunc.assign);
                scope.ParsedValue = parseFunc(context);
                console.log("运算结果："+scope.ParsedValue);
                console.log("************scope.testParse 结束**************");
            };
            scope.testParse();




            console.log("************myDirectiveParse 结束**************");
        }
    };
});

app.directive("myDirective",function(){
    return {
        restrict:'A',
        replace:false,
        template:'<a href="http://www.baidu.com">跳转百度</a>',
        transclude:true
    };
});

app.directive("myDirective2",function(){
    return{
        restrict:'A',
        replace:true,
        template: '<a href="{{ myUrl }}">{{ myLinkText }}</a>',
        scope:{
            myUrl:'@',
            myLinkText:'@'
        }
        /*controller:function($scope){
            $scope.myUrl = "myUrl with @ binding";
            $scope.myLinkText = "myLinkText with @ binding";
        }*/
    };
});

app.directive("myDirective3",function(){
    return{
        restrict:'A',
        //replace:true,
        scope:{
            myUrl3:'@myUrl3',
            myLinkText3:'@'
        },
        template:'指令内：输入需要跳转到地址(指令内输入，无法同步外部信息【p54页内容】)<input type="text" ng-model="myOutUrl"><a href="{{myUrl3}}">{{myLinkText3}}</a>'

    };
});

app.directive("myDirective4",function(){
    return{
        restrict:"A",
        replace:false,
        scope:{
            myUrl4:'=someUrl'//双向数据绑定（采用了绑定策略“=”而非“@”），与指令外的DOM属性some-url值：theirUrl表示的作用域变量相绑定
            //myLinkText4:'@'
        },
        template:'指令内：输入需要跳转到地址(指令内)(指令内输入，同时同步外部信息【p55页内容】)<input type="text" ng-model="myUrl4"/><a href="{{myLinkText4}}">{{myLinkText4}}</a>'
    };
});

app.controller('applyController',function($scope){
    // console.log("applyController $scope:");
    // console.log($scope);
    $scope.appId = "5555555555555";

    $scope.initUser = function(userId,userName){
        // alert("initUser userId:"+userId+",userName:"+userName);
    };

    /**
     * 指令myDirective6回调
     * @param mailAddress
     * @param msg
     * @param interface
     */
    $scope.sendEmail = function (mailAddress,msg,interface){
        console.log("applyController  sendEmail");
        console.log(mailAddress);
        console.log(msg);
        $scope.myDirective6 = {};
        $scope.myDirective6.interface = interface;
        $scope.myDirective6.interface.doInit("brighttang",'passwoed');
    };

    $scope.onInit = function(obj){
        // alert(obj);
        // console.log("666666666666666");
        // console.log(obj);
    };

    $scope.callMydirective6Interface = function(){
        $scope.myDirective6.interface.doInit("brighttang2","password2");
    }
});


app.directive("myDirective6",function(){
    return{
        restrict:"A",
        replace:false,
        scope:{
            initSysUser:'&',
            onSend:'&',
            onInit:'&'
            //myLinkText4:'@'
        },
        transclude:true,
        template:'<div>指令内定义方法，在指令外父级使用<button ng-click="send()">点击调用父级方法</button></div>',
        link:function(scope,el,attr,ctrl){
            console.log("myDirective6 link:");
            console.log(scope);
            // console.log(el);
            // console.log(attr);
            // console.log(ctrl);

            scope.doInit = function(userName,password){
                scope.userName = userName;
                scope.password = password;
                console.log("指令通过调用指令外的回调方法，传递指令内方法，在指令外调用指令内方法,scope:");
                console.log(scope);
            };

            //指令内回调指令外部方法
            scope.send = function(){
                alert("1111111");
                scope.initSysUser({
                    userId:'123',
                    userName:'王小二'
                });
                // scope.onSend("798758642@qq.com","邮件待发送内容");
                scope.onSend({
                    mailAddress:'798758642@qq.com',
                    msg:'邮件待发送内容',
                    interface:{
                        doInit:scope.doInit
                    }
                });
            };



            scope.doQuery = function(){

            };


        }
    };
});

app.controller('topController',function($scope,$rootScope){
    console.log("topController,$scope:");
    console.log($scope);
    $rootScope.myName = "888888888888888888888888888888";
    $scope.callbackApply = function(obj){
        console.log("topController");
        console.log(obj);
        $scope.obj = obj;
        console.log("topController,$scope:");
        console.log($scope);
    }
});
app.directive("applyShow",function($rootScope){
    return{
        restrict:"EA",
        replace:false,
        scope:{
            //资金方渠道：潽金：pujjr    工行：icbc    江西金租：jxjz
            applyChannel:'@',
            //页面类型：模式：编辑模式：edit     显示模式：show
            pageType:'@',
            //申请单号
            appId:'@',
            callbackApply:'&'
        },
        // controller:'applyShowController',
        templateUrl:'applyShowTpl.html',
        link:function($scope,el,attr,ctrl){
            console.log("applyShow link:");
            console.log("666666666666666666666666      applyShow");
            console.log($rootScope);
            console.log($rootScope.myName);
            console.log($scope);
            console.log($scope.myName);

            // console.log(el);
            // console.log(attr);
            // console.log(ctrl);
            $scope.callbackApplyChnanel = function(obj){
                console.log("applyShow  callbackApplyChnanel");
                console.log(obj);
                obj.sex = "男";
                obj.mobile = "18723290701";
                $scope.callbackApply({
                    obj:obj
                });
            }
        }
    };
});
app.controller('applyShowController',function($scope){
    console.log("applyShowController,$scope:");
    console.log($scope);
    console.log("资金方渠道："+$scope.applyChannel);
    console.log("页面类型："+$scope.pageType);
    console.log("申请单号："+$scope.appId);
    $scope.applyShowControllerInit = function(){

    }
});

app.directive("applyShowPujjr",function($rootScope){
    return{
        restrict:"EA",
        replace:false,
        scope:{
            //资金方渠道：潽金：pujjr    工行：icbc    江西金租：jxjz
            applyChannel:'@',
            //页面类型：模式：编辑模式：edit     显示模式：show
            pageType:'@',
            //申请单号
            appId:'@',
            callbackApplyChnanel:'&'
        },
        // controller:'applyShowPujjrController',
        templateUrl:'applyShowPujjrTpl.html',
        link:function(scope,el,attr,ctrl){
            console.log("applyShowPujjr link:");
            console.log(scope);
            // console.log(el);
            // console.log(attr);
            // console.log(ctrl);
            // scope.applyShowPujjrControllerInit();
            // ctrl.applyShowPujjrControllerInit();
            var obj = {};

            obj.name = "王小二";
            scope.callbackApplyChnanel({
                obj:obj
            });
        }
    };
});
app.controller('applyShowPujjrController',function($scope){
    console.log("applyShowPujjrController,$scope:");
    console.log($scope);
    console.log("资金方渠道："+$scope.applyChannel);
    console.log("Pujjr页面类型："+$scope.pageType);
    console.log("Pujjr申请单号："+$scope.appId);
    $scope.applyShowPujjrControllerInit = function(){
        console.log("applyShowPujjrController  applyShowPujjrControllerInit");
    }
});

app.directive("applyShowIcbc",function(){
    return{
        restrict:"EA",
        replace:false,
        scope:{
            //资金方渠道：潽金：pujjr    工行：icbc    江西金租：jxjz
            applyChannel:'@',
            //页面类型：模式：编辑模式：edit     显示模式：show
            pageType:'@',
            //申请单号
            appId:'@'
        },
        controller:'applyShowIcbcController',
        templateUrl:'applyShowIcbcTpl.html'
    };
});
app.controller('applyShowIcbcController',function($scope){
    console.log($scope);
    console.log("Icbc资金方渠道："+$scope.applyChannel);
    console.log("Icbc页面类型："+$scope.pageType);
    console.log("Icbc申请单号："+$scope.appId);
});



app.controller("SomeController",function($scope){
    $scope.someBareValue = "SomeController1";
    $scope.someAction = function(){
        $scope.someBareValue = "SomeController2";
    };
});
app.controller("ChildController",function($scope){
    $scope.childAction = function(){
        $scope.someBareValue = "ChildController";
    };
});

app.config(function($provide,$compileProvider){
    $provide.factory('myFactory',function(){
        var service = {};
        return service;
    });
    $compileProvider.directive("myDirective5",function(){
        return {
            restrict:"A",
            template:'<button>Click me</button>'
        }
    });
});


app.controller("ParentCtrl", function($scope){
    $scope.name = "darren";
});

app.controller("ChildCtrl", function($scope,$controller){
    $controller('ParentCtrl',{$scope:$scope});
});