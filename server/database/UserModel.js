const Connection = require("./Conenction")

  const registerUser= (body) => {
    return new Promise(function(resolve, reject) {
      const { use_name, use_age, use_email, use_telephone, use_password } = body
      Connection.query(`INSERT INTO "user" (use_name, use_age, use_email, use_telephone, use_password) VALUES ($1, $2, $3, $4, $5) RETURNING *`,[use_name, use_age, use_email, use_telephone, use_password], (error, results) => {
        if (results) 
          resolve(`User created: ${results.rows}`)
        reject(error)
      })
    })
  }
//$1, $2, 3$, 4$, 5$
  const updateUser= (body) => {
    return new Promise(function(resolve, reject) {
      const {use_name, use_age, use_email, use_telephone} = body
      Connection.query('UPDATE user SET use_name=$1, use_age=$2, use_email=$3, use_telephone=$4, use_password=$5 RETURNING *', 
      [use_name, use_age, use_email, use_telephone], (error, results) => {
        if (results) 
          resolve(`User updated: ${results.rows[0]}`)
        reject(error)
      })
    })
  }


  const deletUser = (id) => {
    return new Promise(function(resolve, reject) {
      Connection.query(`DELETE FROM user WHERE use_id = ${id}`, (error, results) => {
        if (results) 
          resolve(`User removed ID: ${id}`)
        reject(error)
        
        
      })
    })
  }

  const getUser = (id) => {
    return new Promise(function(resolve, reject) {
      Connection.query(`SELECT * FROM "user" WHERE use_id=${id}`, (error, results) => {
        if (results)
          resolve({sucess: true, data: results.rows})
        reject({sucess: false, error: error})
        
      })
    })
  }

  module.exports = {
      registerUser,
      updateUser,
      deletUser,
      getUser
  }