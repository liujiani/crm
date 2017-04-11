function cambiar_login() {
  document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login";  
	document.querySelector('.cont_form_login').style.display = "block";
	document.querySelector('.cont_form_sign_up').style.opacity = "0";               

setTimeout(function(){  document.querySelector('.cont_form_login').style.opacity = "1"; },400);  
  
setTimeout(function(){    
document.querySelector('.cont_form_sign_up').style.display = "none";
},200);  
  }

function cambiar_sign_up(at) {
  document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_sign_up";
  document.querySelector('.cont_form_sign_up').style.display = "block";
document.querySelector('.cont_form_login').style.opacity = "0";
  
setTimeout(function(){  document.querySelector('.cont_form_sign_up').style.opacity = "1";
},100);  

setTimeout(function(){   document.querySelector('.cont_form_login').style.display = "none";
},400);  


}    



function ocultar_login_sign_up() {

	document.querySelector('.cont_forms').className = "cont_forms";  
	document.querySelector('.cont_form_sign_up').style.opacity = "0";               
	document.querySelector('.cont_form_login').style.opacity = "0"; 

	setTimeout(function(){
		document.querySelector('.cont_form_sign_up').style.display = "none";
		document.querySelector('.cont_form_login').style.display = "none";
	},500);  
  
 }

function emlCheck() {
    var Em = document.getElementById("eml").value; //获取E-mail输入框值
    var PromEm = document.getElementById("em"); //获取提示栏
    var regEm = /^[a-zA-Z0-9_-]{1,}@[a-zA-Z0-9_-]{1,}(\.[a-zA-Z]{2,}){1,2}$/;
    /**解释
     * ^[a-zA-Z0-9_-]{1,}   开头可以是字母、数字或“_-”，且1次以上
     * @[a-zA-Z0-9_-]{1,}   接着是“@”，“@”后是可以是字母、数字或“_-”，且字母、数字或“_-”要1次以上
     * (\.[a-zA-Z]{2,})     接着后面应该是“.”，“.”后应为字母，且字母需2次以上
     * {1,2}                像上面这种“.”后面是字母的，最少1次 ，最多只能2次
     **/
    var isEm = regEm.test(Em);
    if (isEm == false) {
        PromEm.innerHTML = "您输入的E-mail地址不合法";
        PromEm.style.color = 'red';
        return false;
    }
    if (isEm) {
        PromEm.innerHTML = "输入正确";
        PromEm.style.color = 'green';
        return true;
    }
}
function pwdCheck() {
    var PW = document.getElementById("pwd").value; //获取密码输入框的值
    var PrompPW = document.getElementById("pw"); //获取提示栏
    if (PW == "") { //判断密码不为空
        PrompPW.innerHTML = "密码不能为空";
        PrompPW.style.color = 'red';
        return false;
    }
    if (PW.length < 6) { //判断密码长度最少6位
        PrompPW.innerHTML = "密码最少为6位字符"
        PrompPW.style.color = 'red';
        return false;
    }
    if (PW.length > 20) { //判断密码长度最多20位
        PrompPW.innerHTML = "密码最多只可以20位字符";
        PrompPW.style.color = 'red';
        return false;
    }
    var zm = /[A-z]/g //全局查找字母
    if (zm.test(PW) == false) {
        PrompPW.innerHTML = "密码必须包含至少一位字母";
        PrompPW.style.color = 'red';
        return false;
    }
    var NaN = /\d/g //全局查找数字
    if (NaN.test(PW) == false) {
        PrompPW.innerHTML = "密码必须包含至少一位数字";
        PrompPW.style.color = 'red';
        return false;
    }
    var fh = /[^A-z]\D/g //全局查找非数字与除了字母之外的字符
    if (fh.test(PW) == false) {
        PrompPW.innerHTML = "密码必须包含至少一位字符";
        PrompPW.style.color = 'red';
        return false;
    }
    PrompPW.innerHTML = "输入正确"
    PrompPW.style.color = 'green';
    return true;
}

 function unameCheck() {
    var UseN = document.getElementById("uname").value; //获取输入框的值
    var PromU = document.getElementById("unam"); //获取提示栏
    var regUseN =  /^[\u4e00-\u9fa5_a-zA-Z0-9_]{4,10}$/;
    /**解释：
     * ^[A-z]  以字母开头
     * [A-z0-9] 后面最少4位字母或数字，最多17个，且以此为结尾
     **/
    var isUseN = regUseN.test(UseN);
    if (UseN == "") { //判断用户名不为空
        PromU.innerHTML = "用户名不能为空";
        PromU.style.color = 'red';
        return false;
    }
    if (isUseN) {
        PromU.innerHTML = "输入正确";
        PromU.style.color = 'green';
        return true;
    }

    if (!isUseN) {
        PromU.innerHTML = "请输入正确的用户名";
        PromU.style.color = 'red';
        return false;
    }
}
$(function(){
	var base = new Base64();

// 注册
$('#btn_sign_up').click(function(){
    $.ajax({
        type:'post',
        url:'http://192.168.43.197:8005/register/register',
        data:{
            uname:$('#uname').val(),
            pwd:base.encode($('#pwd').val()),
            eml:$('#eml').val()
        },
        success:function(e){
            if(e.flag == 1){
                sessionStorage.setItem('yhm',$('#uname').val());
                $('#loginuname').val(sessionStorage.getItem('yhm'))
                cambiar_login();
            }else if(e.flag == 2){
                alert('用户名已存在')
            }else{      
                alert('未知错误')
            }
        },
        error:function(){
            alert('error')
        }
    })
})
// 登录

$('#btn_login').click(function(){ 
    $.ajax({
        type:'post',
        url:'http://192.168.43.197:8005/loginUp/login',
        data:{
            uname:$('#loginuname').val(),
            pwd:base.encode($('#loginpwd').val())
        },
        success:function(e){
            if(e.flag == 1){
                sessionStorage.user_id = e.id;
                sessionStorage.uname = $('#loginuname').val();
                window.location.href = 'html/homepage.html';
            }else if(e.flag == 2){
                alert('用户名不存在')
            }else if(e.flag == 3){
                alert('密码错误')
            }
        },error:function(){
            aler('error')
        }
    })
})

})

    
