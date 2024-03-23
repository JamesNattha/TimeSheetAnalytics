const db = require("../../../models");
const { create } = require("../../repositories");
const { defaultValue } = require("../../../services/defaultValue");
const service = require("undefined-service-api");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { Op, where } = require("sequelize");

const createUser = async (req, res) => {
  let t = await db.sequelize.transaction();
  const listUser = await db.tbUser.findOne({
    where: { username: req.body.username },
  });

  if (
    service.isNullOrEmpty(req.body.username) ||
    service.isNullOrEmpty(req.body.password) ||
    listUser
  ) {
    res.json(defaultValue(false, null, "create user unsuccessful"));
  } else {
    req.body.userId = uuidv4();
    req.body.isDeleted = 0;
    req.body.createdBy = req.body.createdBy ?? "admin";
    bcrypt.hash(req.body.password, 10).then(async (hash) => {
      req.body.password = hash;
      req.body.username = req.body.username.trim().toLowerCase();
      const createUser = await create(db.tbUser, req.body, t);
      t.commit();
      res.json(defaultValue(true, createUser, "create user successfully"));
    });
  }
};

const fetchUser = async (req, res) => {
  const fetchUser = await db.Users.findAll({
    where: {
      is_active: true,
      is_deleted: false,
    },
  });
  //console.log(fetchUser);
  res.json(defaultValue(true, fetchUser, ""));
};

const parseData = (data) => {
  if (data) {
    const _data = JSON.parse(JSON.stringify(data));
    data = _data;
  }
  return data;
};

const fetchMyself = async (req, res) => {
  try {
    let fetchUser = await db.Users.findAll({
      where: {
        user_id: req.user.user_id,
      },

      include: [
        {
          model: db.Profiles,
          where: {
            invite: true,
            is_active: true,
          },
          include: [
            {
              model: db.Groups,
            },
          ],
        },
      ],
    });
    console.log(fetchUser);
    let result = [];
    if (fetchUser && fetchUser.length > 0) {
      fetchUser = parseData(fetchUser);
      fetchUser.map((item) => {
        let data = {
          user_id: item.user_id,
          username: item.username,
          first_name: item.first_name,
          last_name: item.last_name,
        };
        if (item.Profiles && item.Profiles.length > 0) {
          item.Profiles.map((profile) => {
            data = {
              ...data,
              group_id: profile.Group.group_id,
              is_all: profile.Group.is_all,
            };
            result.push(data);
          });
        }
      });
    }
    //("DataSubProject", result);
    res.json(defaultValue(true, result, ""));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json(defaultValue(false, null, "Error retrieving fetch myself data"));
  }
};

// const fetchMyself = async (req, res) => {
//   let fetchUser = await db.Users.findAll({
//     where: {
//       user_id: req.user.user_id,
//     },

//     include: [
//       {
//         model: db.Profiles,
//         where: {
//           invite: true,
//           is_active: true,
//         },
//         include: [
//           {
//             model: db.Groups,
//           },
//         ],
//       },
//     ],
//   });
//   console.log(fetchUser);

//   res.json(defaultValue(true, fetchUser, ""));
// };

const fetchAllUser = async (req, res) => {
  const fetchUser = await db.tbUser.findAll({
    where: {
      userId: { [Op.ne]: req.user.userId },
    },
  });
  //console.log(fetchUser);

  res.json(defaultValue(true, fetchUser, ""));
};

module.exports = {
  createUser,
  fetchUser,
  fetchAllUser,
  fetchMyself,
};
