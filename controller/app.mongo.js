const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectId;

const dbName = 'pharmdb';
const url = 'mongodb://localhost:27017';


const getMongoData = function(){ 
	return new Promise((resolve, reject) => {
	MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true},
	  function(err, client) {
	  assert.equal(null, err);
	  const db = client.db(dbName);
		db.collection('hosps').find().toArray(function (err, result) {
		  if (err) throw err
		  //console.log(result);
		  client.close();
		  resolve(result);
		});
	});
	});
  };

  const getMongoDataBySearch = function(field,searchText){
	return new Promise((resolve, reject) => {
	  var records = [];
	  //searhObject[searchParam.field] = "/"+searchParam.searchword+"/i";
	  //console.log("search ==> "+JSON.stringify(searchParam));
	  console.log("field:"+field);
	  console.log("searchText:"+searchText);
  
	  MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
	  assert.equal(null, err);
	  const db = client.db(dbName);
		db.collection('hosps').find({[field]:{'$regex' : searchText, '$options' : 'i'}}).toArray(function (err, result) {
		  if (err) throw err
		  console.log("result:"+JSON.stringify(result));
		  resolve(result);
		  client.close();
		   });
		});
	});
  };

module.exports = { getMongoData, getMongoDataBySearch };