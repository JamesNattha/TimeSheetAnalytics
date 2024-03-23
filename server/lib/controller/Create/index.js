const db = require("../../../models");
const { defaultValue } = require("../../../services/defaultValue");
const service = require("undefined-service-api");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const { v4: UUIDV4 } = require("uuid");
const nodemailer = require("nodemailer");
require("dotenv").config();
const crypto = require("crypto");
const express = require("express");
const app = express();
const { GOOGLE_USER, GOOGLE_PASSWORD, DOMAIN } = require("../config");
const moment = require("moment");
const ejs = require("ejs");

const created = async (req, res) => {
  console.log("Request body:", req.body);
  let t;
  try {
    function generateVerificationToken() {
      const token = crypto.randomBytes(20).toString("hex");
      return token;
    }

    const verificationToken = generateVerificationToken();
    t = await db.sequelize.transaction();

    const existingUser = await db.Users.findOne({
      where: {
        username: req.body.username,
        is_deleted: false,
      },
    });

    if (existingUser) {
      return res.json(
        defaultValue(
          false,
          null,
          "User with the provided email already exists."
        )
      );
    }

    const createdUser = await db.Users.create(
      {
        username: req.body.username,
        starting_working_date: req.body.startWorkingDate,
        created_by: req.user.user_id,
        updated_by: req.user.user_id,
        is_active: false,
        is_deleted: false,
      },
      {
        transaction: t,
      }
    );

    console.log("ValueUser created:", createdUser);

    let createsProfile;
    dataUser = {
      role: req.body.role,
      department_id: req.body.department,
      group_id: req.body.group,
      level: req.body.level,
      user_id: createdUser.user_id,
      position_id: req.body.position,
      user_id: createdUser.user_id,
      token: verificationToken,
      invite: req.body.invite,
      created_by: req.user.user_id,
      updated_by: req.user.user_id,
      is_active: false,
      is_deleted: false,
    };

    createsProfile = await db.Profiles.create(dataUser, {
      transaction: t,
    });

    console.log("ValueProfile created:", createsProfile);

    console.log("Transaction:", t);
    await t.commit();
    console.log("Records created:", createsProfile);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      // service: "Gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    ejs.renderFile(
      __dirname + "/../template/emailTemplate.ejs",
      {
        name: `${req.body.username}`,
        confirm_link: `${DOMAIN}/register/${verificationToken}`,
      },
      (err, emailHTML) => {
        if (err) {
          console.error("Error rendering EJS template:", err);
          return;
        }

        // Email options
        const mailOptions = {
          from: process.env.SMTP_FROM,
          to: req.body.username,
          subject: "Register on Undefined Timesheets",
          html: emailHTML,
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
          } else {
            console.log("Email sent:", info.response);
          }
        });
      }
    );

    res.json(defaultValue(true, createsProfile, ""));
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }
    console.error(error);
    res.json(defaultValue(false, null, error.message));
  }
};

