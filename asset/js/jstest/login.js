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
            data:'{"name":"Ã∆¡¡123"}',
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
            data:'{"name":"Ã∆¡¡123"}',
            success:function(data){
                alert(data);
            }
        });
    });*/
    $("#login").bind("click",function(){
         alert("ttttttt");
         $.ajax({
             url:'http://localhost:8080/tlms-web/login/userLogin',
             type:'POST',
             dataType:'json',
             contentType:'text/plain;charset=UTF-8',
             data:'{"name":"Ã∆¡¡123"}',
             success:function(data, textStatus){
                alert(data);
             },
             error:function(XMLHttpRequest, textStatus, errorThrown){
                alert(XMLHttpRequest+"|"+textStatus+"|"+errorThrown);
                 alert(XMLHttpRequest);
             }
         });
     });
});
