const router = require("express").Router();
const Connection = require("../database/Connection");
const AuthService = require("../services/AuthService");
const UserModel = require("../database/UserModel");

router.post("/", async (req, res) => {
  try {
    const { use_email, use_password } = req.body;

    const validate = (await Connection.query("select check_password($1, $2)", [use_email,use_password,])).rows[0].check_password

    if (!validate)
      return res.status(200).send({ success: false, error: "incorrect username or password" })

    const use_id = (await Connection.query("select get_user_id_by_email($1)", [use_email])).rows[0].get_user_id_by_email
    const user = (await UserModel.getUser(use_id))

    return res.status(200).send({ success: true, user, token: AuthService.generateToken(user, res) })

  } catch (error) {
    return res.status(500).send({success: false, error: "an error occurred while processing the request", erro: error})
  }
});


router.post("/admin", async (req, res) => {
  try {
    const { use_email, use_password } = req.body;

    const validate = (await Connection.query("select check_password($1, $2)", [use_email,use_password,])).rows[0].check_password

    if (!validate)
      return res.status(200).send({ success: false, error: "incorrect username or password" })

    const use_id = (await Connection.query("select get_user_id_by_email($1)", [use_email])).rows[0].get_user_id_by_email
    const user = (await UserModel.getUser(use_id))
    if (!user.use_is_admin){
      return res.status(500).send({success: false, error: "unauthorized"})
    }
    else {
      return res.status(200).send({ success: true, user, token: AuthService.generateToken(user, res) })
    }

  } catch (error) {
    return res.status(500).send({success: false, error: "an error occurred while processing the request", erro: error})
  }
});

module.exports = router;


