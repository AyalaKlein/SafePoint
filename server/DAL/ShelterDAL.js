const { getDB, ObjectId } = require('./BaseDAL');
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
        shelterData.lastUpdateDate = new Date();
        db.collection(collectionName).insertOne(shelterData)
            .then(resolve)
            .catch(reject);
    });
}

const editShelter = (_id, shelterData) => {
    return new Promise((resolve, reject) => {
        shelterData.lastUpdateDate = new Date();``
        db.collection(collectionName).updateOne({_id: ObjectId(_id)}, {$set: shelterData})
            .then(resolve)
            .catch(reject);
    });
}

const deleteShelter = (_id) => {
    return new Promise((resolve, reject) => {
        db.collection(collectionName).deleteOne({_id: ObjectId(_id)})
            .then(resolve)
            .catch(reject);
    })
}

const sheltersLastMonth = () => {
    return new Promise((resolve, reject) => {
        db.collection(collectionName).find({
            lastUpdateDate: { $gt: new Date(new Date() - 30 * 24 * 60 * 60 * 1000) }
        }).toArray()
        .then(resolve)
        .catch(reject);
    })
}

module.exports = { getAll, createShelter, editShelter, deleteShelter, sheltersLastMonth } 