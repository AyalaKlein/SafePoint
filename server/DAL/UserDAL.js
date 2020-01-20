const { getDB } = require('./BaseDAL');
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

const userLogin = (username, password) => {
    return new Promise((resolve, reject) => {
        db.collection(collectionName).findOne({Username: username, Password: password})
            .then(resolve)
            .catch(reject);
    });
}

module.exports = { getAll, userLogin }