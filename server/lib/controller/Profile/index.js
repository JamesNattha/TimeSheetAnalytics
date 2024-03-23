const db = require("../../../models");
const { create, bulk_create, destroy, update } = require("../../repositories");
const { defaultValue } = require("../../../services/defaultValue");
const service = require("undefined-service-api");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const moment = require("moment");
const { sign } = require("jsonwebtoken");
const express = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();
const crypto = require("crypto");
const app = express();
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const getProfile = async (req, res) => {
  console.log("req.user", req.body);
  console.log("req.user", req.user);
  try {
    const profileData = await db.Profiles.findAll({
      where: {
        user_id: req.user.user_id,
        is_deleted: false,
      },
      attributes: {
        exclude: ["super_img", "picture"],
      },
      include: [
        {
          model: db.Users,
          required: false,
          attributes: {
            exclude: ["password"],
          },
        },
        {
          model: db.Addresses,
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

const updateUser = async (req, res) => {
  let t;
  try {
    t = await db.sequelize.transaction();
    console.log("req.body is active", req.body);
    const valuesToUpdate = {
      department_id: req.body.department, // Assuming worknoId is the primary key
      group_id: req.body.group,
      level: req.body.level,
      position_id: req.body.position,
      role: req.body.role,
      is_active: req.body.active,
    };

    console.log("valuesToUpdate", valuesToUpdate);
    const valueUser = {
      username: req.body.username,
      starting_working_date: req.body.startWorkingDate,
      is_active: req.body.active,
    };

    const updatedRecords = await db.Profiles.update(valuesToUpdate, {
      where: { profile_id: req.body.profile_Id },
      transaction: t,
    });

    console.log("updatedRecords", updatedRecords);

    console.log("startingWorkingDate  records:", req.body.startingWorkingDate);

    const updateWorkingDate = await db.Users.update(valueUser, {
      where: { user_id: req.body.userId },
      transaction: t,
    });

    // console.log("updateWorkingDate records:", updateWorkingDate);

    await t.commit();
    res.json(defaultValue(true, [updateWorkingDate], req.body)); // Return the updated records
  } catch (error) {
    if (t) {
      await t.rollback();
    }
    console.error(error);
    res.json(defaultValue(false, null, error.message));
  }
};

const deleteUser = async (req, res) => {
  console.log("req.body in delete", req.body);
  let t;
  try {
    t = await db.sequelize.transaction();
    const profileData = await db.Profiles.findAll({
      where: {
        user_id: req.body.id,
      },
    });

    await db.Users.update(
      { is_deleted: true },
      { where: { user_id: req.body.id }, transaction: t }
    );

    await db.Profiles.update(
      { is_deleted: true },
      { where: { user_id: req.body.id }, transaction: t }
    );

    await t.commit();
    res.json(defaultValue(true, null, "User deleted successfully."));
  } catch (error) {
    if (t) {
      await t.rollback();
    }
    console.error(error);
    res.json(defaultValue(false, null, error.message));
  }
};

//image upload Controller
const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadAvatar = async (req, res) => {
  console.log("Received base64 data:", req.body);

  let t;
  try {
    t = await db.sequelize.transaction();

    const base64Data = req.body.picture; // Assuming you receive the base64 data
    const imageBuffer = Buffer.from(base64Data, "base64");
    const uniqueFilename = `${req.user.user_id}.png`;
    const directoryPath = path.join(__dirname, "/../../../public/avatar");
    const filePath = path.join(directoryPath, uniqueFilename);
    console.log("Decoded image buffer:", imageBuffer);

    // Write the image data to the file
    try {
      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
      }

      fs.writeFileSync(filePath, imageBuffer);
    } catch (error) {
      console.error("Error writing file:", error);
      // Handle the error or return an error response to the client.
      res.json(defaultValue(false, null, "Error writing file"));
      return;
    }

    const valuesToUpdate = {
      picture: `/public/avatar/${uniqueFilename}`,
      super_img: imageBuffer,
    };

    const updatedRecords = await db.Profiles.update(valuesToUpdate, {
      where: { user_id: req.user.user_id },
      transaction: t,
    });

    // console.log("updateWorkingDate records:", updatedRecords);

    await t.commit();
    res.json(defaultValue(true, updatedRecords, req.body)); // Return the updated records
  } catch (error) {
    if (t) {
      await t.rollback();
    }
    console.error(error);
    res.json(defaultValue(false, null, error.message));
  }
};

const updateSettingprofile = async (req, res) => {
  console.log("Received Update Profile", req.body);
  let t;
  try {
    t = await db.sequelize.transaction();

    let updateProfile = {
      first_name: req.body.firstname,
      last_name: req.body.lastname,
      nick_name: req.body.nickname,
      user_phone: req.body.phoneno,
      birthday: req.body.birthday,
    };

    const updateUser = await db.Users.update(updateProfile, {
      where: { user_id: req.user.user_id },
      transaction: t,
    });

    const updatedUser = await db.Profiles.findOne({
      where: { user_id: req.user.user_id },
      transaction: t,
    });

    console.log("updatedUser", updatedUser);

    const checkAddr = await db.Addresses.findAll({
      where: { profile_id: updatedUser.profile_id },
    });

    let Addr;

    console.log("checkAddr", checkAddr);

    if (checkAddr && checkAddr.length > 0) {
      let updateAddr = {
        information: req.body.address,
        sub_district: req.body.subdistrict,
        district: req.body.district,
        province: req.body.province,
        postcode: req.body.postcode,
        updated_by: req.user.user_id,
      };

      Addr = await db.Addresses.update(updateAddr, {
        where: { profile_id: updatedUser.profile_id },
        transaction: t,
      });
    } else {
      let updateAddr = {
        profile_id: updatedUser.profile_id,
        information: req.body.address,
        sub_district: req.body.subdistrict,
        district: req.body.district,
        province: req.body.province,
        postcode: req.body.postcode,
        created_by: req.user.user_id,
        updated_by: req.user.user_id,
        is_deleted: false,
        is_active: true,
      };
      console.log("hello is created");
      Addr = await db.Addresses.create(updateAddr, { transaction: t });
      console.log("hello is Addr", Addr);
    }

    // Commit the transaction only once after all operations are completed
    await t.commit();
    res.json(defaultValue(true, [updateUser, Addr], "update succ"));
  } catch (error) {
    if (t) {
      await t.rollback();
    }
    console.error(error);
    res.json(defaultValue(false, null, error.message));
  }
};

const fetchImgUser = async (req, res) => {
  try {
    const superImages = await db.Profiles.findAll({
      where: {
        user_id: req.user.user_id,
      },
      attributes: ["super_img"], // Select only the 'super_img' field
    });

    // Extract the 'super_img' values from the result
    const superImageUrls = {
      img: superImages.map((profile) => profile.super_img),
    };

    res.json(
      defaultValue(true, superImageUrls, "Super images fetched successfully")
    );
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, null, error.message));
  }
};

module.exports = {
  getProfile,
  updateUser,
  deleteUser,
  uploadAvatar,
  // upload,
  updateSettingprofile,
  fetchImgUser,
};
