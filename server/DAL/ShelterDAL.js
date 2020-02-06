const { db } = require('./BaseDAL');
const collectionName = 'Shelters';

const getAll = () => {
    return new Promise((resolve, reject) => {
        db.collection(collectionName).find().toArray()
        .then((result) => {
            resolve(result);
        })
        .catch((err) => {
            reject(err);
        });
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