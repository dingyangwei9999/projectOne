
// exports.handle = function(app){
// 	app.get('/getproduct',function(req,res){
// 		res.send('yes');
// 	})
// 	app.get('/getproductbyid',function(req,res){
// 		res.send('yes');
// 	})
// 	app.get('/getproductbyname',function(req,res){
// 		res.send('yes');
// 	})
// }
app.get('/getproduct',function(req,res){
		//console.log(req.body)
		dbIndex.getIndexData('index', req.body, res);
		//res.send('yes');
	});
