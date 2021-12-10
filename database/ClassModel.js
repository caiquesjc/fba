const Connection = require("./Conenction")


const registerClass = (body) => {
  return new Promise(function(resolve, reject) {
    const { cla_name, cla_duration, cla_description, fk_cou_id, cla_video } = body
    Connection.query(`INSERT INTO "class" (cla_name, cla_duration, cla_description, fk_cou_id, cla_video) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [cla_name, cla_duration, cla_description, fk_cou_id, cla_video], (error, results) => {
      if (results) 
        resolve(`Class created: ${results.rows}`)
      reject(error)
    })
  })
}


  const listClass = () => {
    return new Promise(function(resolve, reject) {
      Connection.query('SELECT * FROM "class"', (error, results) => {
        if (results)
          resolve({sucess: true, data: results.rows})
        reject({sucess: false, error: error})
      })
    }) 
  }

  const getClass = (id) => {
    return new Promise(function(resolve, reject) {
      Connection.query(`SELECT * FROM "class" WHERE cla_id=${id}`, (error, results) => {
        if (results)
          resolve({sucess: true, data: results.rows})
        reject({sucess: false, error: error})
      })
    }) 
  }

//$1, $2, 3$, 4$, 5$
  const updateClass = (body) => {
    return new Promise(function(resolve, reject) {
      const {cla_id, cla_name, cla_duration, cla_description, fk_cou_id, cla_video} = body
      Connection.query('UPDATE "class" SET cla_name=$1, cla_duration=$2, cla_description=$3, fk_cou_id=$4, cla_video=$6 WHERE cla_id=$5 RETURNING *', 
      [cla_name, cla_duration, cla_description, fk_cou_id, cla_id, cla_video], (error, results) => {
        if (results) 
          resolve(`Class updated: ${results.rows[0]}`)
        reject(error)
      })
    })
  }


  const deletClass = (id) => {
    return new Promise(function(resolve, reject) {
      Connection.query(`DELETE FROM "class" WHERE cla_id = ${id}`, (error, results) => {
        if (results) 
          resolve(`Class removed ID: ${id}`)
        reject(error)
        
        
      })
    })
  }

  const classByCourseId = (id) => {
    return new Promise(function(resolve, reject) {
      Connection.query(`SELECT * FROM "class" WHERE fk_cou_id=${id}`, (error, results) => {
        if (results)
          resolve({sucess: true, data: results.rows})
        reject({sucess: false, error: error})
      })
    })
  }


  module.exports = {
      listClass,
      registerClass,
      getClass,
      updateClass,
      deletClass,
      classByCourseId
  }