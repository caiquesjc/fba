const router = require("express").Router();
const FinishedClassModel = require("../database/FinishedClassModel");
const FinishedClassService = require("../services/FinishedClassService");

router.post("/register", async (req, res) => {
  try {
    const newClassFinished = req.body;
    newClassFinished.fk_use_id = req.user.use_id;
    await FinishedClassService.registerFinishedClass(newClassFinished);
    return res.send({ success: true });
  } catch (error) {
    console.log(error);
    return res.send({ success: false, error: error.detail });
  }
});

router.post("/get", async (req, res) => {
  try {
    const classFinished = req.body;
    classFinished.fk_use_id = req.user.use_id;
    const finished = await FinishedClassService.getFinishedClass(classFinished);
    return res.send({ success: true, finished });
  } catch (error) {
    return res.send({ success: false, error: error.detail });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const finId = req.body.finId;
    await FinishedClassService.deleteFinishedClass(finId);
    return res.send({ success: true });
  } catch (error) {
    return res.send({ success: false, error: error.detail });
  }
});

module.exports = router;
