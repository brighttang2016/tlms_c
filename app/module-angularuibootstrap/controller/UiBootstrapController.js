/**
 * Created by pujjr on 2017/10/12.
 */
angular.module('com.app.uibootstraop.controller',[
    'ngAnimate', 'ngTouch', 'ui.bootstrap'
])
    .controller('UiBootstrapController',function($scope,$window){
        //折叠控件测试
        $scope.isCollapsed = true;
        $scope.coled = function () {
                console.log("collapsed");
        };
        $scope.coling = function () {
                console.log("collapsing");
        };
        $scope.exped = function () {
                console.log("expanded");
        };
        $scope.exping = function () {
               console.log("expanding");
        };
        //手风情控件测试
        $scope.oneAtATime = true;
        /* $scope.groups = [
            {
                title: 'Dynamic Group Header - 1',
                content: 'Dynamic Group Body - 1'
            },
            {
                title: 'Dynamic Group Header - 2',
                content: 'Dynamic Group Body - 2'
            }
        ];
        $scope.items = ['Item 1', 'Item 2', 'Item 3'];
        $scope.addItem = function() {
            var newItemNo = $scope.items.length + 1;
            $scope.items.push('Item ' + newItemNo);
        };
        $scope.status = {
            isCustomHeaderOpen: false,
            isFirstOpen: true,
            isFirstDisabled: false
        };*/

        //tab页
        $scope.tabs = [
            { title: '标签页a', content: '标签页a的内容' },
            { title: '标签页b', content: '标签页b的内容', disabled: true }
        ];

        $scope.alertMe = function () {
            setTimeout(function () {
                $window.alert('clicked!');
            });
        };
    //日期选择
        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function() {
            $scope.dt = null;
        };

        $scope.options = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

    });
