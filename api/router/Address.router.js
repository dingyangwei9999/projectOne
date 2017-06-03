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
			if(data){
				res.send(apiResult(true));
			}
		});
		
	});
	//获取地址
	app.post('/getsite',urlencodedParser,function(req,res){
		// res.setHeader('Access-Control-Allow-Origin','*');
		ad.getSite('address',req.body,function(data){
			// console.log(req.body._id);
			if(data.length){
				res.send(apiResult(true,'默认地址',data));
			}else{
				res.send(apiResult(false,'无地址'));
			}
		});
	});
	app.post('/fetchsite',urlencodedParser,function(req,res){
		// res.setHeader('Access-Control-Allow-Origin','*');
		ad.fetchSite('address',req.body,function(data){
			// console.log(req.body._id);
			if(data.length){
				res.send(apiResult(true,'地址',data));
			}
		});
	});
	//修改地址
	app.post('/amend',urlencodedParser,function(req,res){
		// res.setHeader('Access-Control-Allow-Origin','*');
		ad.amendSite('address',req.body,function(data){
			// console.log(req.body._id);
			if(data.length){
				res.send(apiResult(true,'修改成功'));
			}
		});
	});
	//删除地址
	app.post('/removeAddress',urlencodedParser,function(req,res){
		// res.setHeader('Access-Control-Allow-Origin','*');
		ad.removeSite('address',req.body,function(data){
			// console.log(req.body._id);
			if(data.length){
				res.send(apiResult(true,'已成功删除'));
			}
		});
	});
}