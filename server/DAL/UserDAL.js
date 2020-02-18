const { getDB, ObjectId } = require('./BaseDAL');
const collectionName = 'Users';
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

const getById = (id) => {
    return new Promise((resolve, reject) => {
        db.collection(collectionName).findOne({_id: id})
            .then(resolve)
            .catch(reject);
    });
}

const userLogin = (username, password) => {
    return new Promise((resolve, reject) => {
        db.collection(collectionName).findOne({Username: username, Password: password}, {})
            .then(resolve)
            .catch(reject);
    });
}

const isUserExist = (username) => {
    return new Promise((resolve, reject) => {
        db.collection(collectionName).find({Username: username})
            .then(resolve)
            .catch(reject);
    });
}

const registerUser = (userData) => {
    return new Promise((resolve, reject) => {
        db.collection(collectionName).insertOne(userData)
            .then(resolve)
            .catch(reject);
    });
}

const updateUser = (id, userData) => {
    return new Promise((resolve, reject) => {
        db.collection(collectionName).updateOne({ _id: ObjectId(id) }, { $set: userData })
            .then(resolve)
            .catch(reject);
    });
}

const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        db.collection(collectionName).deleteOne({ _id: ObjectId(id) })
            .then(resolve)
            .catch(reject);
    });
}

module.exports = { getAll, userLogin, isUserExist, registerUser, updateUser, getById, deleteUser }