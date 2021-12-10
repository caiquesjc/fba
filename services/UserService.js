const Repository = require("../database/Repository");

module.exports = {

  getAllUsers: async function () {
    const RespositoryUser = await Repository.get(Repository.User)
    const users = await RespositoryUser.find()
    return users
  },

  registerUser: async function (newUser) {
    const RespositoryUser = await Repository.get(Repository.User);
    const userRegistred = RespositoryUser.save(newUser);
    return userRegistred;
  },

  updateUser: async function (newUSer) {
    const RepositoryUser = await Repository.get(Repository.User);
    RepositoryUser.update({ use_id: newUSer.use_id }, newUSer);
  },

  deleteUser: async function (useId) {
    const RespositoryUser = await Repository.get(Repository.User);
    await RespositoryUser.delete({ use_id: useId });
  },

  getUser: async function (useId) {
    const RespositoryUser = await Repository.get(Repository.User);
    const user = await RespositoryUser.find({ where: [{use_email: useId }, { use_id: useId }] });
    return user;
  }
};
