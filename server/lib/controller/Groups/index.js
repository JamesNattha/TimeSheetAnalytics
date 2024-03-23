const db = require("../../../models");
const { defaultValue } = require("../../../services/defaultValue");

const getGroup = async (req, res) => {
  try {
    const RoleTable = await db.Groups.findAll({
      where: {
        is_deleted: false,
      },
    });
    console.log(RoleTable);
    res.json(defaultValue(true, RoleTable, ""));
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, null, "Error retrieving Role data"));
  }
};
module.exports = {
  getGroup,
};

//Updated
