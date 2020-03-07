const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
function MongoUtils() {
  const mu = {};
  
  const ObjectId = mongodb.ObjectID;
  let url = process.env.DB_URL || "mongodb://localhost:27017";

  // To change url server
  mu.url = paramUrl => {
    url = process.env.DB_URL || "mongodb://localhost:27017";
    if (paramUrl !== "") url = paramUrl;
  };

  // To search _id
  mu.ObjectId = ObjectId;

  // List of DBs
  mu.databases = () => {
    const client = new MongoClient(url, { useUnifiedTopology: true }); // useUnifiedTopology removes a warning
    return client.connect().then(client => {
      return client
        .db()
        .admin()
        .listDatabases()
        .finally(() => client.close()); // Returns a promise that will resolve to the list of databases
    });
  };

  // List of collections
  mu.collections = dbName => {
    const client = new MongoClient(url, { useUnifiedTopology: true }); // useUnifiedTopology removes a warning
    return client.connect().then(client => {
      return client
        .db(dbName)
        .listCollections()
        .toArray()
        .finally(() => client.close()); // Returns a promise that will resolve to the list of databases
    });
  };

  // To get first 20 records from a collection
  mu.findAll = (dbName, collection) => {
    const client = new MongoClient(url, { useUnifiedTopology: true }); // useUnifiedTopology removes a warning
    return client.connect().then(client => {
      return client
        .db(dbName)
        .collection(collection)
        .find({})
        .sort({ _id: -1 })
        .limit(20)
        .toArray()
        .finally(() => client.close()); // Returns a promise that will resolve to the list of databases
    });
  };

  // Insert a new document in a collection
  mu.insert = (dbName, collection, query) => {
    const client = new MongoClient(url, { useUnifiedTopology: true }); // useUnifiedTopology removes a warning
    return client.connect().then(client => {
      return client
        .db(dbName)
        .collection(collection)
        .insertOne(query)
        .finally(() => client.close());
    });
  };

  // Delete a new record in a collection
  mu.delete = (dbName, collection, query) => {
    const client = new MongoClient(url, { useUnifiedTopology: true }); // useUnifiedTopology removes a warning

    return client.connect().then(client => {
      return client
        .db(dbName)
        .collection(collection)
        .deleteOne(query)
        .finally(() => client.close());
    });
  };

  // Update a new record from a collection
  mu.update = (dbName, collection, query, update) => {
    const client = new MongoClient(url, { useUnifiedTopology: true }); // useUnifiedTopology removes a warning
    return client.connect().then(client => {
      return client
        .db(dbName)
        .collection(collection)
        .updateOne(query, update)
        .finally(() => client.close());
    });
  };
  return mu;
}

module.exports = MongoUtils();
