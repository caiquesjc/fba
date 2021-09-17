const router = require("express").Router();
const UserModel = require("../database/UserModel");

router.post("/register", (req, res) => {
    try {
        const newUser = req.body
        console.log(newUser)
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

router.get("/getuser", (req, res) => {
    UserModel.getUser(req.body.use_id)
    .then(response => {
        res.status(200).send(response);
      })
      .catch(error => {
        res.status(500).send(error);
      })
})

module.exports = router