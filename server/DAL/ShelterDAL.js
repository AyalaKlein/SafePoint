const { getDB } = require('./BaseDAL');
const collectionName = 'Shelters';
let db = null;

getDB().then((result) => {
    db = result;
})

const getAll = () => {
    return new Promise((resolve, reject) => {
        db.collection(collectionName).find().toArray()
            .then(resolve)
            .catch(reject);
    });
}

const createShelter = (shelterData) => {
    return new Promise((resolve, reject) => {
        db.collection(collectionName).insertOne(shelterData)
            .then(resolve)
            .catch(reject);
    });
}

module.exports = { getAll, createShelter } 