const getDepartment = async (req, res) => {
  try {
    const RoleTable = await db.Departments.findAll({
      where: {
        is_deleted: false,
      },
      include: [
        {
          model: db.Profiles,
          required: false,
          where: {
            is_deleted: false,
          },
          include: [
            {
              model: db.Users,
              required: false,
            },
          ],
        },
        {
          model: db.Positions,
          required: false,
          where: {
            is_deleted: false,
          },
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



const parseData = (data) => {
  if (data) {
    const _data = JSON.parse(JSON.stringify(data));
    data = _data;
  }
  return data;
};

// const getDepartment = async (req, res) => {
//   try {
//     let RoleTable = await db.Departments.findAll({
//       where: {
//         is_deleted: false,
//       },
//       include: [
//         {
//           model: db.Profiles,
//           required: false,
//           where: {
//             invite: true,
//           },
//           include: [
//             {
//               model: db.Users,
//               required: false,
//               where: {
//                 is_deleted: false,
//               },
//             },
//           ],
//         },
//         {
//           model: db.Positions,
//           required: false,
//         },
//       ],
//     });

//     let groupedData = [];
//     let counter = 0;
//     if (RoleTable && RoleTable.length > 0) {
//       RoleTable = parseData(RoleTable);
//       RoleTable.forEach((item) => {
//         let userData = [];

//         if (item.Profiles && item.Profiles.length > 0) {
//           item.Profiles.forEach((profile) => {
//             const userProfile = {
//               role: profile.role,
//               username: profile.User.username,
//               nickname: profile.User.nick_name,
//               user_firstname: profile.User.first_name,
//               user_lastname: profile.User.last_name,
//               startworkdate: moment(profile.User.start_working_date).format(
//                 "DD-MM-YYYY"
//               ),
//               created_date: profile.User.created_date,
//               is_active: profile.User.is_active,
//               is_deleted: profile.User.is_deleted,
//             };
//             userData.push(userProfile); // Push userProfile into userData array
//           });
//         }

//         const departmentData = {
//           department_code: item.department_code,
//           department_name: item.department_name,
//           created_date: item.created_date,
//           user: userData, // Initialize "user" property as an array with the userData
//         };
//         groupedData.push(departmentData);
//       });
//     }
//     console.log("Grouped data:", groupedData);
//     // console.log("", result);

//     // console.log("DataSubProject", RoleTable);
//     res.json(defaultValue(true, groupedData, ""));
//   } catch (error) {
//     console.error(error);
//     res.json(defaultValue(false, null, "Error retrieving Role data"));
//   }
// };

// const getDepartmentWhere = async (req, res) => {
//   try {
//     const RoleTable = await db.Departments.findAll({
//       where: {
//         department_id: req.body.department_id,
//       },
//     });
//     console.log(RoleTable);
//     res.json(defaultValue(true, RoleTable, ""));
//   } catch (error) {
//     console.error(error);
//     res.json(defaultValue(false, null, "Error retrieving Role data"));
//   }
// };

// const getGroupWhere = async (req, res) => {
//   try {
//     const Group = await db.Groups.findAll({
//       where: {
//         department_id: req.body.department_id,
//       },
//     });
//     console.log(RoleTable);
//     res.json(defaultValue(true, RoleTable, ""));
//   } catch (error) {
//     console.error(error);
//     res.json(defaultValue(false, null, "Error retrieving Role data"));
//   }
// };

// const getPositionWhere = async (req, res) => {
//   try {
//     const RoleTable = await db.Positions.findAll({
//       where: {
//         is_deleted: false,
//       },
//     });
//     console.log(RoleTable);
//     res.json(defaultValue(true, RoleTable, ""));
//   } catch (error) {
//     console.error(error);
//     res.json(defaultValue(false, null, "Error retrieving Role data"));
//   }
// };

const getGender = async (req, res) => {
  try {
    const RoleTable = await db.tbGender.findAll({});
    console.log(RoleTable);
    res.json(defaultValue(true, RoleTable, ""));
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, null, "Error retrieving Role data"));
  }
};

const getGroup = async (req, res) => {
  try {
    const RoleTable = await db.Groups.findAll({
      where: {
        is_deleted: false,
      },
      include: [
        {
          model: db.Projects,
          required: false,
          where: {
            is_deleted: false,
          },
        },
        {
          model: db.Profiles,
          required: false,
          where: {
            is_deleted: false,
          },
          include: [
            {
              model: db.Users,
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

const getLevel = async (req, res) => {
  try {
    const RoleTable = await db.tbLevel.findAll({});
    console.log(RoleTable);
    res.json(defaultValue(true, RoleTable, ""));
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, null, "Error retrieving Role data"));
  }
};

const getPosition = async (req, res) => {
  try {
    const RoleTable = await db.Positions.findAll({
      where: {
        is_deleted: false,
      },
      include: [
        {
          model: db.Profiles,
          required: false,
          where: {
            is_deleted: false,
          },
          include: [
            {
              model: db.Users,
              required: false,
            },
          ],
        },
        { model: db.Departments, required: false },
      ],
    });
    console.log(RoleTable);
    res.json(defaultValue(true, RoleTable, ""));
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, null, "Error retrieving Role data"));
  }
};

const getProfile = async (req, res) => {
  console.log("eiei", req.body);

  if (!req.body.token) {
    res.json(defaultValue(false, null, "Token not found"));
    return;
  }

  try {
    const profileData = await db.Profiles.findAll({
      where: {
        invite: false,
        token: req.body.token,
      },
      include: [
        {
          model: db.Users,
          required: false,
        },
        {
          model: db.Positions,
          required: false,
        },
        {
          model: db.Departments,
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

const updateDepartment = async (req, res) => {
  let t;
  console.log("req.body in update", req.body);
  try {
    t = await db.sequelize.transaction();
    value = {
      department_code: req.body.code,
      department_name: req.body.name,
      updated_by: req.user.user_id,
    };
    console.log("value", value);
    const department = await db.Departments.update(
      value, // Update the field name to Level_Id
      { where: { department_id: req.body.id }, transaction: t }
    );

    await t.commit();
    console.log(department);
    if (department) {
      res.json(defaultValue(true, department, "Level updated successfully"));
    } else {
      res.json(defaultValue(false, null, "No matching profile found"));
    }
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, null, "Error retrieving Role data"));
  }
};

const updatePosition = async (req, res) => {
  console.log("req.body in update", req.body);
  try {
    value = {
      position_code: req.body.code,
      position_name: req.body.name,
      department_id: req.body.department_id,
      updated_by: req.user.user_id,
    };
    const position = await db.Positions.update(
      value, // Update the field name to Level_Id
      {
        where: { position_id: req.body.id },
      }
    );

    console.log(position);
    if (position) {
      res.json(defaultValue(true, position, "Level updated successfully"));
    } else {
      res.json(defaultValue(false, null, "No matching profile found"));
    }
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, null, "Error retrieving Role data"));
  }
};

const updateGroup = async (req, res) => {
  console.log("req.body in update", req.body);
  let t;
  try {
    t = await db.sequelize.transaction();
    value = {
      group_code: req.body.code,
      group_name: req.body.name,
      is_all: req.body.status,
      updated_by: req.user.user_id,
    };

    console.log("value isssss", value);
    ///------------------------------------------------------------------------
    // Fetch the old data from your database
    const group = await db.Profiles.findAll({
      where: {
        invite: true,
        group_id: req.body.id,
      },
    });

    // Check if the group is found
    if (group) {
      const oldUserIds = group.map((index) => index.user_id) || [];
      console.log("hello i sus", oldUserIds);

      // Extract new user_ids from req.body
      const newUsers = req.body.user_id || [];

      const isIncrease = newUsers.length > oldUserIds.length;
      const isDecrease = newUsers.length < oldUserIds.length;

      // Find the user_ids that need to be added (present in new data but not in old data)
      const usersToAdd = newUsers.filter(
        (newUserId) => !oldUserIds.includes(newUserId)
      );

      // Find the user_ids that need to be removed (present in old data but not in new data)
      const usersToRemove = oldUserIds.filter(
        (oldUserId) => !newUsers.includes(oldUserId)
      );

      // Add new user_ids to your database if it's an increase
      if (isIncrease && usersToAdd.length > 0) {
        console.log("usersToAdd", usersToAdd);
        await db.Profiles.update(
          { group_id: req.body.id }, // Set the group_id for the new users
          { where: { user_id: usersToAdd }, transaction: t }
        );
      }

      // Remove unwanted user_ids from your database if it's a decrease
      if (isDecrease && usersToRemove.length > 0) {
        await db.Profiles.update(
          { group_id: null }, // Set group_id to null for the users to be removed
          { where: { user_id: usersToRemove }, transaction: t }
        );
      }

      // Update the group data with new values
      const updatedGroup = await db.Groups.update(value, {
        where: { group_id: req.body.id },
        transaction: t,
      });

      await t.commit();
      res.json(defaultValue(true, updatedGroup, "Group updated successfully"));
    } else {
      res.json(defaultValue(false, null, "No matching profile found"));
    }
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, null, "Error retrieving Role data"));
  }
};

const createGroup = async (req, res) => {
  let t; // Declare the transaction variable
  try {
    t = await db.sequelize.transaction(); // Start the transaction

    console.log("body is nudle", req.body);
    if (!req.body.name) {
      res.json(defaultValue(false, null, "create group unsuccessful"));
    } else {
      value = {
        group_code: req.body.code,
        group_name: req.body.name,
        updated_by: req.user.user_id,
        created_by: req.user.user_id,
        is_all: req.body.status,
        is_deleted: false,
        is_active: false,
      };
      const createUser = await db.Groups.create(value, {
        transaction: t,
      });

      if (req.body.user_id.length > 0) {
        const updatePosition = await db.Profiles.update(
          { group_id: createUser.group_id },
          { where: { user_id: req.body.user_id }, transaction: t }
        );
      }

      await t.commit(); // Commit the transaction after the operation is successful

      res.json(defaultValue(true, createUser, "create group successfully"));
    }
  } catch (error) {
    // If an error occurs, rollback the transaction
    if (t) {
      await t.rollback();
    }
    console.error("Error creating group:", error);
    res.json(defaultValue(false, null, "create group unsuccessful"));
  }
};

const createDepartment = async (req, res) => {
  let t; // Declare the transaction variable
  try {
    t = await db.sequelize.transaction(); // Start the transaction

    console.log("body is nudle", req.body);
    if (!req.body.name) {
      res.json(defaultValue(false, null, "create Department unsuccessful"));
    } else {
      value = {
        department_code: req.body.code,
        department_name: req.body.name,
        updated_by: req.user.user_id,
        created_by: req.user.user_id,
        is_deleted: false,
        is_active: true,
      };
      const createDepartment = await db.Departments.create(value, {
        transaction: t,
      });

      await t.commit(); // Commit the transaction after all operations are successful
      res.json(
        defaultValue(true, createDepartment, "create Department successfully")
      );
    }
  } catch (error) {
    // If an error occurs, rollback the transaction
    if (t) {
      await t.rollback();
    }
    console.error("Error creating Department:", error);
    res.json(defaultValue(false, null, "create Department unsuccessful"));
  }
};

const createPosition = async (req, res) => {
  let t; // Declare the transaction variable
  try {
    t = await db.sequelize.transaction(); // Start the transaction

    console.log("body is nudle", req.body.name);
    if (!req.body.name) {
      res.json(defaultValue(false, null, "create Position unsuccessful"));
    } else {
      value = {
        position_code: req.body.code,
        position_name: req.body.name,
        department_id: req.body.department_Id,
        updated_by: req.user.user_id,
        created_by: req.user.user_id,
        is_deleted: false,
        is_active: true,
      };
      const createPosition = await db.Positions.create(value, {
        transaction: t,
      });

      await t.commit(); // Commit the transaction after the operation is successful

      res.json(
        defaultValue(true, createPosition, "create Position successfully")
      );
    }
  } catch (error) {
    // If an error occurs, rollback the transaction
    if (t) {
      await t.rollback();
    }
    console.error("Error creating Position:", error);
    res.json(defaultValue(false, null, "create Position unsuccessful"));
  }
};

const isDeleteDepartment = async (req, res) => {
  let t;
  console.log("req.body in update", req.body);
  try {
    t = await db.sequelize.transaction();
    const department = await db.Departments.update(
      { is_deleted: true }, // Update the field name to Level_Id
      { where: { department_id: req.body.department_id }, transaction: t }
    );
    await t.commit();
    // console.log(department);
    if (department) {
      res.json(
        defaultValue(true, department, "Department is_delete successfully")
      );
    } else {
      res.json(defaultValue(false, null, "No matching profile found"));
    }
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, null, "Error retrieving Role data"));
  }
};

const isDeletePosition = async (req, res) => {
  let t;
  console.log("req.body in update", req.body.id);
  try {
    t = await db.sequelize.transaction();
    const department = await db.Positions.update(
      { is_deleted: true }, // Update the field name to Level_Id
      { where: { position_id: req.body.position_id }, transaction: t }
    );
    await t.commit();
    console.log(department);
    if (department) {
      res.json(
        defaultValue(true, department, "Department is_delete successfully")
      );
    } else {
      res.json(defaultValue(false, null, "No matching profile found"));
    }
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, null, "Error retrieving Role data"));
  }
};

const isDeleteGroup = async (req, res) => {
  let t;
  console.log("req.body in update", req.body);
  try {
    t = await db.sequelize.transaction();
    const department = await db.Groups.update(
      { is_deleted: true, is_active: false },
      { where: { group_id: req.body.group_id }, transaction: t }
    );
    await t.commit();
    console.log("pls return", department);
    if (department) {
      res.json(
        defaultValue(true, department, "Department is_delete successfully")
      );
    } else {
      res.json(defaultValue(false, null, "No matching profile found"));
    }
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, null, "Error retrieving Role data"));
  }
};

const fetchDepartment = async (req, res) => {
  try {
    const RoleTable = await db.Departments.findAll({
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

const fetchPosition = async (req, res) => {
  try {
    const RoleTable = await db.Positions.findAll({
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

const fetchGroup = async (req, res) => {
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
  created,
  getDepartment,
  getGender,
  getGroup,
  getLevel,
  getPosition,
  getProfile,
  createGroup,
  createDepartment,
  createPosition,
  updateDepartment,
  updatePosition,
  updateGroup,
  isDeleteDepartment,
  isDeletePosition,
  isDeleteGroup,
  fetchDepartment,
  fetchPosition,
  fetchGroup
};
