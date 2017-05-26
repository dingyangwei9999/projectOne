var mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 27017);

var db = new mongodb.Db('bbm', server);
//注册
var register = function(_collection, data, key, callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error);	
			} else {
				collection.find({username:data[key]}).toArray(function(err, docs){
					if(!docs[0]){
						collection.insert(data);
						db.close();
					}else{
						if(docs[0].email === data.email){
							callback(0);
							db.close();
						}else{
							callback(docs[0]);
							db.close();
						}
					}	
				});
			}
			
		})
	})	
}
//登陆验证
var loginc = function(_collection, data,callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error);	
			} else {
				collection.find({username:data.username}).toArray(function(err, docs){
					
					if(docs[0]){
						if(docs[0].password === data.password){
							callback(docs[0]);
							db.close();
						}else{
							callback(null);
							db.close();
						}	
					}else{
						callback(0);
						db.close();
					}
					
				});
			}
			
		})
	})	
}
//找回密码
var findpsw = function(_collection, data,key,callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error);	
			} else {
				collection.find({email:data[key]}).toArray(function(err, docs){
					console.log(docs)
					if(docs[0]){
						if(data.username == docs[0].username){
							callback(docs[0]);
							db.close();
						}else{
							callback(0);
							db.close();
						}	
					}else{
						callback(null);
						db.close();
					}
					
				});
			}
			
		})
	})	
}
//修改密码
var resetpsw = function(_collection, data,key,callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error);	
			} else {
				collection.find({email:data[key]}).toArray(function(err, docs){
					console.log(docs)
					if(docs[0]){
						collection.remove(docs);
						collection.insert(data);
						callback(docs);
						db.close();
					}else{
						callback(null);
						db.close();
					}
					
				});
			}
			
		})
	})	
}
exports.register = register;
exports.loginc = loginc;
exports.findpsw = findpsw;
export.resetpsw = resetpsw;