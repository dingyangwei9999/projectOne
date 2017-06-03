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
			callback('ture');
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
var fetchSite = function(_collection,data,callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error)	
			} 
			collection.find({userId:data.userId,addressId:data.addressId}).toArray(function(err,docs){
				if(err){
					console.log('fetchSite:',err);
				}
				callback(docs);
				db.close();
			})		
			
		})
	})	
}
//修改用户地址
var amendSite = function(_collection,data,callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error)	
			} 
			collection.find({userId:data.userId,addressId:data.addressId}).toArray(function(err,docs){
				if(err){
					console.log('amendSite:',err);
				}
				collection.update({userId:data.userId,addressId:data.addressId},
					{$set:{username:data.username,phone:data.phone,address:data.address}},
					{multi:true});
				callback(docs);
				db.close();
			})		
			
		})
	})	
}
//删除用户地址
var removeSite = function(_collection,data,callback){
	db.open(function(err,db){
		if(err){
			console.log('connect db:',err)
		}

		db.collection(_collection,function(err,collection){
			if(err){
				console.log('connect collection:',err)
			}
			collection.find({userId:data.userId,addressId:data.addressId}).toArray(function(err,doc){
				if(err){
					console.log('find collection:',err)
				}
				collection.remove(data);
				callback(doc);
				db.close();
			})
		})
	})
}
exports.addSite = addSite;
exports.getSite = getSite;
exports.fetchSite = fetchSite;
exports.amendSite = amendSite;
exports.removeSite = removeSite;

