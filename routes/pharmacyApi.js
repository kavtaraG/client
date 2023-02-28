var express = require('express');
var app = express.Router();
const { getMongoData } = require('../controller/app.mongo');


app.get('/', async (req, res) => {
	res.send( await getMongoData(req.body));
});

module.exports = app;