var express = require("express");
var router = express.Router();
const mongo = require("../database/MongoUtils");
let dbName = "";
let collection = "";

/* POST databases */
router.post("/databases", function(req, res) {
  mongo.url(req.body.url);
  res.redirect("/databases");
});

/* GET databases page. */
router.get("/databases", function(req, res) {
  mongo.databases().then(dbs => {
    res.render("databases", { databases: dbs.databases });
  });
});

/* GET home page. */
router.get("/", function(req, res) {
  res.render("index");
});

/* GET delete and id by parameter. */
router.get("/delete/:id", function(req, res) {
  const id = req.params;
  const query = { _id: mongo.ObjectId(id.id) };
  console.log(query);
  mongo.delete(dbName, collection, query);
  res.redirect("/databases");
});

/* GET databases and a DB by parameter. */
router.get("/databases/:dbName", function(req, res) {
  const dbName = req.params.dbName;
  console.log("dbName", dbName);
  mongo.collections(dbName).then(cols => {
    console.log("Collections", cols);
    res.json(cols);
  });
});

/* POST databases and add a record. */
router.post("/databases/add", function(req, res) {
  console.log(req.body);
  mongo.insert(dbName, collection, req.body);
  res.redirect("/databases");
});

/* POST databases and update a record. */
router.post("/databases/update", function(req, res) {
  const $set = {};
  for (let prop in req.body) {
    if (prop !== "_id") {
      $set[prop] = req.body[prop];
    }
  }
  const query = {
    _id: mongo.ObjectId(req.body._id)
  };
  
  const update = {
    $set
  };
  console.log(update);
  mongo.update(dbName, collection, query, update);
  res.redirect("/databases");
});

/* GET databases and collection. */
router.get("/databases/:dbName/:collection", function(req, res) {
  console.log(req.params.collection);
  dbName = req.params.dbName;
  collection = req.params.collection;
  mongo.findAll(dbName, collection).then(data => {
    console.log("data", data);
    res.json(data);
  });
});

module.exports = router;
