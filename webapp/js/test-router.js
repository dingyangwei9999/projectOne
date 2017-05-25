app.get('/detail',function(req,res){
		//console.log(req.body)
		dbIndex.getIndexData('index', req.body, res);
		//res.send('yes');
	});

