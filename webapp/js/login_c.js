$(function(){
	var $username = $('input[name=username]');
	var $psw = $('input[name=psw]');
	//点击登录
	$('.login_away').click(function(){
		var name = $.trim($username.val());
		var psw = $.trim($psw.val());
		if(name.length>=6 && psw.length>=6){
			$.post(erp.baseUrl + 'loginc',{
				username:name,
				password:psw
			},function(res){
				if(res.status){
					alert('登陆成功');
					if($('.chance :checkbox').prop('checked')){
						localStorage.setItem("user", {username:name});
					}
					location.href = 'personal.html';
				}else{
					alert(res.data);
				}
			})
		}else{
			alert('用户名和密码不能少于6位');
		}
		
	})
})