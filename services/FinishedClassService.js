const Connection = require("../database/Connection");
const Repository = require("../database/Repository");

module.exports = {
  registerFinishedClass: async function (newFinishedClass) {
    const RespositoryFinishedClass = await Repository.get(
      Repository.FinishedClass
    );
    const FinishedClassRegistred =
      RespositoryFinishedClass.save(newFinishedClass);
    return FinishedClassRegistred;
  },

  deleteFinishedClass: async function (finId) {
    const RespositoryFinishedClass = await Repository.get(
      Repository.FinishedClass
    );
    await RespositoryFinishedClass.delete({ finished_id: finId });
  },

  getFinishedClass: async function (UsCo) {
    const Conn = await Connection;
    const FinishedClass = await Conn.query(
      `SELECT distinct finished_id, fk_cla_id, fk_cou_id, fk_use_id FROM finished_class where fk_cou_id=${UsCo.fk_cou_id} and fk_use_id=${UsCo.fk_use_id}`
    );
    return FinishedClass;
  },
};
