const db = require("../../../models");
const { defaultValue } = require("../../../services/defaultValue");
const moment = require("moment");

const getAllwork = async (req, res) => {
    const dataTimeSheet = await db.tbTimeSheetHD.findAll({
      include: [
        {
          model: db.tbTimeSheetDT,
          required: false,
        },
      ],
      // order: [["tbUsers", "startTime", "ASC"]],
    });
    res.json(defaultValue(true, dataTimeSheet, ""));
  
  };

  const getAllUsers = async (req, res) => {
    const dataTimeSheet = await db.tbUser.findAll({
      include: [
        {
          model: db.tbTimeSheetHD,
          required: false,
          include: [
            {
              model:db.tbTimeSheetDT,
              required: false
            }
          ]
        },
      ],
      // order: [["tbUsers", "startTime", "ASC"]],
    });
    res.json(defaultValue(true, dataTimeSheet, ""));
  
  };

  const deleteWork = async (req, res) => {
    let t = await db.sequelize.transaction();
    if (req.body.timeSheetDtId) {
      const deleteDt = await destroy(
        db.tbTimeSheetDT,
        { timeSheetDtId: req.body.timeSheetDtId },
        t
      );
    }
    // const dataTimeSheet = await db.tbTimeSheetHD.findAll({
    //   where: {
    //     userId: req.user.userId,
    //     timeSheetDate: moment(req.body.timeSheetDate).format("YYYY/MM/DD"),
    //   },
    //   include: [
    //     {
    //       model: db.tbTimeSheetDT,
    //       required: false,
    //     },
    //   ],
    // });
    t.commit();
    res.json(defaultValue(true, null, ""));
  };

  module.exports = {
    getAllwork,
    getAllUsers,
    deleteWork
  
  };