const db = require("../../../models");
const { defaultValue } = require("../../../services/defaultValue");
const service = require("undefined-service-api");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const express = require("express");
const jwt = require("jsonwebtoken");
const { v4: UUIDV4 } = require("uuid");
const nodemailer = require("nodemailer");
require("dotenv").config();
const crypto = require("crypto");
const app = express();
const { GOOGLE_USER, GOOGLE_PASSWORD, DOMAIN } = require("../config");
const ejs = require("ejs");
const { group } = require("console");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("hello", req.body);

    if (service.isNullOrEmpty(username) || service.isNullOrEmpty(password)) {
      return res.json(
        defaultValue(false, null, "Username or password is required")
      );
    }

    const matchuser_superadmin = username === process.env.SUPER_ADMIN_USER;
    if (matchuser_superadmin) {
      let t;
      const listUser = await db.Users.findOne({
        attributes: [
          "user_id",
          "username",
          "password",
          "starting_working_date",
          "is_active",
        ],
        where: {
          username: username,
          is_deleted: false,
        },
        include: [
          {
            model: db.Profiles,
            required: false,
            where: {
              is_deleted: false,
            },
          },
        ],
      });

      if (listUser) {
        console.log("listUser", listUser);
        const [tbRole] = listUser.Profiles.map((role) => role.role);
        const [group_id] = listUser.Profiles.map((role) => role.group_id);
        console.log("Role", tbRole);

        const match = await bcrypt.compare(password, listUser.password);

        if (match) {
          const accessToken = sign(
            {
              username: listUser.username,
              user_id: listUser.user_id,
              role: tbRole,
              group: group_id,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1440m" }
          );

          return res.json(
            defaultValue(
              true,
              {
                token: accessToken,
                username: listUser.username,
                user_id: listUser.user_id,
                role: tbRole,
                group: group_id,
                isStatus: true,
              },
              "Login successful"
            )
          );
        }
      } else if (!listUser) {
        t = await db.sequelize.transaction();
        const matchsuper_admin = password === process.env.SUPER_ADMIN_PASS;
        if (matchsuper_admin) {
          function generateVerificationToken() {
            const token = crypto.randomBytes(20).toString("hex");
            return token;
          }

          const verificationToken = generateVerificationToken();

          const createdUser = await db.Users.create(
            {
              username: process.env.SUPER_ADMIN_USER,
              password: bcrypt.hashSync(process.env.SUPER_ADMIN_PASS, 10),
              starting_working_date: new Date(),
              created_by: "System",
              updated_by: "System",
              is_active: true,
              is_deleted: false,
            },
            {
              transaction: t,
            }
          );

          console.log("ValueUser created:", createdUser);
          const createdDepart = await db.Departments.create(
            {
              department_code: "ONLYSUPER",
              department_name: "FORSUPER",
              created_by: "System",
              updated_by: "System",
              is_active: true,
              is_deleted: false,
            },
            {
              transaction: t,
            }
          );

          const createdPosi = await db.Positions.create(
            {
              position_code: "ONLYSUPER",
              position_name: "FORSUPER",
              department_id: createdDepart.department_id,
              created_by: "System",
              updated_by: "System",
              is_active: true,
              is_deleted: false,
            },
            {
              transaction: t,
            }
          );

          const createdGroup = await db.Groups.create({
            group_code: "ONLYSUPER",
            group_name: "FORSUPER",
            // department_id: createdDepart.department_id,
            is_all: false,
            created_by: "System",
            updated_by: "System",
            is_active: true,
            is_deleted: false,
          });

          let createsProfile;
          dataUser = {
            role: "super_admin",
            user_id: createdUser.user_id,
            department_id: createdDepart.department_id,
            position_id: createdPosi.position_id,
            group_id: createdGroup.group_id,
            token: verificationToken,
            invite: true,
            created_by: "System",
            updated_by: "System",
            is_active: true,
            is_deleted: false,
          };

          createsProfile = await db.Profiles.create(dataUser, {
            transaction: t,
          });

          await t.commit();
          const accessToken = sign(
            {
              username: createdUser.username,
              user_id: createdUser.user_id,
              role: createsProfile.role,
              group: createdGroup.group_id,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1440m" }
          );

          return res.json(
            defaultValue(
              true,
              {
                token: accessToken,
                username: createdUser.username,
                user_id: createdUser.user_id,
                role: createsProfile.role,
                group: createdGroup.group_id,
                isStatus: true,
              },
              "Login successful"
            )
          );
        }
      }
    }

    const listUser = await db.Users.findOne({
      attributes: [
        "user_id",
        "username",
        "password",
        "starting_working_date",
        "is_active",
      ],
      where: {
        username: username,
        is_deleted: false,
      },
      include: [
        {
          model: db.Profiles,
          required: false,
          where: {
            is_deleted: false,
          },
        },
      ],
    });

    if (!listUser) {
      return res.json(defaultValue(false, null, "User not found"));
    }

    console.log("listUser", listUser);

    const [tbRole] = listUser.Profiles.map((role) => role.role);
    const [group_id] = listUser.Profiles.map((role) => role.group_id);
    console.log("Role", group_id);

    const match = await bcrypt.compare(password, listUser.password);
    console.log("listUser.is_active", listUser.is_active);
    if (!listUser.is_active) {
      console.log("44444");
      let klua = "This account is not active";
      return res.json(
        defaultValue(
          false,
          "This account is not active",
          "This account is not active"
        )
      );
    }

    const newDate = new Date();
    console.log("newDate", newDate);
    console.log("startWorking", listUser.starting_working_date);
    if (newDate < listUser.starting_working_date) {
      console.log("555555");
      return res.json(defaultValue(false, null, "it's Not your Time"));
    }

    if (!match) {
      return res.json(
        defaultValue(false, null, "Wrong Username And Password Combination")
      );
    }

    const accessToken = sign(
      {
        username: listUser.username,
        user_id: listUser.user_id,
        role: tbRole,
        group: group_id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1440m" }
    );

    console.log("accessToken:", accessToken);

    res.json(
      defaultValue(
        true,
        {
          token: accessToken,
          username: listUser.username,
          user_id: listUser.user_id,
          role: tbRole,
          group: group_id,
          isStatus: true,
        },
        "Login successful"
      )
    );
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.json(defaultValue(false, null, "Error retrieving user"));
  }
};

const onAuthApi = (req, res) => {
  if (!req.body || !req.body.token) {
    console.error("Token not provided in the request body.");
    return res.json({ isStatus: false, users: null });
  }
  jwt.verify(
    req.body.token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        console.error("Token verification error:", err);
        return res.json({ isStatus: false, users: null });
      }
      console.log("Decoded token:", decoded);
      req.user = decoded;
      console.log("req.user:", req.user);
      res.json({ isStatus: true, users: req.user, role: req.role });
    }
  );
};

