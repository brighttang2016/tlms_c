/**
 * Created by pujjr on 2017/6/27.
 */
var app = angular.module("app",['ui.tree']);

app.controller('TreeController',function($scope){
    $scope.root = {
        "title": "标题0",
        "isSelected":"false",
        "selectedIcon":"fa-square-o",
        "id":'title0',
        "isLeaf":"false",
        items:[
            {
                "title": "标题1",
                "isSelected":"false",
                "selectedIcon":"fa-square-o",
                "id":'title1',
                "pid":"title0",
                "isLeaf":"false",
                items: [{
                    "title": "标题1.1",
                    "isSelected":"false",
                    "selectedIcon":"fa-square-o",
                    "id":'title1-1',
                    "pid":"title1",
                    "isLeaf":"true"
                }, {
                    "title": "标题1.2",
                    "isSelected":"false",
                    "selectedIcon":"fa-square-o",
                    "id":'title1-2',
                    "pid":"title1",
                    "isLeaf":"true"
                }]
            },
            {
                "title": "标题2",
                "isSelected":"false",
                "selectedIcon":"fa-square-o",
                "id":'title2',
                "pid":"title0",
                "isLeaf":"false",
                items: [{
                    "title": "标题2.1",
                    "isSelected":"false",
                    "selectedIcon":"fa-square-o",
                    "id":'title2-1',
                    "pid":"title2",
                    "isLeaf":"true"
                }, {
                    "title": "标题2.2",
                    "isSelected":"false",
                    "selectedIcon":"fa-square-o",
                    "id":'title2-2',
                    "pid":"title2",
                    "isLeaf":"true"
                }]
             },
            {
                "title": "标题3",
                "isSelected":"false",
                "selectedIcon":"fa-square-o",
                "id":'title3',
                "pid":"title0",
                "isLeaf":"false",
                items: [{
                    "title": "标题3.1",
                    "isSelected":"false",
                    "selectedIcon":"fa-square-o",
                    "id":'title3-1',
                    "pid":"title3",
                    "isLeaf":"false",
                    items:[{
                        "title": "标题3.1.1",
                        "isSelected":"false",
                        "selectedIcon":"fa-square-o",
                        "id":'title3-1-1',
                        "pid":"title3-1",
                        "isLeaf":"false",
                        items:[{
                            "title": "标题3.1.1.1",
                            "isSelected":"false",
                            "selectedIcon":"fa-square-o",
                            "id":'title3-1-1-1',
                            "pid":"title3-1-1",
                            "isLeaf":"true"
                        }]
                    },{
                        "title": "标题3.1.2",
                        "isSelected":"false",
                        "selectedIcon":"fa-square-o",
                        "id":'title3-1-2',
                        "pid":"title3-1",
                        "isLeaf":"false",
                        items:[{
                            "title": "标题3.1.2.1",
                            "isSelected":"false",
                            "selectedIcon":"fa-square-o",
                            "id":'title3-1-2-1',
                            "pid":"title3-1-2",
                            "isLeaf":"true"
                        },{
                            "title": "标题3.1.2.2",
                            "isSelected":"false",
                            "selectedIcon":"fa-square-o",
                            "id":'title3-1-2-2',
                            "pid":"title3-1-2",
                            "isLeaf":"true"
                        }]
                    }]
                }, {
                    "title": "标题3.2",
                    "isSelected":"false",
                    "selectedIcon":"fa-square-o",
                    "id":'title3-2',
                    "pid":"title3",
                    "isLeaf":"true"
                }]
            }
            ]
    };

});


