/**
 * Created by pujjr on 2017/5/9.
 */
/**
 * 设置cookie值
 * @param name cookie键名
 * @param value cookie键对应值
 * @param expire cookie超时时间
 */
function setCookie(name,value,expire){
    console.log("setCookie,"+"name:"+name+",value:"+value+",expire:"+expire);
    var timeNow = new Date();
    var expireTime = new Date();
    expireTime.setTime(expire);
    //document.cookie=name+"="+value+";expires="+expireTime.toGMTString();
    //console.log("expire:"+expire+",expireTime:"+expireTime);
    document.cookie=name+"="+value+";expires="+expireTime;
    document.cookie="expireTime="+expire+";expires="+expireTime;
    //console.log("存储的cookie:"+document.cookie);
}

/**
 * 获取cookie值
 * @param name
 * @returns {*}
 */
function getCookie(name){
    alert("utils.js->getCookie");
    //console.log(name);
    var start = 0;
    var end = 0;
    var value = null;
    if(document.cookie.length > 0){
        /*start =  document.cookie.indexOf(name+"=");
         console.log("0123456".substring());
         if(start != -1){
         console.log("start:"+start);
         end = document.cookie.indexOf(";",start + name.length + 1);
         console.log("end:"+end);
         if(end != -1)
         value = document.cookie.substring(start + name.length+1,end);
         else
         value = document.cookie.substring((start + name.length + 1,document.cookie.length));
         console.log(name+":"+value);
         }*/
        var pairs = document.cookie.split(";");
        console.log("pairs:"+pairs);
        for(var i = 0;i < pairs.length;i++){
            var pair = pairs[i];
            //console.log(i+":"+pair);
            var keyValue = pair.split("=");
            //console.log("keyValue[0]:"+keyValue[0]);
            if(name == keyValue[0].trim()){
                value = keyValue[1];
                //console.log(name+":"+value);
            }
        }
    }
    return value;
}

function printCookie(){
    console.log("document.cookie:"+document.cookie);
}

/**
 * Created by pujjr on 2017/6/27.
 */
