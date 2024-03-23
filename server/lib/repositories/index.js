const db = require("../../models");
// import { Models } from '../../models'

/**
 * @param {modelName} modelName
 * @param {args} args
 * @param {transaction} t
 * @returns Boolean
 */
const create = async (modelName, args, t) => {
  try {
    if (t == null) {
      t = await db.sequelize.transaction();
    }
    const result = await modelName
      .create(args, { transaction: t })
      .catch((e) => {});
    return result;
  } catch (err) {
    console.log(err);
  }
};

/**
 * @param {modelName} modelName
 * @param {args} args
 * @param {transaction} t
 * @returns Boolean
 */
const bulk_create = async (modelName, args, t) => {
  try {
    if (t == null) {
      t = await db.sequelize.transaction();
    }
    const result = await modelName
      .bulkCreate(args, { transaction: t })
      .catch((e) => {});
    return result;
  } catch (err) {
    console.log(err);
  }
};

const update = async (modelName, args, whereContent, t) => {
  try {
    const data = await modelName.update(
      args,
      { where: whereContent },
      { transaction: t }
    );
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const destroy = async (modelName, whereContent, t) => {
  try {
    const data = await modelName.destroy(
      {
        where: whereContent,
        truncate: { cascade: true },
      },
      { transaction: t }
    );
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = { create, bulk_create, update, destroy };
