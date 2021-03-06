/*
	产品路由控制
 */
var db = require('../module/productdb.js');
var apiResult = require('../module/apiResult.js');
var dbIndex = require('../module/dbIndex.js');

var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

exports.handle = function(app){
	
	app.get('/fetchproduct',function(req,res){
		// res.setHeader('Access-Control-Allow-Origin','*');
		db.output('allgoods', res);
		
	})
	app.post('/searchproduct',urlencodedParser,function(req,res){
		// res.setHeader('Access-Control-Allow-Origin','*');
		db.searchproduct('allgoods', req.body,res);

	})
	app.post('/addproduct',urlencodedParser,function(req,res){
		// res.setHeader('Access-Control-Allow-Origin','*');
		db.addproduct('allgoods', req.body, 'id', function(data){
			if(!data.length){
				res.send(apiResult(true,'插入成功'));
			}else{
				res.send(apiResult(false,'插入失败'));
			}
		});
	});
	app.post('/chggoods',urlencodedParser,function(req,res){
		// res.setHeader('Access-Control-Allow-Origin','*');
		db.chggoods('allgoods', req.body,function(data){
			if(data.length){
				res.send(apiResult(true,'修改成功'));
			}else{
				res.send(apiResult(false,'修改失败'));
			}
		});

	})
	app.post('/delgoods',urlencodedParser,function(req,res){
		// res.setHeader('Access-Control-Allow-Origin','*');
		db.delgoods('allgoods', req.body, function(data){
			if(data.length){
				res.send(apiResult(true,'删除成功',data));
			}else{
				res.send(apiResult(false,'删除失败'));
			}
		});
	});
	app.post('/fetchgoods',urlencodedParser,function(req,res){
		// res.setHeader('Access-Control-Allow-Origin','*');
		db.fetchgoods('allgoods', req.body, function(data){
			if(data.length){
				res.send(apiResult(true,'获取成功',data));
			}
		});
	});
	app.get('/getproduct',function(req,res){
		dbIndex.getIndexData('list',req.body, res);
		//res.send('yes');
	});
	//关键字搜索
	app.get('/keywordSearch',function(req,res){
		//console.log(req.query.keywordbl)
		dbIndex.exists(req.query.keywordbl,res)

	});
	app.get('/allkeywordSearch',function(req,res){
		//console.log(req.query.keywordbl)
		dbIndex.allexists(req.query.keywordbl,res)

		
	});
	//详情页请求
	app.post('/details',urlencodedParser,function(req,res){
		res.setHeader('Access-Control-Allow-Origin','*');
		console.log(req.body);
		db.details(req.body,res);

	})
	app.get('/navKeywordSearch',function(req,res){
		console.log(req.query.navKeyword)
		dbIndex.navSearch(req.query.navKeyword,res)	
	});
	//列表页请求
	app.get('/allList',function(req,res){

		//console.log(req.query)
		dbIndex.allList('list', req.query, res);
	})

}

var multer = require ('multer');


var storage = multer.diskStorage({  
  destination: function (req, file, cb) {  
    cb(null, '../upload')  
  },  
  filename: function (req, file, cb) {  
      var fileFormat = (file.originalname).split(".");
      cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);    
  }  
}) 

var upload = multer({ storage: storage });

exports.photo = function(app){
	app.post('/upload', upload.fields([{name:'picture',acount:2},{name:'banner',acount:4},{name:'photo',acount:18}]), function(req, res) {
		res.setHeader('Access-Control-Allow-Origin','*');
		// console.log(req.files);  
		// console.log(req.body); 	 	
	 	res.send(JSON.stringify(req.files)); 
	});
}