var app = angular.module("myApp",[]);
app.directive("myDirective",function(){
    return {
        restrict:'A',
        replace:true,
        template:'<a href="http://www.baidu.com">跳转百度</a>'
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
            myUrl3:'@',
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
            myUrl4:'=someUrl',//双向数据绑定（采用了绑定策略“=”而非“@”），与指令外的DOM属性some-url值：theirUrl表示的作用域变量相绑定
            myLinkText4:'@'
        },
        template:'指令内：输入需要跳转到地址(指令内)(指令内输入，同时同步外部信息【p55页内容】)<input type="text" ng-model="myUrl4"/><a href="{{myUrl4}}">{{myLinkText4}}</a>'

    };
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

app.controller("SomeController",function(){

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
/**
 * Created by pujjr on 2017/6/26.
 */
var app = angular.module('myApp', []);
app.controller('MyContryller0', function($scope) {
    //alert($scope);
    //console.log($scope);
    $scope.firstName = "John";
    $scope.lastName = "Doe";
});
app.controller('MyController1',function MyController($scope) {
    $scope.clock = {
        now: new Date()
    };
    var updateClock = function() {
        $scope.clock.now = new Date()
    };
    setInterval(function() {
        $scope.$apply(updateClock);
    }, 1000);
    updateClock();
});

app.controller('MyController2',function($scope,$timeout){
   var updateClock = function(){
       $scope.clock2 = {now:new Date()};
       $timeout(function(){
           updateClock();
       },1000);
   };
    updateClock();
    $scope.amount = 0;
    $scope.add = function(offset){
      $scope.amount = $scope.amount + offset;
    };
    $scope.substract = function(offset){
        $scope.amount = $scope.amount - offset;
    };
});

app.controller("ParentController",function($scope){
    $scope.person = {name:"brighttang"};
});
app.controller("ChildController",function($scope){
    $scope.sayHello = function(){
        $scope.person.name = "王小二";
    };
});
app.controller("MyController3",function($scope,$parse){
    var watch =  $scope.$watch("expression",function(newVal,oldVal,scope){
        if(newVal == oldVal){
            return;
        }else{
            var parseFun = $parse(newVal);
            //console.log(parseFun);
            $scope.parseValue = parseFun(scope);
        }
    });
    // 注销监听
    //watch();
});


app.controller('mainCtrl', function ($scope) {
        $scope.person = {
            name:"allen",
            age:21
        };
        $scope.$watch("person", function(n, o){
            //取消第一次加载时的监听响应
            if(n == o){
                return;
            }
            $scope.status = n;
        },true)
});

app.controller("MyController4",function($scope,$interpolate){
    $scope.$watch("emailBody",function(newVal, oldVal, scope){
        if(newVal){
            var interpolatedFunc = $interpolate(newVal);
            console.log(interpolatedFunc);
            //$scope.interpolatedValue = interpolatedFunc({myName: $scope.myName});
            $scope.interpolatedValue = interpolatedFunc(scope);
        }
    });
});


/**
 * Created by pujjr on 2017/3/7.
 */
$(document).ready(function(){
    /* $("#login").bind("click",function(){
     alert("ttttttt");
     $.ajax({
     url:'http://localhost:8080/tlmis/login/userLogin2',
     type:'POST',
     jsonp: "callback",
     dataType:'json',
     contentType:'text/plain;charset=UTF-8',
     data:'{"name":"唐亮123"}',
     success:function(data){
     alert(data);
     }
     });
     });*/

    /*$("#login").bind("click",function(){
     alert("ttttttt");
     $.ajax({
     url:'http://localhost:8080/tlmis/login/userLogin2',
     type:'POST',
     dataType:'json',
     contentType:'text/plain;charset=UTF-8',
     data:'{"name":"唐亮123"}',
     success:function(data){
     alert(data);
     }
     });
     });*/
    $("#login").bind("click",function(){
        //setCookie("city","重庆市");
        $.ajax({
            url:'http://localhost:8090/tlms-web/login/userLogin',
            type:'POST',
            dataType:'json',
            contentType:'text/plain;charset=UTF-8',
            data:'{"name":"唐亮123"}',
            success:function(result,status,xhr){
                alert(result.id);
                console.log("result:"+result);
                console.log("status:"+status);
                console.log(xhr);
                console.log(xhr.getResponseHeader("Content-Type"));
                console.log(xhr.getResponseHeader("Server"));
                console.log(xhr.getResponseHeader("token"));
                console.log(xhr.getResponseHeader("Authorization"));
                console.log(xhr.getResponseHeader("Access-Control-Allow-Origin"));
                console.log(xhr.getResponseHeader("Access-Control-Allow-Methods"));
                console.log(xhr.getResponseHeader("WWW-Authenticate"));

                var expireTime = xhr.getResponseHeader("expireTime");
                setCookie("token",xhr.getResponseHeader("token"),expireTime);
                console.log("获取cookie token值："+getCookie("token"));

            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
               // alert(XMLHttpRequest+"|"+textStatus+"|"+errorThrown);
               // alert(XMLHttpRequest);
            }
        });
    });

    $("#getCookie").bind("click",function(){
        setCookie("userName","brighttang");
        setCookie("city","重庆市");
        setCookie("education","高中");
        //console.log("获取cookie education值："+getCookie("education"));
       // console.log("获取cookie city值："+getCookie("city"));
    });

    $("#printCookie").bind("click",function(){
        printCookie();
    });

    $("#doTrans").bind("click",function(){
        var token = getCookie("token");
        var expireTime = getCookie("expireTime");
        $.ajax({
            url:'http://localhost:8090/tlms-web/login/doTrans',
            type:'POST',
            dataType:'json',
            contentType:'text/plain;charset=UTF-8',
            data:'{"traCode":"10001"}',
            beforeSend:function(request){
                alert("beforeSend");
                request.setRequestHeader("token",token);
                request.setRequestHeader("expireTime",expireTime);
            },
            success:function(result,status,xhr){
                alert("success");
                var jsonResult = eval('('+result+')');
                console.log(result);
                console.log(eval('('+result+')'));
                console.log(result.msg);
                console.log(eval('('+result+')').msg);
                console.log(JSON.stringify(eval('('+result+')')));

                alert(jsonResult.msg);
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                console.log(XMLHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
                // alert(XMLHttpRequest+"|"+textStatus+"|"+errorThrown);
                // alert(XMLHttpRequest);
            }
        });
    });
});

/**
 * Created by pujjr on 2017/7/3.
 */
var app = angular.module('MyApp',["ngRoute","MyController", "MyService"])
    .config(['$locationProvider',function($locationProvider){
        $locationProvider.html5Mode(false);
        $locationProvider.hashPrefix('');
    }]);

app.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/',{
        templateUrl:'template.html',
        controller:'IndexController'
    });
}]);


