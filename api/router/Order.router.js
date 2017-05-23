

exports.handle = function(app){
	app.get('/getorders',function(req,res){
		res.send('yes');
	})
	app.get('/getordersbyid',function(req,res){
		res.send('yes');
	})
	app.get('/getordersbyname',function(req,res){
		res.send('yes');
	})
}