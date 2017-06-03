var usedb = require('../module/userdb.js');
var apiResult = require('../module/apiResult.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

exports.handle = function(app){
	//找回密码
	app.post('/findpsw',urlencodedParser,function(req,res){
		// res.setHeader('Access-Control-Allow-Origin','*');
		usedb.findpsw('user',req.body,'email',function(data){
			if(data){
				res.send(apiResult(false, '找回成功,已发密码至邮箱','您的密码是'+data.password));
			}else if(data == 0){
				res.send(apiResult(false, '找回失败','用户名错误'));
			}else{
				res.send(apiResult(false, '找回失败','邮箱未找到'));
			}
			
		})
	})
	//修改密码
	app.post('/resetpsw',urlencodedParser,function(req,res){
		// res.setHeader('Access-Control-Allow-Origin','*');
		usedb.resetpsw('user',req.body,'username',function(data){
			res.send(apiResult(true, '修改成功','修改成功'));
		})
	})
	// app.post('/resetemail',urlencodedParser,function(req,res){
	// 	// res.setHeader('Access-Control-Allow-Origin','*');
	// 	usedb.resetemail('user',req.body,'username',function(data){
			
	// 		res.send(apiResult(true, '修改成功','修改成功'));
	// 	})
	// });
	//获取邮箱地址
	app.post('/email_show',urlencodedParser,function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*');
	usedb.getIndexemail('user', req.body,'username', function(data){
		if(data){
				res.send(apiResult(false,'获取成功' ,data.email));
			}else if(data == 0){
				res.send(apiResult(false, '获取失败','用户名错误'));
			}else{
				res.send(apiResult(false, '找回失败','邮箱未找到'));
			}
		
	});
});
//修改邮箱
	app.post('/resetemail',urlencodedParser,function(req,res){
		res.setHeader('Access-Control-Allow-Origin','*');
		usedb.resetemail('user',req.body,'username',function(data){
			res.send(apiResult(true, '修改成功','修改成功'));
		})
	})

	//用户存入购物车商品
	app.post('/cartgoods',urlencodedParser,function(req,res){
		// res.setHeader('Access-Control-Allow-Origin','*');
		usedb.usercart('usercart',req.body,function(data){
			res.send(apiResult(true));
		});
		
	});
	//获取用户购物车商品
	app.post('/getgoods',urlencodedParser,function(req,res){
		usedb.getgoods('usercart',req.body,function(data){
			if(data.length){
				res.send(apiResult(true, '获取成功',JSON.stringify(data)));
			}else{
				res.send(apiResult(false, '未购物'));
			}			
		});
	});
	//删除用户购物车商品
	app.post('/removegoods',urlencodedParser,function(req,res){
		usedb.removegoods('usercart',req.body,function(data){
			if(data.length){
				res.send(apiResult(true, '删除成功',JSON.stringify(data)));
			}else{
				res.send(apiResult(false, '删完了'));
			}			
		});
	});
	//用户修改购物车商品数量
	app.post('/updategoods',urlencodedParser,function(req,res){
		usedb.updategoods('usercart',req.body,function(data){
			res.send(data);			
		});
	});
	//收藏商品
	app.post('/collect',urlencodedParser,function(req,res){
		usedb.collectgoods('collect',req.body,function(data){
			res.send(apiResult(true, '收藏成功，请至个人中心查看'));	
		});
	});
	//获取收藏商品
	app.post('/fetch',urlencodedParser,function(req,res){
		usedb.fetchgoods('collect',req.body,function(data){
			if(data.length){
				res.send(apiResult(true, '有收藏',data));
			}else{
				res.send(apiResult(false, '您还没有收藏任何商品'));
			}			
		});
	});
	//删除收藏商品
	app.post('/del',urlencodedParser,function(req,res){
		usedb.delgoods('collect',req.body,function(data){
			res.send(apiResult(null, '已取消收藏'));		
		});
	});
}