app.directive('simpleTree', function($compile,$rootScope,$timeout) {
    return {
        restrict: 'EA',
        scope: {
            root: '='
        },
        template: '<div></div>',
        transclude: true,
        link:function(scope,el,attr,ctrl){

            /**
             * 清空树
             */
            scope.cleanTree = function(){
                el.empty();
            };

            scope.findNodeById = function(currNode,targetNodeId){
                console.log(currNode.id+"|"+targetNodeId);
                if(currNode.id == targetNodeId){
                    console.log("根据节点id查找节点信息，找到目标节点,id："+targetNodeId);
                    return currNode;
                }else{
                    var childNodes = currNode.items;
                    if(childNodes != undefined){
                        for(var i = 0;i < childNodes.length;i++){
                            var currChildNode = childNodes[i];
                            var tempNode= scope.findNodeById(currChildNode,targetNodeId);
                            if(tempNode != undefined ){
                                return tempNode;
                                // break;
                            }
                        }
                    }
                }
            };

            /**
             * 点击父节点，变更子节点选中状态
             * @param currNode
             * @param isSelected
             */
            scope.changeChildNodeSelectedIcon = function(currNode,isSelected){
                if(isSelected == 'false'){
                    currNode.isSelected = 'false';
                    currNode.selectedIcon = 'fa-square-o';
                }else{
                    currNode.isSelected = 'true';
                    currNode.selectedIcon = 'fa-check-square';
                }
                var childNodes = currNode.items;
                if(childNodes != undefined){
                    for(var i = 0;i < childNodes.length;i++){
                        scope.changeChildNodeSelectedIcon(childNodes[i],currNode.isSelected);
                    }
                }
            };

            /**
             * 选中子节点，变更父节点选中状态
             * @param currNode
             * @param isSelected
             */
            scope.changeParentNodeSelectedIcon = function(pid){
                console.log("pid:"+pid);
                if(pid != undefined && pid != ''){
                    var parentNode = scope.findNodeById(scope.root,pid);
                    console.log(parentNode);
/*
                    console.log(scope.currNode);
                    parentNode = scope.currNode;
                    console.log(parentNode);*/
                    var childNodes = parentNode.items;

                    //是否有子节点被选中
                    var isChildSelected = false;
                    if(childNodes != undefined){
                        for(var i = 0;i < childNodes.length;i++){
                            var tempChildNode = childNodes[i];
                            console.log("子节点状态："+tempChildNode.id+"|"+tempChildNode.isSelected);
                            if(tempChildNode.isSelected == 'true'){
                                isChildSelected  = 'true';
                                break;
                            };
                        }
                    }
                    if(isChildSelected == 'true'){
                        parentNode.isSelected = 'true';
                        parentNode.selectedIcon = 'fa-check-square';
                    }else{
                        parentNode.isSelected = 'false';
                        parentNode.selectedIcon = 'fa-square-o';
                    }
                    //如果存在父节点，继续递归父节点
                    if(parentNode.pid != undefined){
                        scope.changeParentNodeSelectedIcon(parentNode.pid);
                    }
                }
            };

            /**
             * 获取已选择节点
             * @param currNode
             */
            scope.getSelectedNode = function(currNode){
                if(currNode.isLeaf == 'true' || currNode.items == undefined){
                    if(currNode.isSelected == 'true'){
                        scope.selectedNodeArray.push(currNode);
                    }
                }else{
                    var items = currNode.items;
                    for(var i = 0;i < items.length;i++){
                        scope.getSelectedNode(items[i]);
                    }
                }
            };

            /**
             * 节点扫描
             * @param currNode
             * @param item
             */
            scope.scanNode = function(currNode,item){
                var childNodes = currNode.items;
                if(currNode.id == item.id){
                    console.log('节点递归,找到节点：'+currNode.id);
                    if(currNode.isSelected == 'true'){
                        currNode.isSelected = 'false';
                        currNode.selectedIcon = 'fa-square-o';
                    }else{
                        currNode.isSelected = 'true';
                        currNode.selectedIcon = 'fa-check-square';
                    }
                    /**
                     * 变更子节点选中状态
                     */
                    if(childNodes != undefined){
                        for(var i = 0;i < childNodes.length;i++){
                            var currChildNode = childNodes[i];
                            scope.changeChildNodeSelectedIcon(currChildNode,currNode.isSelected);
                        }
                    }
                    /**
                     * 变更父节点选中状态
                     */
                    scope.changeParentNodeSelectedIcon(currNode.pid);
                    /**
                     * 初始化树形，重新渲染
                     */
                    scope.initTree();
                    return;
                }else{
                    var childNodes = currNode.items;
                    if(childNodes != undefined){
                        for(var i = 0;i < childNodes.length;i++){
                            var currNode = childNodes[i];
                            scope.scanNode(currNode,item);
                        }
                    }
                }
            };

            /**
             * 节点点击
             * @param item
             */
            scope.clickItem = function(item){
                scope.selectedNodeArray = new Array();
                //从根节点开始扫描，查找点击的节点
                scope.scanNode(scope.root,item);
                //获取已选择节点
                scope.getSelectedNode(scope.root);
                console.log("树形已选择叶子节点如下：");
                console.log(scope.selectedNodeArray);
            };

            scope.compileDom = function(node,scope){
                return $compile(node)(scope);
            };

            scope.appendNode = function(parentNode,item){
                var nodeLi = angular.element('<li></li>');
                nodeLi = scope.compileDom(nodeLi,scope);

               /* console.log(item);
                var itemStringiFy = JSON.stringify(item);
                console.log("111:"+itemStringiFy);
                itemStringiFy = itemStringiFy.replace(/"/g,"'");
                console.log("222:"+itemStringiFy);
                itemStringiFy = itemStringiFy.replace(/'/g,"");
                console.log("333:"+itemStringiFy);
                var itemJson = JSON.parse(itemStringiFy);
                console.log("444:");
                console.log(itemJson);*/

                // console.log(item.marginLeft);
                // var nodeTitleDiv = angular.element('<div style="margin-left:'+item.marginLeft+'px'+'"><i class="fa '+item.selectedIcon+'">&nbsp;</i><i class="fa {{item.selectedIcon}}">&nbsp;</i>'+item.title+'</div>');
                // var test = 'fa-check-square';
                var itemStr = JSON.stringify(item).replace(/\"/g,"'");
                var nodeTitleDiv = angular.element('<div style="margin-left:'+item.marginLeft+'px'+'"><a ng-click="clickItem('+itemStr+')"><i class="fa '+item.selectedIcon+'">&nbsp;</i>'+item.title+'</a></div>');
                nodeTitleDiv = scope.compileDom(nodeTitleDiv,scope);
                nodeLi.append(nodeTitleDiv);
                //子节点
                var childItems = item.items;
                if(childItems != undefined){
                    var childNodeUl = angular.element('<ul></ul>');
                    scope.compileDom(childNodeUl,scope);
                    for(var j = 0;j < childItems.length;j++){
                        /*var childItem = childItems[j];
                        var childNodeLi = angular.element('<li></li>');
                        var childNoddTitleDiv = angular.element('<div><i class="fa">&nbsp;</i><i class="fa {{item.selectedIcon}}">&nbsp;</i>'+childItem.title+'</div>');
                        childNodeLi.append(childNoddTitleDiv);
                        childNodeUl.append(childNodeLi);*/
                        childItems[j].marginLeft = item.marginLeft + 20;
                        scope.appendNode(childNodeUl,childItems[j]);
                    }
                    nodeLi.append(childNodeUl);
                }
                parentNode.append(nodeLi);
            };

            /**
             * 初始化树形
             */
            scope.initTree = function(){
                scope.cleanTree();
                // console.log(scope.root);
                // console.log(el);
                var nodeUl = angular.element('<ul></ul>');
                nodeUl = scope.compileDom(nodeUl,scope);
                var items = scope.root.items;
                if(items != undefined){
                    for(var i = 0;i < items.length;i++){
                        /*var item = items[i];
                        var nodeLi = angular.element('<li></li>');
                        var nodeTitleDiv = angular.element('<div><i class="fa">&nbsp;</i><i class="fa {{item.selectedIcon}}">&nbsp;</i>'+item.title+'</div>');
                        nodeLi.append(nodeTitleDiv);
                        //子节点
                        var childItems = item.items;
                        if(childItems != undefined){
                            var childNodeUl = angular.element('<ul></ul>');
                            for(var j = 0;j < childItems.length;j++){
                                var childItem = childItems[j];
                                var childNodeLi = angular.element('<li></li>');
                                var childNoddTitleDiv = angular.element('<div><i class="fa">&nbsp;</i><i class="fa {{item.selectedIcon}}">&nbsp;</i>'+childItem.title+'</div>');
                                childNodeLi.append(childNoddTitleDiv);
                                childNodeUl.append(childNodeLi);
                            }
                            nodeLi.append(childNodeUl);
                        }
                        nodeUl.append(nodeLi);*/
                        items[i].marginLeft = 20;
                        scope.appendNode(nodeUl,items[i]);
                    }
                }
                el.append(nodeUl);
            };
            scope.initTree();

        }
    };
});
