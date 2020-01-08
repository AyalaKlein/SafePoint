const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Assaf:assaf@mydb-hjrjz.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

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

export default {initDB, db}