const router = require("express").Router()
const CourseModel = require("../database/CourseModel")
const Conn = require("../database/Connection")
const {verifyAdmin} = require("../services/AuthService")


router.post("/register", verifyAdmin, (req, res) => {
  try {
      const newCourse = req.body
      CourseModel.registerCourse(newCourse)
      .then(response => {
          res.status(200).send(response);
        })
        .catch(error => {
          res.status(500).send(error);
        })
  } catch (error) {
      res.send({sucess: false, error: "an error occurred during processing"})
  }
})

router.get("/list", (req, res) => {
    CourseModel.listCourses()
    .then(response => {
        res.status(200).send(response);
      })
      .catch(error => {
        res.status(500).send(error);
      })
})

router.get("/get/:cou_id", (req, res) => {
  try {
    const cou_id = req.params.cou_id
  CourseModel.getCourse(cou_id)
  .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  }catch (error) {
    res.send({sucess: false, error: "an error occurred during processing"})
}
})


router.put("/update", verifyAdmin, (req, res) => {
  try {
    const course = req.body
    CourseModel.updateCourse(course)
    .then(response => {
        res.status(200).send(response);
      })
      .catch(error => {
        res.status(500).send(error);
      })
} catch (error) {
    res.send({sucess: false, error: "an error occurred during processing"})
}
})


router.delete("/delete", verifyAdmin, (req, res) => {
  try {
    const cou_id = req.body.cou_id
    CourseModel.deletCourse(cou_id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  }catch (error) {
    res.send({sucess: false, error: "an error occurred during processing"})
}
})

// router.post("/my-courses", (req, res) => {
//   const {cou_id} = req.body
//   try {
//         new Promise( function(resolve, reject){
//           Conn.query(`select count(*) from finished_class f inner join`+
//           ` course c on f.fk_cou_id = ${cou_id} and c.cou_id = ${cou_id} and fk_use_id = ${req.user.use_id}`,
//            (error, results) => {
//             resolve(res.send({success: true, data: results.rows[0]}))
//             reject({success: false, data: error})
//            })
//         })
//   } catch (error) {
//     res.send({ sucess: false, error: "an error occurred during processing" });
//   }
// });

router.get("/my-courses-quantity", (req, res) => {
  try {
        new Promise( function(resolve, reject){
          Conn.query(`select distinct fk_cou_id from finished_class where fk_use_id = ${req.user.use_id}`,

           (error, results) => {
            resolve(res.send({success: true, data: results.rows}))
            reject({success: false, data: error})
           })
        })
  } catch (error) {
    res.send({ sucess: false, error: "an error occurred during processing" });
  }
});

router.post("/my-courses", (req, res) => {
  const {id_courses} = req.body
  try {
        new Promise( function(resolve, reject){
          Conn.query(`select * from course c where c.cou_id in ${id_courses}`,
           (error, results) => {
             if(!results) {
              resolve(res.send({success: true, data: results}))
             } else {
            resolve(res.send({success: true, data: results.rows}))
            reject({success: false, data: error})
             }
           })
        })
  } catch (error) {
    res.send({ sucess: false, error: "an error occurred during processing" });
  }
});

module.exports = router