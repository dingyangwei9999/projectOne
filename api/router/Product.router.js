/*
	产品路由控制
 */
var db = require('../module/productdb.js');
var apiResult = require('../module/apiResult.js');
var dbIndex = require('../module/dbIndex.js');

var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
//如果要使用session，需要单独包含这个模块
var session = require('express-session');
exports.handle = function(app){
	app.get('/getsession', function(req, res){
		console.log(req.session);
		res.setHeader('Access-Control-Allow-Origin','*');
		res.send(apiResult(req.session.name != null, null, req.session.name));
	})
	// app.get('/getProduct',function(req,res){
	// 	res.setHeader('Access-Control-Allow-Origin','*');
	// 	db.output('goods', res);
		
	// })
	app.post('/searchproduct',urlencodedParser,function(req,res){
		res.setHeader('Access-Control-Allow-Origin','*');
		db.searchproduct('goods', req.body,res);

	})
	app.post('/addproduct',urlencodedParser,function(req,res){
		res.setHeader('Access-Control-Allow-Origin','*');
		db.addproduct('goods', req.body, 'id', function(data){
			if(!data.length){
				res.send(apiResult(true,'插入成功'));
			}else{
				res.send(apiResult(false,'插入失败'));
			}
		});
	});
	app.get('/getproduct',function(req,res){
		dbIndex.getIndexData('index', res);
		//res.send('yes');
	});
	//关键字搜索
	app.get('/keywordSearch',function(req,res){
		//console.log(req.query.keywordbl)
		dbIndex.exists(req.query.keywordbl,res)

		
	});
	//详情页请求

	app.get('/details',function(req,res){
		console.log(typeof req.query.productid)
		var productId = parseInt(req.query.productid)
		dbIndex.details(productId,res)
	})

	//列表页请求
	app.get('/allList',function(req,res){

		//console.log(req.query)
		dbIndex.allList('list', req.query, res);
	})

}

var multer = require ('multer');

// var upload = multer({ dest:  "./upload" }); 

var storage = multer.diskStorage({  
  destination: function (req, file, cb) {  
    cb(null, '../upload')  
  },  
  filename: function (req, file, cb) {  
      var fileFormat = (file.originalname).split(".");
      cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);    
  }  
}) 

var upload = multer({ storage: storage })

exports.photo = function(app){
	app.post('/upload', upload.array('photos', 12), function(req, res) {
		res.setHeader('Access-Control-Allow-Origin','*');
		console.log(req.files);  
		console.log(req.body); 	 	
	 	res.send(JSON.stringify(req.files)); 
	});
}