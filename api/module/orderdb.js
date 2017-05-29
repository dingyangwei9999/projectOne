/*
	订单数据处理
 */
var db = require('./db.js')();
//存入订单
var userOrder = function(_collection,data,callback){
	db.open(function(err,db){
		if(err){
			console.log('connect db:', err);
		}
		db.collection(_collection,function(err,collection){
			if(err){
				console.log('collection :',err);
			}else{
				collection.insert(data);
				callback(true);
				db.close();
			}
		})
	})
}
//获取订单
var getOrder = function(_collection,data,callback){
	db.open(function(err,db){
		if(err){
			console.log('connect db:', err);
		}
		db.collection(_collection,function(err,collection){
			if(err){
				console.log('collection :',err);
			}else{
				collection.find({userId:userId}).toArray(function(err,docs){
					if(err){
						console.log('getOrder:',err)
					}
					callback(docs);
					db.close();
				})
				
			}
		})
	})
}
exports.userOrder = userOrder;
exports.getOrder = getOrder;