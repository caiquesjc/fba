const router = require("express").Router()
const CourseModel = require("../database/CourseModel")


router.post("/register", (req, res) => {
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


router.put("/update", (req, res) => {
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


router.delete("/delete", (req, res) => {
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


module.exports = router