const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Assaf:assaf@mydb-hjrjz.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
let db = null;

const initDB = () => {
  return new Promise((resolve, reject) => {
    client.connect(err => {
      if (err) {
        reject();
      } else {
        db = client.db("ShelterCityDB");
        resolve();
      }
    });
  });
}

exports.default = {initDB, db}