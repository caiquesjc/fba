const router = require("express").Router();
const UserModel = require("../database/UserModel");
const {verifyAdmin} = require("../services/AuthService")

router.post("/register", verifyAdmin, (req, res) => {
    try {
        const newUser = req.body
        UserModel.registerUser(newUser)
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

router.get("/list", verifyAdmin, (req, res) => {
  try {
    UserModel.listUser()
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

router.put("/update", verifyAdmin, (req, res) => {
  try {
    const user = req.body
    UserModel.updateUser(user)
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
    const use_id = req.body.use_id
    UserModel.deletUser(use_id)
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

router.get("/get", (req, res) => {
  const use_id = req.body.use_id
    UserModel.getUser(use_id)
    .then(response => {
        res.status(200).send(response);
      })
      .catch(error => {
        res.status(500).send(error);
      })
})

router.get("/get-by-email", (req, res) => {
  const use_email = req.body.use_email
    UserModel.getUser(use_email)
    .then(response => {
        res.status(200).send(response);
      })
      .catch(error => {
        res.status(500).send(error);
      })
})

module.exports = router