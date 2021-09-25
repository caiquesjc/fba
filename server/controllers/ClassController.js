const router = require("express").Router()
const ClassModel = require("../database/ClassModel")


router.post("/register", (req, res) => {
  try {
      const newClass = req.body
      ClassModel.registerClass(newClass)
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
    ClassModel.listClass()
    .then(response => {
        res.status(200).send(response);
      })
      .catch(error => {
        res.status(500).send(error);
      })
})

router.get("/get/:cla_id", (req, res) => {
  try {
    const cla_id = req.params.cla_id
  ClassModel.getClass(cla_id)
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
    const classEdited = req.body
    ClassModel.updateClass(classEdited)
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
    const cla_id = req.body.cla_id
    ClassModel.deletClass(cla_id)
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