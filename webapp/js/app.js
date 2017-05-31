var http = require('http');
// var querystring = require('querystring');
var fs = require('fs');
var mongo = require('./db');

var server = http.createServer(function(req,res){
	res.setHeader("Access-Control-Allow-Origin","*");
	console.log(req.url)
	if(req.url=="/insert"){
		var db = new mongo()
		db.insert(function(data){
			console.log(data)
			res.end(JSON.stringify(data));
		})
	}
}).listen(8888,"localhost",function(){
	console.log("listened");
});

