const Connection = require("./Conenction")

  const listCourses = () => {
    return new Promise(function(resolve, reject) {
      Connection.query('SELECT * FROM course', (error, results) => {
        if (results)
          resolve({sucess: true, data: results.rows})
        reject({sucess: false, error: error})
      })
    }) 
  }

  module.exports = {
      listCourses
  }