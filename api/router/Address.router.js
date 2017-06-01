/*
	用户地址管理
 */
var ad = require('../module/addressdb.js');
var apiResult = require('../module/apiResult.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

exports.handle = function(app){
	//存入地址
	app.post('/addsite',urlencodedParser,function(req,res){
		// res.setHeader('Access-Control-Allow-Origin','*');
		ad.addSite('address',req.body,function(data){
			res.send(apiResult(true));
		});
		
	});
	//获取地址
	app.post('/getsite',urlencodedParser,function(req,res){
		// res.setHeader('Access-Control-Allow-Origin','*');
		ad.getSite('address',req.body,function(data){
			if(data.length){
				res.send(apiResult(true,'默认地址',data));
			}else{
				res.send(apiResult(false,'无地址'));
			}
		});
	});
	
}