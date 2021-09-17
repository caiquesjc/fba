const router = require("express").Router()
const CourseModel = require("../database/CourseModel")

router.get("/list", (req, res) => {
    CourseModel.listCourses()
    .then(response => {
        res.status(200).send(response);
      })
      .catch(error => {
        res.status(500).send(error);
      })
})

module.exports = router