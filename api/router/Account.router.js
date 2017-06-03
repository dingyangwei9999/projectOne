var apiResult = require('../module/apiResult.js');
var userdb = require('../module/userdb.js');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
//如果要使用cookie，需要显式包含这个模块
var cookieParser = require('cookie-parser');
//如果要使用session，需要单独包含这个模块
var session = require('express-session');
exports.handle = function(app){
	//设置 session
	app.use(cookieParser());
	app.use(session({
		secret: '12345',//用来对session数据进行加密的字符串.这个属性值为必须指定的属性
		name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
		cookie: {maxAge: 1000*60*60*60 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
		resave: false,
		saveUninitialized: true,
	}))
	//后台登录路由
	app.post('/login',urlencodedParser,function(req,res){
		// res.setHeader('Access-Control-Allow-Origin','*');
		userdb.managerLogin('admin',req.body, function(data){
			if(data.length){
				req.session.name = req.body.name;
				// console.log(req.session);
				res.send(apiResult(true));
			} else {
				res.send(apiResult(false, '无此用户'));
			}
		})
	})
	app.post('/logout',urlencodedParser,function(req,res){
		res.send('yes');
	})
	app.get('/getsession', function(req, res){
		// console.log(req.session);
		res.setHeader('Access-Control-Allow-Origin','*');
		res.send(apiResult(req.session.name != null, null, req.session.name));
	})
	//客户端注册路由
	app.post('/register',urlencodedParser,function(req,res){
		// res.setHeader('Access-Control-Allow-Origin','*');
		userdb.register('user', req.body, 'username', function(data){
			console.log(data);
			if(!data){
				res.send(apiResult(true,'注册成功'));
			}else if(data == 0){
				res.send(apiResult(false, '注册失败','邮箱已被注册'));
			} else {
				res.send(apiResult(false, '注册失败','用户名重复'));
			}
		})
	})
	//客户端登录路由
	app.post('/loginc',urlencodedParser,function(req,res){
		res.setHeader('Access-Control-Allow-Origin','*');
		userdb.loginc('user', req.body, function(data){
			console.log(data);
			if(data){
				console.log(data.userId);
				res.send(apiResult(true,'登录成功',data.userId));
			} else if(data == 0){
				res.send(apiResult(false, '登录失败','用户名不正确'));
			}else {
				res.send(apiResult(false, '登录失败','密码不正确'));
			}
		})
	})
}