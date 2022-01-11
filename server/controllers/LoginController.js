const router = require("express").Router();
const Connection = require("../database/Connection");
const AuthService = require("../services/AuthService");
const UserService = require("../services/UserService")

router.post("/", async (req, res) => {
  try {
    const conn = await Connection
    const { use_email, use_password } = req.body;

    const validate = (await conn.query("select check_password($1, $2)", [use_email,use_password]))[0].check_password


    if (!validate)
      return res.status(200).send({ success: false, error: "incorrect username or password" })

    const use_id = (await conn.query("select get_user_id_by_email($1)", [use_email]))[0].get_user_id_by_email
    const user = (await UserService.getUser(use_id))[0]

    return res.status(200).send({ success: true, user, token: AuthService.generateToken(user, res) })

  } catch (error) {
    return res.status(500).send({success: false, error: "an error occurred while processing the request", erro: error})
  }
});


router.post("/admin", async (req, res) => {
  try {
    const conn = await Connection
    const { use_email, use_password } = req.body;

    const validate = (await conn.query("select check_password($1, $2)", [use_email,use_password]))[0].check_password
    console.log(validate)
    if (!validate)
      return res.status(200).send({ success: false, error: "incorrect username or password" })

    const use_id = (await conn.query("select get_user_id_by_email($1)", [use_email]))[0].get_user_id_by_email

    const user = (await UserService.getUser(use_id))[0]
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


