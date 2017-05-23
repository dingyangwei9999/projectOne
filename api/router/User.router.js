

exports.handle = function(app){
	app.get('/delete',function(req,res){
		res.send('yes');
	})
	app.get('/add',function(req,res){
		res.send('yes');
	})
	app.get('/revisepassword',function(req,res){
		res.send('yes');
	})
}