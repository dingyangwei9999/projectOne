
var dbIndex = require('../module/dbIndex.js');

exports.handle = function(app){
	

	app.get('/getproduct',function(req,res){
		//console.log(req.body)
		dbIndex.getIndexData('list', req.body, res);
		//console.log(res)
		//res.send('yes');
	});

	app.get('/keywordSearch',function(req,res){
		//console.log(req.query.keywordbl)
		dbIndex.exists(req.query.keywordbl,res)

		
	});

	app.get('/allkeywordSearch',function(req,res){
		//console.log(req.query.keywordbl)
		dbIndex.allexists(req.query.keywordbl,res)

		
	});


	app.get('/details',function(req,res){
		//console.log(typeof req.query.productid)
		var productId = parseInt(req.query.productid)
		dbIndex.details(productId,res)
	})


	app.get('/allList',function(req,res){

		//console.log(req.query)
		dbIndex.allList('list', req.query, res);
	})

	app.get('/navKeywordSearch',function(req,res){
		//console.log(req.query.navKeyword)
		dbIndex.navSearch(req.query.navKeyword,res)

		
	});


	app.get('/getproductbyid',function(req,res){
		res.send('yes');
	})
	app.get('/getproductbyname',function(req,res){
		res.send('yes');
	})
}
