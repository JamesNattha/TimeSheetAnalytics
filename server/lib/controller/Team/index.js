const db = require("../../../models");
const { defaultValue } = require("../../../services/defaultValue");
const service = require("undefined-service-api");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const fetchDepartmentTeam = async (req, res) => {
  try {
    const departmentData = await db.Departments.findAll({
      include: [
        {
          model: db.Profiles,
          required: false,
          include: [
            {
              model: db.Users,
              required: false,
            },
          ],
        },
      ],
    });

    console.log("Profile is", departmentData);
    res.json(defaultValue(true, departmentData, ""));
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, null, "Error retrieving profile"));
  }
};

const fetchGroupTeam = async (req, res) => {
  try {
    const tbGroupData = await db.tbGroup.findAll({
      include: [
        {
          model: db.tbProfile,
          required: false,
          include: [
            {
              model: db.tbUser,
              required: false,
            },
          ],
        },
      ],
    });

    console.log("Profile is", tbGroupData);
    res.json(defaultValue(true, tbGroupData, ""));
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, null, "Error retrieving profile"));
  }
};

const createTeamProject = async (req, res) => {
  const group = req.body.group;
  console.log("req.body", req.body);
  let t;
  try {
    if (group === undefined) {
      const valuesToCreate = req.body.userDev.flatMap((item) => ({
        userId: item,
        projectId: req.body.project,
        leader: false,
      }));
      const valuesToLeaderCreate = req.body.leader.flatMap((item) => ({
        userId: item,
        projectId: req.body.project,
        leader: true,
      }));
      try {
        const check = await db.tbTeamProject.findAll({
          where: {
            [Op.or]: valuesToCreate || valuesToLeaderCreate,
          },
        });
        if (check.length > 0) {
          console.error("Duplicates found:", check);
          res.json(defaultValue(false, null, "Duplicates found"));
        } else {
          console.log("valuesToCreate", valuesToCreate);
          // Begin the transaction
          t = await db.sequelize.transaction();
          const response = await db.tbTeamProject.bulkCreate(valuesToCreate, {
            transaction: t,
          });
          const responseLead = await db.tbTeamProject.bulkCreate(valuesToLeaderCreate, {
            transaction: t,
          });
          console.log("Transaction:", t);
          await t.commit();
          console.log("Records created undefined:", response,);
          console.log("responseLead created undefined:", responseLead,);
          res.json(defaultValue(true, (response,responseLead), ""));
        }
      } catch (error) {
        console.error(error);
        // Rollback the transaction in case of error
        await t.rollback();
        res.json(defaultValue(false, null, "Error retrieving profile"));
      }
    } else {
      const profileRecords = await db.tbProfile.findAll({
        where: {
          group_Id: group,
          invite: true,
        },
      });

      console.log("profileRecords", profileRecords);
      if (profileRecords.length === 0) {
        return res.json(defaultValue(false, null, "No data in group"));
      }

      const userIds = profileRecords.map((profile) => profile.userId);
      const valuesToCreate = userIds.map((userId) => ({
        userId,
        projectId: req.body.project,
      }));

      console.log("valuesToCreate", valuesToCreate);
      const check = await db.tbTeamProject.findAll({
        where: {
          [Op.or]: valuesToCreate,
        },
      });

      try {
        t = await db.sequelize.transaction();
        if (check.length > 0) {
          console.error("Duplicates found:", check);
          res.json(defaultValue(false, null, "Duplicates found"));
        } else {
          const response = await db.tbTeamProject.bulkCreate(valuesToCreate, {
            transaction: t,
          });

          console.log("Transaction:", t);
          await t.commit();
          console.log("Records created:", response);
          res.json(defaultValue(true, response, ""));
        }
      } catch (error) {
        console.error(error);
        // Rollback the transaction in case of error
        await t.rollback();
        res.json(defaultValue(false, null, "Error retrieving profile"));
      }
    }
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, null, "Error retrieving profile"));
  }
};

const fetchDataProject = async (req, res) => {
  try {
    const projectTable = await db.tbProject.findAll({
      include: [{ model: db.tbTeamProject, required: false }],
    });
    console.log(projectTable);
    res.json(defaultValue(true, projectTable, ""));
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, null, "Error retrieving workNo data"));
  }
};

const fetchTeamProject = async (req, res) => {
  try {
    const projectTable = await db.tbTeamProject.findAll({
    });
    console.log(projectTable);
    res.json(defaultValue(true, projectTable, ""));
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, null, "Error retrieving workNo data"));
  }
};

module.exports = {
  fetchDepartmentTeam,
  fetchGroupTeam,
  createTeamProject,
  fetchDataProject,
  fetchTeamProject
};
