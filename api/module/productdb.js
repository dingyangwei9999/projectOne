/*
	产品数据处理
 */
var mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 27017);

var db = new mongodb.Db('bbm', server);

var addproduct = function(_collection, data, key,callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error)	
			} else {
				collection.find({id:Number(data[key])}).toArray(function(err, docs){
					if(!docs.length){
						collection.insert(data);
					}
					callback(docs);
					db.close();
				});
			}
			
		})
	})	
}
var output = function(_collection, res){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error);	
			} else {
				collection.find().toArray(function(err, docs){
					if(err){
						console.log(err);
					}
					res.end(JSON.stringify(docs));
					db.close();
				});
			}
		})
	})	
}
var searchproduct = function(_collection,data,res){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error)	
			} else {
				console.log(data);
				
				collection.find({'$or':[{id:Number(data.keyword)},{kind1:data.keyword},{kind2:data.keyword},{keyword:data.keyword}]}).toArray(function(err,dos){	
					if(err){
						console.log(err);
					}
					res.end(JSON.stringify(dos));
					db.close();
				})
			}
			
		})
	})	
}
exports.output = output;
exports.addproduct = addproduct;
exports.searchproduct = searchproduct;
