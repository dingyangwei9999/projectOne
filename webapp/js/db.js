var mongodb = require('mongodb');
var server = new mongodb.Server('localhost', 27017, {
  auto_reconnect: true
});
var db = new mongodb.Db('bbm', server);


//新增数据
// var tmp1 = {id:'1',title:'hello',number:1};
//          collection.insert(tmp1,{safe:true},function(err, result){
//              console.log(result);
//          }); 
//更新数据
// collection.update({title:'hello'}, {$set:{number:3}}, {safe:true}, function(err, result){
//     console.log(result);
// });
// 删除数据
// collection.remove({title:'hello'},{safe:true},function(err,result){
//                   console.log(result);
//               });

// console.log(collection);
// 查询数据
// var tmp1 = {title:'hello'};
//  var tmp2 = {title:'world'};
//  collection.insert([tmp1,tmp2],{safe:true},function(err,result){
//   console.log(result);
//  }); 
//  collection.find().toArray(function(err,docs){
//   console.log('find');
//   console.log(docs);
//  }); 
//  collection.findOne(function(err,doc){
//     console.log('findOne');
//     console.log(doc);
//  }); 

module.exports = mongo;

function mongo(user) {
}
mongo.prototype.insert = function(callback) {
  var self = this;
  try{
    db.open(function(err, db) {
      if (err) {
        console.log('[mongo err]' + err);
        // db.close();
        return callback({status:1,data:'数据库查询失败'});
      }
      db.createCollection('list', function(err, collection) {
        if (err) {
          console.log('[mycoll err]' + err);
          db.close();
          return callback({status:2,data:'查询集合失败'});
        }
        collection.find().toArray(function(err,docs){
          db.close();
          if (err) {
            console.log('[insert err]' + err);
            return callback({status:1,data:'查询失败'});
            //return
          }
          return callback({status:0,data:docs});
        });
      })
    })
  }catch(e){
    console.log(1)
    callback({status:1,data:'数据库查询失败'});
  }
}