/**
 * Created by pujjr on 2017/7/3.
 */
angular.module('MyController',[])
    .controller('IndexController',["$scope","githubService",function($scope,githubService){
        console.log("IndexController");
        $scope.name = "dreamapple";
        $scope.show = true;
        githubService.getPullRequests().then(function(result){
            $scope.data = result;
        },function(error){
            $scope.data = "error!";
        },function(progress){
            $scope.progress = progress;
            $scope.show = false;
        });
    }]);
/**
 * Created by pujjr on 2017/7/3.
 */
angular.module('MyService',[])
    .factory('githubService',['$q','$http',function($q,$http){
        console.log("githubService");
        var getPullRequests = function(){
            var deffered = $q.defer();
            var promise = deffered.promise;
            var progess;
            $http({
                method:'POST',
                url:'http://localhost:8090/tlms-web/login/userLogin',
                data:{}
            }).then(function(response){
                alert('请求返回成功');
            },function(response){
                alert('error');
            });
            return promise;
        };
        return {
            getPullRequests: getPullRequests
        };
    }]);
/**
 * Created by pujjr on 2017/6/30.
 */
/*angular测试一直报错 20170630*/
// Add Restangular as a dependency to your app
/*var app = angular.module('myApp', ['restangular']);

// Inject Restangular into your controller
app.controller('MyController1', function($scope, Restangular) {
    $scope.doTrans = function(){
        alert("tttt");
    };
});*/


var app = angular.module('myApp', ['restangular','lodash']);

// Inject Restangular into your controller
app.controller('MyController1', function($scope,Restangular) {
  /*  $scope.doTrans = function(){
    };*/
});

/**
 * Created by pujjr on 2017/6/28.
 */
var app = angular.module('myApp',['ngRoute'])
    .config(['$locationProvider',function($locationProvider){
        $locationProvider.html5Mode(false);
        $locationProvider.hashPrefix('');
    }]);
app.run(['$rootScope','$location',function($rootScope,$location){
    $rootScope.$on('$routeChangeStart',function(evt,next,current){
        //console.log(evt);
        //console.log(next);
        //console.log(current);
    });
}]);

app.config(['$routeProvider',function($routeProvider){
    $routeProvider
        .when('/', {
            template: '首页'
         })
        .when('/#computers',{
            template:'电脑页面'
        })
        .when('/printers',{
            template:'打印机页面'
        })
        .when('/blabla',{
            template:'其他页面'
        })
        .when('/userManage',{
            templateUrl:'route.tpl.html'
})
        .when('/userManage/:name',{
            controller:'UserManageController',
            redirectTo:function(route,path,search){
                //console.log(route.name);
            }
        })
        .when('/toMain',{
            redirectTo:function(route,path,search){
                //console.log(route);
                //console.log(path);
                //console.log(search);
                return "/";
            }
        })
        .otherwise({
            redirect:'/'
        });
}]);

app.controller('UserManageController',function($scope,$routeParams,$location){
    //console.log($location.path());
    //console.log($location.url());
});

app.factory('greeter',function(){
    //console.log(app.factory);
    return {
        greet:function(msg){
          alert(msg);
      }
    };
});
app.controller("MyController",function($scope,greeter){
    //console.log("MyController");
    console.log(greeter);
    $scope.sayHello = function(){
        greeter.greet("Hello!");
    };
});


/**
 * Created by pujjr on 2017/6/29.
 */
var app = angular.module('myApp',[]/*,function($provide){
    //p120 测试
    $provide.provider('myService3',function(){
        this.$get = function(){
            return {
                userName2:"brighttang33"
            }
        };
    });
}*/);

app.factory('myService',function(){
    var myService = {
        name:"brighttang",
        sex:"男",
        age:10,
        getName:function(){
            return this.name;
        }
    };
    myService.getSex = function(){
        return this.sex;
    };
    myService.setAge = function(age){
        this.age = age;
    };
    myService.getAge = function(){
        return this.age;
    };

    return myService;
});

app.controller('ServiceController',function($scope,myService){
    console.log(myService.getSex);
    console.log(myService.getSex());
    console.log(myService.getName());
    //设置年龄
    $scope.setAge = function(){
        myService.setAge($scope.age);
        alert("设置后年龄myService.getAge()："+myService.getAge());
    };
    //获取年龄
   $scope.getAge = function(){
       myService.setAge(100);
       $scope.age = myService.getAge();
   };

});

