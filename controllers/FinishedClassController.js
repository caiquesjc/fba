const router = require("express").Router()
const FinishedClassModel = require("../database/FinishedClassModel")


router.post("/register", (req, res) => {
    try {
        const newClassFinished = req.body
        newClassFinished.fk_use_id = req.user.use_id
        FinishedClassModel.registerFinishedClass(newClassFinished)
        .then(response => {
            res.status(200).send(response);
          })
          .catch(error => {
            res.status(500).send(error);
          })
    } catch (error) {
        res.send({success: false, error: "an error occurred during processing"})
    }
  })

  router.post("/get", (req, res) => {
    try {
        const classFinished = req.body
        classFinished.fk_use_id = req.user.use_id
        FinishedClassModel.listFinishedClass(classFinished)
        .then(response => {
            res.status(200).send(response);
          })
          .catch(error => {
            res.status(500).send(error);
          })
    } catch (error) {
        res.send({success: false, error: "an error occurred during processing"})
    }
  })

  module.exports = router