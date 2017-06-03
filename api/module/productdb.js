/*
	产品数据处理
 */
var db = require('./db.js')();

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
					res.send(JSON.stringify(docs));
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
				var reg = new RegExp("^.*"+data.keyword+"\.*$","i");
				collection.find({'$or':[{goodsMsg:{$regex:reg}},{id:data.keyword}]}).toArray(function(err,dos){	
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
var details = function(name, res){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection('details', function(error, collection){
			if(error){
				console.log(error)	
			} else {

				collection.find({id:name.id}).toArray(function(err, docs){
					res.send(docs);
					db.close();
				});
			}
			
		})
	})	
}
var delgoods = function(_collection,data, callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error)	
			} else {
				collection.find({id:data.id}).toArray(function(err, docs){
					if(err){
						console.log('find err:',err);
					}

					collection.remove(data);
					callback(docs);
					db.close();
				});
			}
			
		})
	})	
}
var fetchgoods = function(_collection,data, callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error)	
			} else {
				collection.find({id:data.id}).toArray(function(err, docs){
					if(err){
						console.log('find err:',err);
					}
					callback(docs);
					db.close();
				});
			}
			
		})
	})	
}
var chggoods = function(_collection,data, callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error)	
			} else {
				collection.find({id:data.id}).toArray(function(err, docs){
					if(err){
						console.log('find err:',err);
					}
					collection.update({id:data.id},
						{$set:{pic:data.pic,kucun:data.kucun,goodsMsg:data.goodsMsg,
							price:data.price,vipPrice:data.vipPrice,states:data.states,
							des:data.des,banner:data.banner,photo:data.photo,kind1:data.kind1,
							kind2:data.kind2,kind3:data.kind3}},{multi:true});
					callback(docs);
					db.close();
				});
			}
			
		})
	})	
}
exports.details=details;
exports.delgoods=delgoods;
exports.fetchgoods=fetchgoods;
exports.chggoods=chggoods;
exports.output = output;
exports.addproduct = addproduct;
exports.searchproduct = searchproduct;
