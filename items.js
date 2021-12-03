var express = require('express');
var router = express.Router();
var itemModel = require("./../models/items");
var itemFile = "./data/items.json";
var fs = require("fs");

/* GET items listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/createProduct', function(req, res, next) {
  try {
    console.log(req);
    var newItem = new itemModel(req.body.name,req.body.category,req.body.price,req.body.description,req.body.user);
    var itemsRaw = fs.readFileSync(itemFile);
    var items = JSON.parse(itemsRaw);
    items['items'].push(newItem);
    var newDataToSave = JSON.stringify(items,null, 2);
    fs.writeFileSync(itemFile, newDataToSave);
    res.status(200).send(true);
    console.log('Product Created')

  } catch (e) {
    res.status(500).send(false);
    console.log('Error in Create item function:', e);
  }
});

router.post('/edit', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/delete', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:user', function(req, res, next) {
  res.send('respond with a resource');
});




module.exports = router;