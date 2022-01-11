const router = require("express").Router();
const { verifyAdmin } = require("../services/AuthService");
const UserService = require("../services/UserService");

router.post("/register", async (req, res) => {
  try {
    const newUser = req.body;
    await UserService.registerUser(newUser);

    return res.send({ success: true });
  } catch (error) {
    return res.send({ success: false, error: error.detail });
  }
});

router.get("/list", async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    return res.send({ success: true, data: users });
  } catch (error) {
    return res.send({ success: false, error: error.detail });
  }
});

router.put("/update", async (req, res) => {
  try {
    const newUser = req.body;
    const useId = req.body.use_id;
    delete newUser["use_id"];
    await UserService.updateUser(useId, newUser);
    return res.send({ success: true });
  } catch (error) {
    return res.send({
      success: false,
      error: error.detail,
    });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const useId = req.body.use_id;
    await UserService.deleteUser(useId);
    return res.send({ success: true });
  } catch (error) {
    return res.send({
      success: false,
      error: error.detail,
    });
  }
});

router.get("/get", async (req, res) => {
  try {
    const useId = req.body.use_id;
    const user = await UserService.getUser(useId);
    return res.send({ success: true, user: user });
  } catch (error) {
    return res.send({
      success: false,
      error: error.detail,
    });
  }
});

router.get("/get-by-email", async (req, res) => {
  try {
    const use_email = req.body.use_email;
    const user = await UserService.getUserByEmail(use_email);
    return res.send({ success: true, user: user });
  } catch (error) {
    return res.send({
      success: false,
      error: error.detail,
    });
  }
});

module.exports = router;
