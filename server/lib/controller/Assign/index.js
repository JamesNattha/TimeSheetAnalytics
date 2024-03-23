const db = require('../../../models');
const { create, bulk_create, destroy, update } = require("../../repositories");
const { defaultValue } = require('../../../services/defaultValue');
const service = require("undefined-service-api");
const moment = require("moment");

const updatedSendto = async (req, res) => {
  let t;
  try {
    t = await db.sequelize.transaction();
    // console.log(req.body)
    const updateValues = req.body.map((item) => ({
      worknoId: item.worknoId, // Assuming worknoId is the primary key
      sendTo: item.sendTo,
      createBy: item.createBy
    }));
    console.log(updateValues)

    const updateRec = await Promise.all(
      updateValues.map((item) =>
        db.tbWorkNo.update(item, {
          where: { worknoId: item.worknoId },
          transaction: t,
        })
      )
    );

    await t.commit();
    res.json(defaultValue(true, updateRec, req.body)); // Return the updated records
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }
    console.error(error);
    res.json(defaultValue(false, null, error.message));
  }
};


module.exports = {updatedSendto};