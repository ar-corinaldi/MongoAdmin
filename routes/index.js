var express = require("express");
var router = express.Router();
const mongo = require("../database/MongoUtils");
/* GET home page. */
router.get("/databases", function(req, res) {
  mongo.databases().then(dbs => {
    res.render("databases", { databases: dbs.databases });
  });
});

router.get("/", function(req, res) {
  res.render("index", {title: "Express"});
});

router.get("/databases/:dbName", function(req, res) {
  const dbName = req.params.dbName;
  console.log(dbName);
  mongo.collections(dbName).then(cols => {
    console.log("Collections", cols);
    res.json(cols);
  });
});

module.exports = router;
