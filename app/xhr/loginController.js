/**
 * Created by pujjr on 2017/7/11.
 */
angular.module('com.tang.controller.LoginController',[])
    .controller('LoginController',function($scope){
        // 如果为true，显示为登录表单
// 如果为false，显示为注册表单
//        $scope.showLoginForm = true;
        $scope.nameRet4 = "控制器LoginController中改变变量值";
        console.log("$scope.parentname:"+$scope.parentname);
        $scope.sendLogin = function(user,userId) {
            $scope.test = "测试测试测试测试测试";
            console.log("LoginController---->sendLogin");
            console.log("user:"+user+"|userId:"+userId);
            $scope.nameRet2 = user.name;
        };
        $scope.sendRegister = function(userName,password) {
            $scope.test = "测试测试测试测试测试";
            console.log("LoginController---->sendRegister");
            console.log("userName:"+userName+"|password:"+password);
            $scope.nameRet2 = userName;
        };
    });
