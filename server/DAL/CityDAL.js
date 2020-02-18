const { getDB } = require('./BaseDAL');
const collectionName = 'Cities';
let db = null;

getDB().then((result) => {
    db = result;
})

const getAll = () => {
    return new Promise((resolve, reject) => {
        db.collection(collectionName).find().toArray()
        .then(resolve)
        .catch((err) => {
            console.log(err);
            reject(err);
        });
    });
}

module.exports = { getAll }