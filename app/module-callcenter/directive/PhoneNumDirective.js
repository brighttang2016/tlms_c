/**
 * Created by tom on 2017/7/25.
 * 好觉中心子级作用域，绑定电话号码显示页面作用域。
 * 点击电话号码右侧图标，激活右侧呼叫中心面板
 * 指令使用方法：
 *
 * 方法一：节点属性方式使用指令
 *  <div call-center-directive-parent>
 *      <div phone-num-directive attr-name="phoneNum"  phone-num="tenantPhone">
 *          {{tenantPhone}}
 *      </div>
 *  </div>
 *方法二：节点名称方式使用指令
 *  <div call-center-directive-parent>
 *      <div phone-num-directive attr-name="phoneNum" phone-num="phoneNum">
 *          {{phoneNum}}
 *      </div>
 *  </div>
 */
angular.module('com.app.callcenter.directive')
    .directive('phoneNumDirective',function(){
      return {
           restrict:"EA",
           scope:{
               attrName:'@',
               phoneNum:'=phoneNum'//双向数据绑定（采用了绑定策略“=”而非“@”），与指令外的DOM属性phone-num值：phoneNum表示的作用域变量相绑定
           },
           replace:false,
           //transclude:true,
           //templateUrl:'html/module_callcenter/tpl/phone.tpl.html',
          template:'<label>666666666666</label>',
           require:'?^callCenterDirectiveParent',
           link:function(scope,el,attr,ctrl){
               scope.makeCallByClickPhoneNum = ctrl.makeCallByClickPhoneNum;
               scope.doActiveCallCenter = ctrl.doActiveCallCenter;
               scope.initPhoneIcon = ctrl.initPhoneIcon;
               scope.initPhoneIcon();
           },
          controller:'UserController'
       };
    });

