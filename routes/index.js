var express = require('express');
var router = express.Router();
let fs = require('fs');

const { getMongoData, getMongoDataBySearch } = require('../controller/app.mongo');

const parseData = JSON.parse(fs.readFileSync(`${__dirname}/../client.json`));
const mapData = parseData.map((item) => (parseData, item));

/* GET home page. */

router.get('/', function(req, res, next) {
  const data = {};
  res.render('index', { title: 'Log In', data, username: mapData });
});

router.get('/table', async function(req, res, next) {
  const data = {};

  res.render('table', { title: 'Prescreption Table', user: parseData[0].username, data, data: await getMongoData() });
});

router.get('/search/:field/:searchWord', async function(req, res, next) {
  const data = {};
  res.render('table', { title: 'Express', data, data: await getMongoDataBySearch(req.params.field, req.params.searchWord) });
});

module.exports = router;
