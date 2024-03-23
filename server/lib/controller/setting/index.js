const db = require("../../../models");
const { defaultValue } = require("../../../services/defaultValue");
const service = require("undefined-service-api");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

const fetchuserProfile = async (req, res) => {
  console.log("req.user", req.body);
  console.log("req.user", req.user);
  try {
    const profileData = await db.Profiles.findAll({
      where: {
        is_deleted: false,
      },
      attributes: {
        exclude: ["super_img", "picture"],
      },
      include: [
        {
          model: db.Users,
          required: false,
        },
        {
          model: db.Departments,
          required: false,
        },
        {
          model: db.Positions,
          required: false,
        },
        {
          model: db.Groups,
          required: false,
        },
      ],
    });

    console.log("Profile is", profileData);
    res.json(defaultValue(true, profileData, ""));
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, null, "Error retrieving profile"));
  }
};

module.exports = {
  fetchuserProfile,
};
