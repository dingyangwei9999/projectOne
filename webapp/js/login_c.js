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
				console.log(res.data);
				if(res.status){
					alert('登陆成功');

					var obj = {"username": name,"userId":res.data,"password":psw};
					obj = JSON.stringify(obj);
					window.localStorage.setItem("user", obj);
					if($('.chance :checkbox').prop('checked')){
						var obj = {"username": name,"userId":res.data,"password":psw};
						obj = JSON.stringify(obj);
						window.localStorage.setItem("user", obj);
					}
					window.location.href = '../html/personal.html';
				}else{
					alert(res.data);
				}
			})
		}else{
			alert('用户名和密码不能少于6位');
		}
		
	});
	$('.icon-shouye-shouye').click(function(){
		location.href = '../index.html';
	})
	$('.fanhui').click(function(){
		location.href = 'javascript:history.go(-1)';
	})
})