const Connection = require("./Conenction")


const registerCourse = (body) => {
  return new Promise(function(resolve, reject) {
    const { cou_id, cou_name, cou_duration, cou_description } = body
    Connection.query(`INSERT INTO "course" (cou_id, cou_name, cou_duration, cou_description) VALUES ($1, $2, $3, $4) RETURNING *`,
    [cou_id, cou_name, cou_duration, cou_description], (error, results) => {
      if (results) 
        resolve(`User created: ${results.rows}`)
      reject(error)
    })
  })
}


  const listCourses = () => {
    return new Promise(function(resolve, reject) {
      Connection.query('SELECT * FROM course', (error, results) => {
        if (results)
          resolve({sucess: true, data: results.rows})
        reject({sucess: false, error: error})
      })
    }) 
  }

  const getCourse = (id) => {
    return new Promise(function(resolve, reject) {
      Connection.query(`SELECT * FROM course WHERE cou_id=${id}`, (error, results) => {
        if (results)
          resolve({sucess: true, data: results.rows})
        reject({sucess: false, error: error})
      })
    }) 
  }

//$1, $2, 3$, 4$, 5$
  const updateCourse = (body) => {
    return new Promise(function(resolve, reject) {
      const {cou_id, cou_name, cou_duration, cou_description} = body
      Connection.query('UPDATE "course" SET cou_name=$2, cou_duration=$3, cou_description=$4 WHERE cou_id=$1 RETURNING *', 
      [cou_id, cou_name, cou_duration, cou_description], (error, results) => {
        if (results) 
          resolve(`User updated: ${results.rows[0]}`)
        reject(error)
      })
    })
  }


  const deletCourse = (id) => {
    return new Promise(function(resolve, reject) {
      Connection.query(`DELETE FROM "course" WHERE cou_id = ${id}`, (error, results) => {
        if (results) 
          resolve(`Course removed ID: ${id}`)
        reject(error)
        
        
      })
    })
  }


  module.exports = {
      listCourses,
      registerCourse,
      getCourse,
      updateCourse,
      deletCourse
  }