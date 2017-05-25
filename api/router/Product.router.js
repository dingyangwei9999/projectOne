
var dbIndex = require('../module/dbIndex.js');

exports.handle = function(app){
	

	app.get('/getproduct',function(req,res){
		//console.log(req.body)
		dbIndex.getIndexData('index', req.body, res);
		//res.send('yes');
	});

	app.get('/keywordSearch',function(req,res){
		//console.log(req.query.keywordbl)
		dbIndex.exists(req.query.keywordbl,res)

		
	});


	app.get('/getproductbyid',function(req,res){
		res.send('yes');
	})
	app.get('/getproductbyname',function(req,res){
		res.send('yes');
	})
}
