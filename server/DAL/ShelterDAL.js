const { pool, client } = require('./BaseDAL');
const moment = require('moment')

const getAll = async () => {
    var sql ="SELECT * FROM \"Shelters\""
    var res = pool.query(sql)
    return res
}

function getRandomInt(min = 1, max = 999999999) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createShelter = (shelterData) => {
    let query = {
        text: "INSERT INTO \"Shelters\" (\"Id\", \"Description\", \"LocX\", \"LocY\", \"MaxPopulation\") values ($5, $1, $2, $3, $4)",
        values: [shelterData.Description, shelterData.LocX, shelterData.LocY, parseInt(shelterData.MaxPopulation), getRandomInt()]
    }

    return pool.query(query)
}

const editShelter = (id, shelterData) => {
    let query = {
        text: "UPDATE \"Shelters\" SET \"Description\"=$1, \"LocX\"=$2, \"LocY\"=$3, \"MaxPopulation\"=$4 WHERE \"Id\" = $5",
        values: [shelterData.Description, shelterData.LocX, shelterData.LocY, parseInt(shelterData.MaxPopulation), id]
    }

    return pool.query(query)
}

const deleteShelter = (id) => {
    let query = {
        text: "DELETE FROM \"Shelters\" WHERE \"Id\"=$1",
        values: [id]
    }
    return pool.query(query)
}

const sheltersByMonth = () => {
    return pool.query("SELECT shel.lastUpdateDate, count(shel.* ) FROM \"Shelters\" as shel group by shel.lastUpdateDate")
}

const sheltersCountByMaxPopulation = () => {
    return pool.query("SELECT MaxPopulation, count(*) FROM \"Shelters\" group by \"Shelters\".MaxPopulation")
}

module.exports = { getAll, createShelter, editShelter, deleteShelter, sheltersByMonth, sheltersCountByMaxPopulation } 