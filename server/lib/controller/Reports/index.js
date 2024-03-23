const db = require("../../../models");
const { defaultValue } = require("../../../services/defaultValue");
const moment = require("moment");

const fetchProjectposition = async (req, res) => {
  try {
    const dataTimeSheet = await db.Projects.findAll({
      where: {
        is_deleted: false,
      },
      include: [
        {
          model: db.Works,
          required: false,
          where: {
            work_status: "success",
          },
          include: [
            {
              model: db.TimeSheetDTs,
              is_deleted: false,
              required: false,
            },
          ],
        },
      ],
      // order: [["tbUsers", "startTime", "ASC"]],
    });
    res.json(defaultValue(true, dataTimeSheet, ""));
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, error, "Error retrieving Role data"));
  }
};

const fetchMondayReport = async (req, res) => {
  const dataTimeSheet = await db.Monday_header.findAll({
    where: {
      is_deleted: false,
    },
    include: [
      {
        model: db.Mondays,
        // required: false,
        where: {
          is_deleted: false,
        },
      },
    ],
    // order: [["tbUsers", "startTime", "ASC"]],
  });
  res.json(defaultValue(true, dataTimeSheet, ""));
};

const fetchUserforProject = async (req, res) => {
  try {
    const profile = await db.Users.findAll({
      where: { is_deleted: false, is_active: true },
      include: [
        {
          model: db.Profiles,
          attributes: ["position_id"],
        },
      ],
    });

    console.log(profile);
    if (profile) {
      res.json(defaultValue(true, profile, "Level updated successfully"));
    } else {
      res.json(defaultValue(false, null, "No matching profile found"));
    }
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, null, "Error retrieving Role data"));
  }
};

const fetchUserPosition = async (req, res) => {
  try {
    const position = await db.Positions.findAll({
      where: { is_deleted: false, is_active: true },
      attributes: ["position_id", "position_name"],
    });

    console.log(position);
    if (position) {
      res.json(defaultValue(true, position, "Level updated successfully"));
    } else {
      res.json(defaultValue(false, null, "No matching position found"));
    }
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, null, "Error retrieving position data"));
  }
};

const fetchTimesheets = async (req, res) => {
  try {
    const profile = await db.TimeSheetDTs.findAll({
      where: { is_deleted: false },
    });

    console.log(profile);
    if (profile) {
      res.json(defaultValue(true, profile, "Level updated successfully"));
    } else {
      res.json(defaultValue(false, null, "No matching profile found"));
    }
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, null, "Error retrieving Role data"));
  }
};

const fetchProjectNotposition = async (req, res) => {
  const dataTimeSheet = await db.Projects.findAll({
    where: {
      is_deleted: false,
    },
    include: [
      {
        model: db.Works,
        required: false,
        include: [
          {
            model: db.TimeSheetDTs,
            is_deleted: false,
            required: false,
          },
        ],
      },
    ],
    // order: [["tbUsers", "startTime", "ASC"]],
  });
  res.json(defaultValue(true, dataTimeSheet, ""));
};

///////////////////////====================================================Manager Report==============================================///////////////////////////
const fetchProjectByGroup = async (req, res) => {
  const dataTimeSheet = await db.Projects.findAll({
    where: {
      is_deleted: false,
      group_id: req.user.group,
    },
    include: [
      {
        model: db.Works,
        required: false,
        include: [
          {
            model: db.TimeSheetDTs,
            is_deleted: false,
            required: false,
          },
        ],
      },
    ],
  });
  res.json(defaultValue(true, dataTimeSheet, ""));
};

const fetchUserByGroup = async (req, res) => {
  const findUserGroup = await db.Profiles.findAll({
    where: { is_deleted: false, is_active: true, group_id: req.user.group },
    attributes: {
      exclude: ["super_img", "picture"],
    },
    include: [
      {
        model: db.Users,
        is_deleted: false,
      },
    ],
  });
  res.json(defaultValue(true, findUserGroup, ""));
};

module.exports = {
  fetchProjectposition,
  fetchUserforProject,
  fetchTimesheets,
  fetchProjectByGroup,
  fetchUserByGroup,
  fetchMondayReport,
  fetchUserPosition,
};
