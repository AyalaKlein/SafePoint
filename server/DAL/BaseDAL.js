const { Pool } = require('pg')

const pool = new Pool({
  user: 'dgbvxovd',
  host: 'kandula.db.elephantsql.com',
  database: 'dgbvxovd',
  password: 'RpPKxxeauYoEzrfZWZse47vF8nLuqA4y',
  dbname: 'dgbvxovd',
  port: 5432,
})

module.exports = { pool }