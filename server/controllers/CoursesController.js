const router = require("express").Router()
const CourseModel = require("../database/CourseModel")


router.post("/register", (req, res) => {
  try {
      const newCourse = req.body
      UserModel.registerUser(newCourse)
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

router.get("/get", (req, res) => {
  try {
    const cou_id = req.body.cou_id
  CourseModel.listCourses(cou_id)
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
    UserModel.registerUser(course)
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
    UserModel.deletUser(cou_id)
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