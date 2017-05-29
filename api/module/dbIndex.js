var db = require('./db.js')();

var getIndexData = function(_collection, data, res){

	db.open(function(error, db){

		if(error){
			console.log('connect db:', error);
		}
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error);	
			} else {
				collection.find().toArray(function(err, docs){

					
					
					res.send(docs);
					db.close();
				});
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



var allexists = function(name, res){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection('list', function(error, collection){
			if(error){
				console.log(error)	
			} else {
				//var reg = new RegExp("^.*"+name+"\.*$","i");
				collection.find({allKeyWord:name}).toArray(function(err, docs){
				    res.send(docs);
					// console.log(docs);
				});
			}
			db.close();
		})
	})	
}
exports.allexists=allexists;

var navSearch = function(name, res){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection('list', function(error, collection){
			if(error){
				console.log(error)	
			} else {
				//var reg = new RegExp("^.*"+name+"\.*$","i");
				collection.find({navKeyWord:name}).toArray(function(err, docs){
				    res.send(docs);
					
				});
			}
			db.close();
		})
	})	
}
exports.navSearch=navSearch;




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
				collection.find({id:name}).toArray(function(err, docs){
					
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
					
					res.send(docs);
					db.close();
				});

			}
			
		})
	})	
}
exports.allList=allList;