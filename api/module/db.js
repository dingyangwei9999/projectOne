var mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 27017);

var db = new mongodb.Db('bbm', server);
module.exports = function(){
	return db;	
};
