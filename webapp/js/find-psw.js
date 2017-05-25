$(function(){
	var $username = $('input[name=username]');
	var $email = $('input[name=email]');
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
	//点击登录
	$('.btn_away').click(function(){
		var name = $.trim($username.val());
		var email = $.trim($email.val());
		if(name.length>=6 && !$('.error').length){
			$.post(erp.baseUrl + 'findpsw',{
				username:name,
				email:email
			},function(res){
				if(res.status){
					alert(res.message);
					alert(res.data);
					location.href = 'login.html';
				}else{
					alert(res.data);
				}
			})
		}else if(name.length<6){
			alert('用户名不少于6位');
		}else{
			alert('邮箱格式不正确');
		}
		
	})
})