app.constant('appId1','111111');
app.value('appId2','222222');
app.config(function(appId1){
    alert("通过"+appId1) ;
});
//通过value函数注册的服务对象，无法注入到配置（config）中，下面语句运行将报错
/*app.config(function(appId2){
    alert(appId2);
});*/

app.controller("ServiceController2",function($scope,myService2,myService3){
    $scope.userName = myService2.userName;
    $scope.userName2 = myService3.userName2;
});
app.provider('myService2',{
    $get:function(){
        return{
            'userName':'brightang'
        }
    }
});

app.provider('myService3',function(){
    this.$get = function(){
        return {
            userName2:"brighttang33"
        }
    };
});




/**
 * Created by pujjr on 2017/6/29.
 */
var app = angular.module('myApp',[]);
//
app.controller('MyController1',function($scope,$http){
    $scope.login = function(){
        alert("login");
        $http({
            method:'POST',
            url:'http://localhost:8090/tlms-web/login/userLogin',
            params:{'page':'1','province':'重庆市','city':'永川区'},
            data:{'name':'brighttang'}
        }).then(function(response){
            alert('请求返回成功');
            //console.log(response);
            //console.log(response.data);
            //console.log(response.status);
            //console.log(response.headers);
            //console.log(response.headers('token'));

            $scope.id = response.data.id;
        },function(response){
            alert('error');
            //console.log(response.data);
            //console.log(response.status);
            //console.log(response.headers);

        });
    };

    $scope.getToken = function(){
        $scope.token = getCookie('token');
    };

    $scope.doTrans = function(){
        //添加特定http头
        $http.defaults.headers.common['token'] = getCookie('token');
        $http.defaults.headers.common['expireTime'] = getCookie('expireTime');
        $http({
            method:'POST',
            url:'http://localhost:8090/tlms-web/login/doTrans',
            data:{}
        }).then(function(response){
            alert('请求返回成功');
        },function(response){
            alert('error');
        });
    };
});

//拦截器定义(创建拦截器服务)
app.factory('myInterceptor',function($q){
    var interceptor = {
        'request':function(config){
            //console.log(config);
            //alert("request");
            //每次http请求，token数据放入http头中
            config.headers.token = getCookie('token');
            config.headers.expireTime = getCookie('expireTime');
             // 成功的请求方法
            return config; // 或者 $q.when(config);
        },
        'response':function(response){
            //console.log($q);
            //console.log(response);
            var token = response.headers('token');
            var expireTime =  response.headers('expireTime');
            setCookie('token',token,expireTime);
            // 响应成功
            return response; // 或者 $q.when(config);
        },
        'requestError':function(rejection){
            console.log(rejection);
            // 请求发生了错误，如果能从错误中恢复，可以返回一个新的请求或promise
            return response; // 或新的promise
            // 或者，可以通过返回一个rejection来阻止下一步
            // return $q.reject(rejection);
        },
        'responseError':function(rejection){
            console.log(rejection);
            // 请求发生了错误，如果能从错误中恢复，可以返回一个新的响应或promise
            return rejection; // 或新的promise
            // 或者，可以通过返回一个rejection来阻止下一步
            // return $q.reject(rejection);
        }
    };
    return interceptor;
});
//注册拦截器
app.config(function($httpProvider) {
    $httpProvider.interceptors.push('myInterceptor');
    console.log($httpProvider.defaults.headers.common);
  /*  //扩充http头
    $httpProvider.defaults.headers.post['token'] = getCookie('token');
    $httpProvider.defaults.headers.post['expireTime'] = getCookie('expireTime');*/
});


/*app.controller('MyController2',function($scope,Restangular){

});*/

app.controller("MyController2", ["$scope", "$q", function ($scope, $q) {
    alert("MyController2");
    $scope.flag = true;
    $scope.handle = function () {
        var deferred = $q.defer();
        var promise = deferred.promise;
        console.log("1111");
        promise.then(function (result) {
            result = result + "you have passed the first then()";
            console.log(result);
            $scope.status = result;
            return result;
        }, function (error) {
            error = error + "failed but you have passed the first then()";
            console.log(error);
            $scope.status = error;
            return error;
        }).then(function(result){
            result = "第二个then  success";
            console.log(result);
        },function(error){
            error = "第二个then  error";
            console.log(error);
        });
        console.log("2222");
        if ($scope.flag) {
            deferred.resolve("you are lucky!");
        } else {
            deferred.reject("sorry, it lost!");
        }
        console.log("3333");
    }
}]);

/**
 * Created by pujjr on 2017/7/3.
 */