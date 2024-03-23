const db = require("../../../models");
const { defaultValue } = require("../../../services/defaultValue");
const service = require("undefined-service-api");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

const createRole = async (req, res) => {
  console.log("Request body:", req.body);
  let t;
  try {
    t = await db.sequelize.transaction();

    const valuesToCreate = req.body.tbUserRoles.map((item) => ({
      userId: item.userId,
      roleId: item.roleId,
    }));

    console.log("Values to create:", valuesToCreate);

    if (valuesToCreate.length === 0) {
      throw new Error("Invalid request body. Expected an array.");
    }

    const createdRecords = await db.tbUserRole.bulkCreate(valuesToCreate, {
      transaction: t,
    });

    console.log("Transaction:", t);
    await t.commit();
    console.log("Records created:", createdRecords);

    res.json(defaultValue(true, createdRecords, ""));
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }
    console.error(error);
    res.json(defaultValue(false, null, error.message));
  }
};

// const createRole = async (req, res) => {
//   let t;
//   try {
//     t = await db.sequelize.transaction();
//     const valuesToCreate = req.body.map((item) => ({
//       name: item.name,
//       powerofRole: item.detail,
//     }));

//     const createdRecords = await db.tbRole.bulkCreate(valuesToCreate, {
//       transaction: t,
//     });
//     console.log(createdRecords);
//     await t.commit();
//     res.json(defaultValue(true, createdRecords, ""));
//   } catch (error) {
//     if (t && !t.finished) {
//       await t.rollback();
//     }
//     console.error(error);
//     res.json(defaultValue(false, null, error.message));
//   }
// };

const getRole = async (req, res) => {
  try {
    const RoleTable = await db.tbRole.findAll();
    console.log(RoleTable);
    res.json(defaultValue(true, RoleTable, ""));
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, null, "Error retrieving Role data"));
  }
};

const getUserRole = async (req, res) => {
  try {
    const RoleTable = await db.tbUser.findAll({
      // where: {
      //   // userId: { [db.Sequelize.Op.ne]: req.user.userId },
      //   // userId: req.user.userId ,
      //   isDeleted: false,
      // },
      include: [
        {
          model: db.tbUserRole,
          required: false,
          include: [
            {
              model: db.tbRole,
              required: false,
            },
          ],
        },
      ],
    });
    console.log(RoleTable);
    res.json(defaultValue(true, RoleTable, ""));
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, null, "Error retrieving Role data"));
  }
};

const getMyRole = async (req, res) => {
  try {
    const RoleTable = await db.tbUser.findAll({
      where: {
        userId: req.user.userId,
        isDeleted: false,
      },
      include: [
        {
          model: db.tbUserRole,
          required: false,
          include: [
            {
              model: db.tbRole,
              required: false,
            },
          ],
        },
      ],
    });
    console.log(RoleTable);
    res.json(defaultValue(true, RoleTable, ""));
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, null, "Error retrieving Role data"));
  }
};

const updateRole = async (req, res) => {
  let t;
  try {
    t = await db.sequelize.transaction();

    const valuesToUpdate = req.body.tbUserRoles.map((item) => ({
      userId: item.userId,
      roleId: item.roleId,
    }));

    console.log("Values to update:", valuesToUpdate);

    const updatedRecords = await Promise.all(
      valuesToUpdate.map(async (value) => {
        const updatedRecord = await db.tbUserRole.update(
          { roleId: value.roleId },
          {
            where: { userId: value.userId },
            transaction: t,
          }
        );
        return updatedRecord;
      })
    );

    console.log(updatedRecords);
    await t.commit();
    res.json(defaultValue(true, updatedRecords, ""));
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }
    console.error(error);
    res.json(defaultValue(false, null, error.message));
  }
};

module.exports = {
  createRole,
  getRole,
  getUserRole,
  updateRole,
  getMyRole,
};
