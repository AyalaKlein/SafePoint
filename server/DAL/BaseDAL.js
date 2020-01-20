const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Assaf:assaf@mydb-hjrjz.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
let db = null;

const getDB = () => {
  return new Promise((resolve, reject) => {
    if (!db) {
      client.connect(err => {
        if (err) {
          reject();
        } else {
          db = client.db("ShelterCityDB");
          resolve(db);
        }
      });
    } else {
      resolve(db);
    }
  });
}

module.exports = {getDB}