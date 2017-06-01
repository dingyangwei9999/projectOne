/*
	用户地址管理
 */
var db = require('./db.js')();
//添加用户地址
var addSite = function(_collection,data,callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error)	
			} 

			collection.insert(data);
			db.close();
			
			
		})
	})	
}
//获取用户地址
var getSite = function(_collection,data,callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error)	
			} 
			collection.find({userId:data.userId}).toArray(function(err,docs){
				if(err){
					console.log('getSite:',err);
				}
				callback(docs);
				db.close();
			})		
			
		})
	})	
}
//修改用户地址

exports.addSite = addSite;
exports.getSite = getSite;
