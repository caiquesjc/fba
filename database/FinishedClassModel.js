const Connection = require("./Connection")

const registerFinishedClass = (body) => {
    return new Promise(function(resolve, reject) {
      const { fk_cla_id, fk_cou_id, fk_use_id } = body
      Connection.query(`INSERT INTO "finished_class" (fk_cla_id, fk_cou_id,fk_use_id) VALUES ($1, $2, $3) RETURNING *`,
      [fk_cla_id, fk_cou_id, fk_use_id], (error, results) => {
        if (results) 
          resolve({success: true, data: results.rows})
        reject(error)
      })
    })
  }

  const listFinishedClass = (body) => {
    return new Promise(function(resolve, reject) {
        const { fk_cou_id, fk_use_id } = body
      Connection.query(`SELECT * FROM "finished_class" where fk_cou_id=${fk_cou_id} and fk_use_id=${fk_use_id}`, (error, results) => {
        if (results)
          resolve({success: true, data: results.rows})
        reject({success: false, error: error})
      })
    }) 
  }
  
  module.exports ={
      registerFinishedClass,
      listFinishedClass
  }