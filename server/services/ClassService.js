const Repository = require("../database/Repository");
const Connection = require("../database/Connection");

module.exports = {
  registerClass: async function (newClass) {
    const RespositoryClass = await Repository.get(Repository.Class);
    const ClassRegistred = RespositoryClass.save(newClass);
    return ClassRegistred;
  },

  getAllClasses: async function () {
    const RespositoryClass = await Repository.get(Repository.Class);
    const Classes = await RespositoryClass.find();
    return Classes;
  },

  updateClass: async function (claId, newClass) {
    const RepositoryClass = await Repository.get(Repository.Class);
    RepositoryClass.update({ cla_id: claId }, newClass);
  },

  deleteClass: async function (claId) {
    const RespositoryClass = await Repository.get(Repository.Class);
    await RespositoryClass.delete({ cla_id: claId });
  },

  getClass: async function (claId) {
    const RespositoryClass = await Repository.get(Repository.Class);
    const Class = await RespositoryClass.find({ cla_id: claId });
    return Class;
  },

  getClassByCourse: async function (couId) {
    const RespositoryClass = await Repository.get(Repository.Class);
    const Classes = await RespositoryClass.find({
      order: { cla_name: "ASC" },
      fk_cou_id: couId,
    });
    return Classes;
  },
};
