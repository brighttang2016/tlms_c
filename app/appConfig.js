/**
 * Created by pujjr on 2017/7/18.
 */
var BASE_URL='http://127.0.0.1:8080/pcms-web';
var TLMS_URL='http://localhost:8090/tlms-web';
//前端发起模拟推送地址
var PUJJR_PUSH_URL='http://localhost:8070/pjmessage-web';
var SERVER_URL = {
    /**认证地址**/
    AUTH_SERVER_URL:BASE_URL,
    /**接口调用地址**/
    API_SERVER_URL:BASE_URL+'/service',
    /**文件下载地址**/
    FILE_DOWNLOAD_URL:BASE_URL+'/image/file/img/',
    /**文件上传地址**/
    FILE_UPLOAD_URL:BASE_URL+'/service/file/uploadFile/',
    /**流程编辑器地址**/
    WORKFLOW_EDITOR_URL:BASE_URL+'/modeler.html?modelId=',
    /**流程图片查看地址**/
    WORKFLOW_IMG_URL:BASE_URL+'/public/workflow/config/img/',
    /**OSS地址**/
    OSS_URL:'http://pcms-test.oss-cn-hzfinance.aliyuncs.com/'
    /**OSS_URL:'http://pujjr-cs.oss-cn-hangzhou.aliyuncs.com/'**/
    ,WS_URI:'ws://172.18.10.78:5061/'
   /* ,PJ_WS_URI:'ws://localhost:8090/tlms-web/tlmsWebSocketServer.ctrl'*/
    ,PJ_WS_URI:'ws://localhost:8070/pjmessage-web/pujjrPushMs/pujjrWebSocketServer'
};
angular.module('myApp')
    .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
        //$urlRouterProvider.otherwise('/home');
        console.log($stateProvider);
    }]);
