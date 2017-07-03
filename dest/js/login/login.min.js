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
