const router = require("express").Router();
const CourseService = require("../services/CourseService");
const { verifyAdmin } = require("../services/AuthService");

router.post("/register", async (req, res) => {
  try {
    const newCourse = req.body;
    await CourseService.registerCourse(newCourse);
    return res.send({ success: true });
  } catch (error) {
    return res.send({ success: false, error: error.detail });
  }
});

router.get("/list", async (req, res) => {
  try {
    const courses = await CourseService.getAllCourses();
    return res.send({ success: true, data: courses });
  } catch (error) {
    return res.send({ success: false, error: error.detail });
  }
});

router.put("/update", async(req, res) => {
  try {
    const newCourse = req.body;
    const couId = req.body.cou_id
    delete newCourse["cou_id"]
    await CourseService.updateCourse(couId, newCourse)
    return res.send({ success: true });
  } catch (error) {
    return res.send({ success: false, error: error.detail });
  }
});

router.delete("/delete", async(req, res) => {
  try {
    const couId = req.body.cou_id
    await CourseService.deleteCourse(couId)
    return res.send({ success: true });
  } catch (error) {
    return res.send({ success: false, error: error.detail });
  }
});

router.get("/get/:cou_id", async (req, res) => {
  try {
    const couId = req.params.cou_id
    const course = await CourseService.getCourse(couId);
    return res.send({ success: true, data: course });
  } catch (error) {
    return res.send({ success: false, error: error.detail });
  }
});

router.get("/my-courses-quantity", async(req, res) => {
  try {
    const useId = req.body.use_id
    const courses = await CourseService.getMyCoursesQuantity(useId);
    return res.send({ success: true, data: courses });
  } catch (error) {
    return res.send({ success: false, error: error.detail });
  }
});

router.post("/my-courses", async(req, res) => {
  try {
    const idCourses = req.body.idCourses
    const courses = await CourseService.getMyCourses(idCourses);
    return res.send({ success: true, data: courses });
  } catch (error) {
    return res.send({ success: false, error: error.detail });
  }
});

module.exports = router;
