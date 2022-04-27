const Repository = require("../database/Repository");
const Connection = require("../database/Connection");

module.exports = {
  registerCourse: async function (newCourse) {
    const RespositoryCourse = await Repository.get(Repository.Course);
    const CourseRegistred = RespositoryCourse.save(newCourse);
    return CourseRegistred;
  },

  getAllCourses: async function () {
    const RespositoryCourse = await Repository.get(Repository.Course);
    const Courses = await RespositoryCourse.find();
    return Courses;
  },

  updateCourse: async function (couId, newCourse) {
    const RepositoryCourse = await Repository.get(Repository.Course);
    RepositoryCourse.update({ cou_id: couId }, newCourse);
  },

  deleteCourse: async function (couId) {
    const RespositoryCourse = await Repository.get(Repository.Course);
    await RespositoryCourse.delete({ cou_id: couId });
  },

  getCourse: async function (couId) {
    const RespositoryCourse = await Repository.get(Repository.Course);
    const Course = await RespositoryCourse.find({ cou_id: couId });
    return Course;
  },

  getMyCoursesQuantity: async function (useId) {
    const conn = await Connection;
    const myCourses = await conn.query(
      `select distinct fk_cou_id from finished_class where fk_use_id = ${useId}`
    );
    return myCourses;
  },

  getMyCourses: async function (idCourses) {
    const conn = await Connection;
    const myCourses = await conn.query(
      `select * from course c where c.cou_id in ${idCourses}`
    );
    return myCourses;
  },
};
