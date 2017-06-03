var db = require('./db.js')();

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
				collection.find({'$or':[{username:data.username},{email:data.username}]}).toArray(function(err, docs){
					
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
				collection.find({username:data[key]}).toArray(function(err, docs){
					console.log(docs)
					if(docs[0]){
						collection.update({username:data[key]},{$set:{password:data.password}});
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
// var resetemail = function(_collection, data,key,callback){
// 	db.open(function(error, db){
// 		if(error){
// 			console.log('connect db:', error);
// 		}
// 		//Account => 集合名（表名）
// 		db.collection(_collection, function(error, collection){
// 			if(error){
// 				console.log(error);	
// 			} else {
// 				collection.find({username:data[key]}).toArray(function(err, docs){
// 					console.log(docs,data)
// 					if(docs[0]){
// 						collection.update({username:data[key]},{$set:{email:data.email}});
// 						callback(docs);
// 						db.close();
// 					}else{
// 						callback(null);
// 						db.close();
// 					}
					
// 				});
// 			}
			
// 		})
// 	})	
// }
//购物车商品根据用户id存入数据库
var usercart = function(_collection, data,callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error);	
			} else {
				collection.find({userId:data.userId}).toArray(function(err,doc){
					if(err){
						console.log(err);
					}
					if(!doc.length){
						collection.insert(data);
						callback(null);	
					}else{
						var num = 0;
						doc.forEach(function(items){
							if(Number(items.goodsId) == Number(data.goodsId)){
								if(items.standard == data.standard){
									
									num = Number(data.qty) + Number(items.qty);
									// console.log(num);
									// console.log(333);
									collection.update({standard:items.standard},{$set:{qty:num}});

									db.close();
								}
							}
						})
						collection.insert(data);
						callback(true);	
					}
					 db.close();
				})
					
			}
			
		})
	})	
}
//购物车商品根据用户id显示到页面
var getgoods = function(_collection, data,callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error);	
			} else {	
				collection.find({userId:data.userId}).toArray(function(err,docs){
					if(err){
						console.log('docs:' + err);
					}
					callback(docs);
					db.close();
				})
			}
			
		})
	})	
}
//删除用户购物车商品  更新数据库
var removegoods = function(_collection, data,callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error);	
			} else {	
				collection.find({userId:data.userId}).toArray(function(err,docs){
					if(err){
						console.log('docs:' + err);
					}
					docs.forEach(function(items,idx){			
						if(items.standard == data.standard){
							//更新数据库
							collection.remove({standard:items.standard});
							docs.splice(idx,1);	
						}	
					})
					callback(docs);
					db.close();
					
				})
			}
			
		})
	})	
}
//修改用户购物车商品数量
var updategoods = function(_collection, data,callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error);	
			} else {	
				collection.find({userId:data.userId}).toArray(function(err,docs){
					if(err){
						console.log('docs:' + err);
					}
					docs.forEach(function(items,idx){			
						if(items.standard == data.standard){
							//更新数据库用户商品数量
							collection.update({standard:items.standard},{$set:{qty:data.qty}});
							items.qty = data.qty;
						}	
					})
					callback(docs);
					db.close();
					
				})
			}
			
		})
	})	
}
//收藏产品 , 删除收藏
var collectgoods = function(_collection, data,callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error)	
			} else {
				collection.find({userId:data.userId,goodsId:data.goodsId}).toArray(function(err,doc){
					if(err){
						console.log('userid : ',err);
					}
					if(!doc[0]){
						collection.insert(data);
						callback(true);
					}
					db.close();
				})
			}
			
		})
	})	
}
//获取商品
var fetchgoods = function(_collection,data,callback){
	db.open(function(err,db){
		if(err){
			console.log('connect db:',err);
			return;
		}
		db.collection(_collection,function(err,collection){
			if(err){
				console.log('connect collection:',err);
				return;
			}
			collection.find({userId:data.userId}).toArray(function(err,doc){
				if(err){
					console.log('collection find:',err);
					return;
				}
				callback(doc);
				db.close();
			})
		})
	})
}
var delgoods = function(_collection, data,callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error)	
			} else {
				collection.find({userId:data.userId,goodsId:data.goodsId}).toArray(function(err,doc){
					if(err){
						console.log('userid : ',err);
					}
					if(doc[0]){
						collection.remove(data);
						
						callback(null);
					}
					db.close();
				})
			}
			
		})
	})	
}
var managerLogin = function(_collection,data,callback){
	db.open(function(err,db){
		if(err){
			console.log('connect db:',err);
		}

		db.collection(_collection,function(err,collection){
			if(err){
				console.log('connect collection:',err);
			}

			collection.find({name:data.name,password:data.password}).toArray(function(err,doc){
				if(err){
					console.log('find err:',err);
				}
				callback(doc);
				db.close();
			})
		})
	})
}
//重置邮件
var resetemail = function(_collection, data,key,callback){
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
					console.log(docs,data)
					if(docs[0]){
						collection.update({username:data[key]},{$set:{email:data.email}});
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
//获取当前用户的email
var getIndexemail = function(_collection, data,key, callback){

	db.open(function(error, db){

		if(error){
			console.log('connect db:', error);
		}
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error);	
			} else {
				collection.find({username:data[key]}).toArray(function(err, docs){
				if(docs[0]){
					
						if(docs[0].username === data.username){
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
			db.close();
		})
	})	
}

exports.managerLogin = managerLogin;
exports.register = register;
exports.loginc = loginc;
exports.findpsw = findpsw;
exports.resetpsw = resetpsw;
exports.resetemail = resetemail;
exports.getIndexemail = getIndexemail;
exports.usercart = usercart;
exports.getgoods = getgoods;
exports.removegoods = removegoods;
exports.updategoods = updategoods;
exports.collectgoods = collectgoods;
exports.fetchgoods = fetchgoods;
exports.delgoods = delgoods;
