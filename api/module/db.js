var mongodb = require('mongodb');

var server = new mongodb.Server('10.3.133.11', 27017);

var db = new mongodb.Db('bbm', server);

module.exports = function(){
	return db;	
};
