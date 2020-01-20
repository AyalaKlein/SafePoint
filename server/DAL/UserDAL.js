const { getDB } = require('./BaseDAL');
const collectionName = 'Users';
let db = null;

getDB().then((result) => {
    db = result;
})

const getAll = () => {
    return new Promise((resolve, reject) => {
        db.collection(collectionName).find().toArray()
        .then((result) => {
            resolve(result);
        })
        .catch((err) => {
            console.log(err);
            reject(err);
        });
    });
}

module.exports = { getAll }