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

					//console.log(docs);
					res.send(docs);
				});
			}
			db.close();
		})
	})	
}
exports.getIndexData = getIndexData;