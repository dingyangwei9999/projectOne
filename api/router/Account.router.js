var db = require('../module/db.js');
var apiResult = require('../module/apiResult.js');
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
		cookie: {maxAge: 60*60*3600 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
		resave: false,
		saveUninitialized: true,
	}))

	app.post('/login',urlencodedParser,function(req,res){
		res.setHeader('Access-Control-Allow-Origin','*');
		db.exists('min', req.body, 'name', function(data){
			console.log(data);
			if(data){
				req.session.name = req.body.name;
				console.log(req.session.name);
				res.send(apiResult(true))
			} else {
				res.send(apiResult(false, '用户名错误'));
			}
		})
	})
	app.post('/logout',urlencodedParser,function(req,res){
		res.send('yes');
	})
	app.get('/getsession', function(req, res){
		console.log(req.session);
		// res.setHeader('Access-Control-Allow-Origin','*');
		res.send(apiResult(req.session.name != null, null, req.session.name));
	})
}