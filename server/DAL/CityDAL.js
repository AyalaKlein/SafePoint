const { pool } = require('./BaseDAL');

const getAll = () => {
    return pool.query("SELECT * FROM \"Cities\"")
}

module.exports = { getAll }