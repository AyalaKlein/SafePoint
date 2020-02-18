const { getDB, ObjectId } = require('./BaseDAL');
const moment = require('moment')
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
        shelterData.MaxPopulation = parseInt(shelterData.MaxPopulation);
        db.collection(collectionName).insertOne(shelterData)
            .then(resolve)
            .catch(reject);
    });
}

const editShelter = (_id, shelterData) => {
    return new Promise((resolve, reject) => {
        shelterData.MaxPopulation = parseInt(shelterData.MaxPopulation);
        db.collection(collectionName).updateOne({ _id: ObjectId(_id) }, { $set: shelterData })
            .then(resolve)
            .catch(reject);
    });
}

const deleteShelter = (_id) => {
    return new Promise((resolve, reject) => {
        db.collection(collectionName).deleteOne({ _id: ObjectId(_id) })
            .then(resolve)
            .catch(reject);
    })
}

const sheltersByMonth = () => {
    return new Promise((resolve, reject) => {
        db.collection(collectionName).aggregate([
            {
                "$match": {
                    "lastUpdateDate": { "$gte": moment().subtract(4, 'months').toDate() }
                }
            },
            {
                "$group": {
                    _id: { $dateToString: { format: "%Y-%m", date: "$lastUpdateDate" } },
                    count: { $sum: 1 }
                }
            }]).toArray()
            .then(resolve)
            .catch(reject);
    })
}

const sheltersCountByMaxPopulation = () => {
    return new Promise((resolve, reject) => {
        db.collection(collectionName).aggregate([{ "$group": { _id: "$MaxPopulation", count: { $sum: 1 } } }, { $sort: { "count": -1, "_id": -1 } }]).toArray()
            .then(resolve)
            .catch(reject);
    });
}

module.exports = { getAll, createShelter, editShelter, deleteShelter, sheltersByMonth, sheltersCountByMaxPopulation } 