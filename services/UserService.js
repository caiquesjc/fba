const Repository = require("../database/Repository");

module.exports = {

  registerUser: async function (newUser) {
    const RespositoryUser = await Repository.get(Repository.User);
    const userRegistred = RespositoryUser.save(newUser);
    return userRegistred;
  },

  getAllUsers: async function () {
    const RespositoryUser = await Repository.get(Repository.User)
    const users = await RespositoryUser.find()
    return users
  },

  updateUser: async function (useId, newUSer) {
    const RepositoryUser = await Repository.get(Repository.User);
    await RepositoryUser.update({ use_id: useId }, newUSer);
  },

  deleteUser: async function (useId) {
    const RespositoryUser = await Repository.get(Repository.User);
    await RespositoryUser.delete({ use_id: useId });
  },

  getUser: async function (useId) {
    const RespositoryUser = await Repository.get(Repository.User);
    const user = await RespositoryUser.find({ use_id: useId });
    return user;
  },

  getUserByEmail: async function (useEmail) {
    const RespositoryUser = await Repository.get(Repository.User);
    const user = await RespositoryUser.find({ use_email: useEmail });
    return user;
  }
};
