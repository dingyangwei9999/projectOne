var db = require('../module/loaddb.js');
exports.Register = function(app){
app.get('/personal',function(req,res){
		console.log(req.body)
		db.getIndexData('Personal', req.body, res);
		// res.send('yes');
	});
}