const MongoClient = require("mongodb").MongoClient;

function MongoUtils() {
  const mu = {};
  const url =
    "mongodb+srv://allan9899:hola1234@pensiondb-y5joy.mongodb.net/test?retryWrites=true&w=majority";

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
  return mu;
}

module.exports = MongoUtils();
