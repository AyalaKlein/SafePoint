const { pool } = require('./BaseDAL');

const getAll = () => {
    return pool.query("SELECT * FROM \"Users\"")
}

const getById = (id) => {
    let query = {
        text: "SELECT * FROM \"Users\" WHERE Id=$1",
        values: [id]
    }

    return pool.query(query)
}

const userLogin = (username, password) => {
    let query = {
        text: "SELECT * FROM \"Users\" WHERE Username=$1,Password=$2 limit 1",
        values: [username, password]
    }

    return pool.query(query)
}

const isUserExist = (username) => {
    let query = {
        text: "SELECT * FROM \"Users\" WHERE Username=$1 limit 1",
        values: [username]
    }

    return pool.query(query)
}

const registerUser = (userData) => {
    let query = {
        text: "INSERT INTO \"Users\" (Id, Username, Password) VALUES (UsersSeq.nextval,$1,$2)",
        values: [userData.username, userData.password]
    }
    
    return pool.query(query)
}

const updateUser = (id, userData) => {  
    let query = {
        text: "UPDATE \"Users\" SET Username=$1, Password=$2 WHERE Id=$3",
        values: [id, userData.username, userData.password]
    }
    
    return pool.query(query)
}

const deleteUser = (id) => {
    let query = {
        text: "DELETE FROM \"Users\" WHERE Id=$1",
        values: [id]
    }
    return pool.query(query)
}

module.exports = { getAll, userLogin, isUserExist, registerUser, updateUser, getById, deleteUser }