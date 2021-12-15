const router = require("express").Router();
const ClassModel = require("../database/ClassModel");
const ClassService = require("../services/ClassService");
const { verifyAdmin } = require("../services/AuthService");

router.post("/register", async (req, res) => {
  try {
    const newClass = req.body;
    await ClassService.registerClass(newClass);
    return res.send({ success: true });
  } catch (error) {
    return res.send({ success: false, error: error.detail });
  }
});

router.get("/list", async (req, res) => {
  try {
    const classes = await ClassService.getAllClasses();
    return res.send({ success: true, classes });
  } catch (error) {
    return res.send({ success: false, error: error.detail });
  }
});

router.put("/update", async (req, res) => {
  try {
    const newClass = req.body;
    const claId = newClass.cla_id;
    delete newClass["cla_id"];
    await ClassService.updateClass(claId, newClass);
    return res.send({ success: true });
  } catch (error) {
    return res.send({ success: false, error: error.detail });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const claId = req.body.claId;
    await ClassService.deleteClass(claId);
    return res.send({ success: true });
  } catch (error) {
    return res.send({ success: false, error: error.detail });
  }
});

router.get("/get/:claId", async(req, res) => {
  try {
    const claId = req.params.claId;
    const Class = await ClassService.getClass(claId)
    return res.send({ success: true, class: Class });
  } catch (error) {
    return res.send({ success: false, error: error.detail });
  }
});

router.get("/class-by-course/:couId", async(req, res) => {
  try {
    const couID = req.params.couId;
    const classes = await ClassService.getClassByCourse(couID)
    return res.send({ success: true, classes });
  } catch (error) {
    return res.send({ success: false, error: error.detail });
  }
});

module.exports = router;
