$(function(){
	var $email =$('input[name=email]');
	//email验证
	$email.on('change',function(){
		var email = this.value;
		if(email.match(/^[\w\-\.]+@[a-z\d\-]+(\.[a-z]+){1,2}$/)){
			$(this).siblings('span').removeClass().addClass('right');
		}else if(email.trim() === ''){
			alert('请输入您的邮箱');
			$(this).siblings('span').removeClass().addClass('error');
		}else{
			alert('您输入的邮箱格式不正确');
			$(this).siblings('span').removeClass().addClass('error');
		}
		
	});
	var id = 0;
	//点击注册按钮
	$('.sure_submit').on('click',function(){
		var $username = $.trim($('input[name=username]').val());
		var $psw = $.trim($('input[name=psw]').val());
		var $email = $.trim($('input[name=email]').val());
		var len_user = $username.length;
		var len_psw = $psw.length;
		if(len_user >=6 && len_psw >=6 && $('.chance :checkbox').prop('checked')&& !$('.error').length){
			$.post(erp.baseUrl + 'register',{
				userId:$username + id,
				email: $email,
				password: $psw,
				username: $username
			}, function(response){
				console.log(response);
				if(response.status){
					alert('注册成功,请登录！');
					location.href = 'login.html';
				} else {
					alert(response.data);
				}
			})
		}else if(len_user >=6 && len_psw <6){
			alert('密码不能少于6位');
		}else if(len_user <6 && len_psw >=6){
			alert('用户名不能少于6位');
		}else if(!$('.chance :checkbox').prop('checked')){
			alert('请认真读取用户协议');
		}else if($('.error').length){
			alert('请输入正确的邮箱');
		}else{
			alert('输入不能为空');
		}
	})
	//点击显示密码
	$('.change_eye i').click(function(){
		if($(this).prop('class') == 'iconfont icon-eye'){
			$(this).prop('class','iconfont icon-yanjing');
			$(this).siblings('input').prop('type','text');
		}else{
			$(this).prop('class','iconfont icon-eye');
			$(this).siblings('input').prop('type','password');
		}
		
	});
	//点击跳转首页
	$('icon-shouye-shouye').click(function(){
		location.href = '../index.html';
	})
})