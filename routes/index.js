var express = require("express");
var router = express.Router();
const mongo = require("../database/MongoUtils");
let dbName = "";
let collection = "";
/* GET home page. */
router.get("/databases", function(req, res) {
  mongo.databases().then(dbs => {
    res.render("databases", { databases: dbs.databases });
  });
});

router.get("/", function(req, res) {
  res.render("index", { title: "Express" });
});

router.get("/databases/:dbName", function(req, res) {
  const dbName = req.params.dbName;
  console.log("Ping"+dbName);
  mongo.collections(dbName).then(cols => {
    console.log("Collections", cols);
    res.json(cols);
  });
});

router.post("/databases/add", function(req, res) {
  const projectName = req.body.projectName;
  const grade = req.body.grade;
  const query = { project_name: projectName, grade };
  console.log(query);
  mongo.insert(dbName, collection, query);
  res.redirect("/databases");
});

router.get("/databases/:dbName/:collection", function(req, res) {
  console.log("llega");
  console.log(req.params.collection);
  dbName = req.params.dbName;
  collection = req.params.collection;
  mongo.findAll(dbName, collection).then(data => {
    console.log("data", data);
    res.json(data);
  });
});

module.exports = router;