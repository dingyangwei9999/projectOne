/*
	商品订单路由
 */
var db = require('../module/orderdb.js');
var apiResult = require('../module/apiResult.js');
//post请求  引入中间件 
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
exports.handle = function(app){
	//用户订单写入
	app.post('/userorder',urlencodedParser,function(req,res){
		db.userOrder('order',req.body,function(data){
			res.send(true);
		})
	})
	//获取用户订单
	app.post('/getorder',urlencodedParser,function(req,res){
		db.getOrder('order',req.body,function(data){
			if(data.length){
				res.send(apiResult(true,'获取成功',data));
			}else{
				res.send(apiResult(false,'获取失败','用户没有订单'));
			}
			
		})
	})
	app.get('/getordersbyid',function(req,res){
		res.send('yes');
	})
	app.get('/getordersbyname',function(req,res){
		res.send('yes');
	})
}