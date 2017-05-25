var mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 27017);

var db = new mongodb.Db('allGoods', server);



var getIndexData = function(_collection,res){

	db.open(function(error, db){

		if(error){
			console.log('connect db:', error);
		}
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error);	
			} else {
				collection.find().toArray(function(err, docs){

					console.log(docs);
					
					res.send(docs);
					
				});
				db.close();
			}
			
		})
	})	
}
exports.getIndexData = getIndexData;


var exists = function(name, res){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection('list', function(error, collection){
			if(error){
				console.log(error)	
			} else {
				var reg = new RegExp("^.*"+name+"\.*$","i");
				collection.find({goodsMsg:{$regex:reg}}).toArray(function(err, docs){
				    res.send(docs);
					// console.log(docs);
				});
			}
			db.close();
		})
	})	
}
exports.exists=exists;


var details = function(name, res){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection('list', function(error, collection){
			if(error){
				console.log(error)	
			} else {
				collection.find({_id:name}).toArray(function(err, docs){
					//console.log(name)
					//console.log(docs)
					res.send(docs)
				});
			}
			db.close();
		})
	})	
}
exports.details=details;


var allList = function(_collection, data, res){

	db.open(function(error, db){

		if(error){
			console.log('connect db:', error);
		}
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error);	
			} else {
		 		collection.find().toArray(function(err,docs){
					
					console.log(docs);
					console.log(111)
					res.send(docs);
					db.close();
				});

			}
			
		})
	})	
}
exports.allList=allList;