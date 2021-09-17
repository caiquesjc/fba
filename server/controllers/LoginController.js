const router = require("express").Router();
const Connection = require("../database/Conenction");
const AuthService = require("../services/AuthService");
const UserModel = require("../database/UserModel");

router.post("/", async (req, res) => {
  try {
    const { use_email, use_password } = req.body;

    const validate = (
      await Connection.query("select check_password($1, $2)", [
        use_email,
        use_password,
      ])
    ).rows[0].check_password;

    if (!validate)
      return res
        .status(200)
        .send({ success: false, error: "incorrect username or password" });

    const usu_id = (
      await Connection.query("select get_user_id_by_email($1)", [use_email])
    ).rows[0];
    const user = await UserModel.getStudent(usu_id);
    AuthService.generateToken(user, res);
    return res.status(200).send({ success: true, user });
  } catch (error) {
    return res
      .status(500)
      .send({
        success: false,
        error: "an error occurred while processing the request",
      });
  }
});

module.exports = router;
