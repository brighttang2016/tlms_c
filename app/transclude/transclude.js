/**
 * Created by pujjr on 2017/7/7.
 */
var app = angular.module('myApp',[
    'OneTranscludeController'
]);

app.directive('cdText',function(){
    return{
        restrict:'A',
        replace:true,
        templateUrl:'text.html',
        transclude:true
    };
});

app.directive('oneTransclude',oneTransclude);
app.directive('multiTransclude',multiTransclude);
app.directive('sidebox',sidebox);

function oneTransclude(){
    return {
        restrict:'AE',
        replace:false,
        transclude:true,
        templateUrl:'transclude.tpl.html',
        scope:{
            onTranscludeClick:'&'
        },
        controller:'oneTranscludeController'
    };
}

function multiTransclude(){
    return {
        restrict:'AE',
        replace:false,
        transclude: {
            'title': 'multiTranscludeTitle',
            'body': 'multiTranscludeBody',
            'footer': '?multiTranscludeFooter'
        },
        templateUrl:'multi-transclude.tpl.html'
    };
}

function sidebox(){
    return {
        restrict:'AE',
        replace:false,
        transclude:true,
        scope:{
            tangTitle:'@tangDivTitle'
        },
       /* template: '<div class="sidebox">\
                        <div class="content">\
                            <h2 class="header">{{ title }}</h2>\
                            <span class="content" ng-transclude>\
                            </span>\
                        </div>\
                    </div>'*/
        templateUrl:'sideBox.tpl.html'
    };
}

