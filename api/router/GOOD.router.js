var db = require('../module/loaddb.js');
var dbsd= require('../module/db.moudle.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

exports.Register = function(app){
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
//获取商品点击
app.post('/personal_index',urlencodedParser,function(req,res){
		console.log(req.body);
		db.getIndexData('Personal', req.body, res);
		// res.send('yes');
	});

//增加地址
app.post('/addressss_add',urlencodedParser,function(req,res){
	console.log(req.body);
	dbsd.exists('Address',req.body,'address',function(result){
		if(result){
			res.send('{state: false, message: "地址已经存在"}');
		} else {
			dbsd.save('Address', req.body); 	
			res.send('{state: true}');
		}
	});
});

app.post('/addressss_show',urlencodedParser,function(req,res){
	console.log(req.body);
	db.getIndexData('Address', req.body, res);
});
}