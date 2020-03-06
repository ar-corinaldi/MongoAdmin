const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
function MongoUtils() {
  const mu = {};
  const ObjectId = mongodb.ObjectID;
  const url =
    "mongodb+srv://allan9899:hola1234@pensiondb-y5joy.mongodb.net/test?retryWrites=true&w=majority";

  mu.ObjectId = ObjectId;
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

  mu.findAll = (dbName, collection) => {
    const client = new MongoClient(url, { useUnifiedTopology: true }); // useUnifiedTopology removes a warning
    return client.connect().then(client => {
      return client
        .db(dbName)
        .collection(collection)
        .find({})
        .sort({ _id: -1 })
        .toArray()
        .finally(() => client.close()); // Returns a promise that will resolve to the list of databases
    });
  };

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

  return mu;
}

module.exports = MongoUtils();
