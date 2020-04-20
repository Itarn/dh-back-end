const { createPool } = require('mysql')
const config = require('../config/default')

const pool = createPool({
  host     :  config.host,
  user     :  config.user,
  password :  config.password,
  database :  config.database,
  connectionLimit: 10
})

let query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, (err, rows) => {
          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })
}

module.exports = { query }