var usedb = require('../module/userdb.js');
var apiResult = require('../module/apiResult.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

exports.handle = function(app){
	app.get('/delete',function(req,res){
		res.send('yes');
	})
	app.get('/add',function(req,res){
		res.send('yes');
	})
	app.get('/revisepassword',function(req,res){
		res.send('yes');
	})
	//找回密码
	app.post('/findpsw',urlencodedParser,function(req,res){
		res.setHeader('Access-Control-Allow-Origin','*');
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
		res.setHeader('Access-Control-Allow-Origin','*');
		usedb.resetpsw('user',req.body,'email',function(data){
			res.send(apiResult(true, '修改成功','修改成功'));
		})
	})
	app.post('/resetemail',urlencodedParser,function(req,res){
		res.setHeader('Access-Control-Allow-Origin','*');
		usedb.resetemail('user',req.body,'username',function(data){
			
			res.send(apiResult(true, '修改成功','修改成功'));
		})
	})
}