const register = async (req, res) => {
  console.log("req body register", req.body);
  try {
    function generateVerificationToken() {
      const token = crypto.randomBytes(20).toString("hex");
      return token;
    }
    const verificationToken = generateVerificationToken();

    const valuesUser = {
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10),
      birthday: req.body.birthday,
      nick_name: req.body.nickName,
      is_active: true,
    };

    const updatedUser = await db.Users.update(valuesUser, {
      where: { username: req.body.username },
    });
    console.log("updatedUser", req.body);

    const valuesToUpdate = {
      gender: req.body.gender,
      is_active: true,
      invite: true,
      token: verificationToken,
    };

    const createdRecord = await db.Profiles.update(valuesToUpdate, {
      where: { token: req.body.token },
    });

    console.log(createdRecord);
    res.json(defaultValue(true, createdRecord, ""));
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, null, error.message));
  }
};

const activateAccount = async (req, res) => {
  try {
    const { token } = req.body;
    console.log("token is :", token);
    const user = await db.Profiles.findOne({ where: { token } });
    console.log("user tesst", user);

    if (!user) {
      // Token is invalid or user not found
      return res
        .status(400)
        .json({ success: false, message: "Invalid verification token" });
    }

    const [numRowsUpdated] = await db.Profiles.update(
      { invite: true },
      { where: { token } }
    );

    if (numRowsUpdated === 1) {
      // Account activation successful
      return res
        .status(200)
        .json({ success: true, message: "Account activated successfully" });
    } else {
      // Account activation failed
      return res
        .status(500)
        .json({ success: false, message: "Failed to activate account" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const forgotPassword = async (req, res) => {
  console.log("req.user", req.body);
  try {
    const userData = await db.Users.findOne({
      where: {
        username: req.body.email,
      },
    });

    if (!userData) {
      res.json(defaultValue(false, null, "User not found"));
      return;
    }

    if (userData.dataValues.username === null) {
      res.json(defaultValue(false, null, "User has not register"));
      return;
    }

    function generateVerificationToken() {
      const token = crypto.randomBytes(20).toString("hex");
      return token;
    }
    const verificationToken = generateVerificationToken();

    console.log("User is", userData);

    const valuesToUpdate = {
      token: verificationToken,
    };

    const updatedProfileCount = await db.Profiles.update(valuesToUpdate, {
      where: {
        user_id: userData.user_id,
      },
    });

    console.log("Profile is", updatedProfileCount);
    console.log("process.env.", process.env.SMTP_HOST);
    // Send verification email ------------------------------------------------------
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    ejs.renderFile(
      __dirname + "/../template/ForgotTemplate.ejs",
      {
        name: `${userData.first_name} ${userData.last_name}`,
        content:
          "We have already received your changing password on Undefined Time sheet.",
        textbutton: "Changing Password",
        confirm_link: `${DOMAIN}/reset-password/${verificationToken}`,
        learnMoreLink: "www.google.com",
      },
      (err, emailHTML) => {
        if (err) {
          console.error("Error rendering EJS template:", err);
          return;
        }

        // Email options
        const mailOptions = {
          from: process.env.SMTP_FROM,
          to: req.body.email,
          subject: "เปลี่ยนรหัสผ่านใหม่บน Undefined",
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

    if (updatedProfileCount.length === 0) {
      // Handle case when no profile data is found
      res.json(defaultValue(false, null, "Profile not found"));
    } else {
      res.json(defaultValue(true, updatedProfileCount, ""));
    }
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, null, "Error retrieving profile"));
  }
};

const resetPassword = async (req, res) => {
  console.log("req body register", req.body);
  const tokenWeb = req.body.token;
  const tokenlast = tokenWeb.token;
  console.log("tokenWeb", tokenlast);
  try {
    function generateVerificationToken() {
      const token = crypto.randomBytes(20).toString("hex");
      return token;
    }

    const profiledata = await db.Profiles.findOne({
      where: {
        token: tokenlast,
      },
    });
    console.log("profile data", profiledata);

    const verificationToken = generateVerificationToken();

    const valuesUser = {
      password: bcrypt.hashSync(req.body.password, 10),
    };

    const updatedUser = await db.Users.update(valuesUser, {
      where: { user_id: profiledata.user_id },
    });

    const valuesProfile = {
      token: verificationToken,
    };
    const updatedProfileToken = await db.Profiles.update(valuesProfile, {
      where: { token: tokenlast },
    });

    console.log(updatedProfileToken);
    res.json(defaultValue(true, updatedProfileToken, ""));
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, null, error.message));
  }
};

const resendEmail = async (req, res) => {
  try {
    function generateVerificationToken() {
      const token = crypto.randomBytes(20).toString("hex");
      return token;
    }
    const verificationToken = generateVerificationToken();

    const createdRecord = await db.Profiles.update(
      { token: verificationToken },
      {
        where: { profile_id: req.body.profile_id },
      }
    );

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
        name: `${req.body.User.username}`,
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
          to: req.body.User.username,
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

    console.log(createdRecord);
    res.json(defaultValue(true, createdRecord, ""));
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, null, error.message));
  }
};

const changePassword = async (req, res) => {
  let t;
  try {
    t = await db.sequelize.transaction();
    const currentpassword = req.body.currentpassword;

    const listUser = await db.Users.findOne({
      attributes: ["user_id", "username", "password"],
      where: {
        user_id: req.user.user_id,
        is_deleted: false,
      },
    });

    if (!listUser) {
      return res.json(defaultValue(false, null, "User not found"));
    }

    const match = await bcrypt.compare(currentpassword, listUser.password);

    if (!match) {
      return res.json(
        defaultValue(false, null, "Wrong Current Password Combination")
      );
    }

    const valuesUser = {
      password: bcrypt.hashSync(req.body.newpassword, 10),
    };

    const changepass = await db.Users.update(valuesUser, {
      where: { user_id: req.user.user_id },
      transaction: t,
    });
    console.log("changepass", changepass);
    await t.commit();
    res.json(defaultValue(true, changepass, "change password successful"));
  } catch (error) {
    console.error("Error change password:", error);
    res.json(defaultValue(false, null, "Error change password"));
  }
};

module.exports = {
  login,
  onAuthApi,
  register,
  activateAccount,
  forgotPassword,
  resetPassword,
  resendEmail,
  changePassword,
};
