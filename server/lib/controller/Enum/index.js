const { Op } = require("sequelize");
const db = require("../../../models");
const { defaultValue } = require("../../../services/defaultValue");

const getEnum = async (req, res) => {
  console.log("req", req.body);
  try {
    const EnumTable = await db.Enum_table.findAll({
      where: {
        is_deleted: false,
        enum_type: "WorkType",
      },
    });
    console.log(EnumTable);
    res.json(defaultValue(true, EnumTable, ""));
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, null, "Error retrieving Enum Table"));
  }
};

const getEnumLevel = async (req, res) => {
  console.log("req", req.body);
  try {
    const EnumLevel = await db.Enum_table.findAll({
      attributes: [
        "enum_id",
        "name_eng",
      ],
      where: {
        is_deleted: false,
        enum_type: "Level",
      },
    });
    console.log(EnumLevel);
    res.json(defaultValue(true, EnumLevel, ""));
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, null, "Error retrieving Enum Table"));
  }
};

const getEnumGender = async (req, res) => {
  console.log("req", req.body);
  try {
    const EnumLevel = await db.Enum_table.findAll({

      where: {
        is_deleted: false,
        enum_type: "Gender",
      },
    });
    console.log(EnumLevel);
    res.json(defaultValue(true, EnumLevel, ""));
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, null, "Error retrieving Enum Table"));
  }
};

const getEnumCalendar = async (req, res) => {
  console.log("req", req.body);
  try {
    const EnumLevel = await db.Enum_table.findAll({
      where: {
        is_deleted: false,
        enum_type: "CalendarType",
      },
    });
    console.log(EnumLevel);
    res.json(defaultValue(true, EnumLevel, ""));
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, null, "Error retrieving Enum Table"));
  }
};

module.exports = {
  getEnum,
  getEnumLevel,
  getEnumGender,
  getEnumCalendar
};
