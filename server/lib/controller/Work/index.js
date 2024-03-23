const generateDocumentNo = require("./generateCode");
const db = require("../../../models");
const { create, bulk_create, destroy, update } = require("../../repositories");
const { defaultValue } = require("../../../services/defaultValue");
const service = require("undefined-service-api");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

//------------------------------------------------------------- Fetch Data Zone -------------------------------------------------------------
const fetchDataClient = async (req, res) => {
  try {
    const clientTable = await db.Clients.findAll({
      where: {
        is_deleted: false,
      },
    });
    res.json(defaultValue(true, clientTable, ""));
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, null, "Error retrieving workNo data"));
  }
};

const fetchSubDataClient = async (req, res) => {
  try {
    console.log("before fetchSubDataClient :");
    const DataSubClients = await db.Clients.findAll({
      where: {
        is_deleted: false,
      },
      include: [
        {
          model: db.SubClients,
          required: false,
        },
        { model: db.Projects, required: false },
      ],
    });
    // console.log("DataSubClients :", DataSubClients);
    res.json(defaultValue(true, DataSubClients, ""));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json(defaultValue(false, null, "Error retrieving fetchWork data"));
  }
};

const fetchSubDataProject = async (req, res) => {
  //Use this to fetch Client
  try {
    const DataSubProject = await db.Clients.findAll({
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
          include: [
            {
              model: db.Groups,
              required: false,
            },
          ],
        },
      ],
    });
    res.json(defaultValue(true, DataSubProject, ""));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json(defaultValue(false, null, "Error retrieving fetchWork data"));
  }
};

const parseData = (data) => {
  if (data) {
    const _data = JSON.parse(JSON.stringify(data));
    data = _data;
  }
  return data;
};

const fetchDataWork = async (req, res) => {
  try {
    let DataSubProject = await db.Clients.findAll({
      where: {
        is_deleted: false,
      },
      include: [
        {
          model: db.Projects,
          required: true,
          where: {
            is_deleted: false,
          },
          include: [
            {
              model: db.Works,
              required: true,
              where: {
                work_status: {
                  [db.Sequelize.Op.ne]: "success",
                },
                is_deleted: false,
              },
              include: [
                {
                  model: db.Enum_table,
                  as: "enum",
                  required: true,
                  attributes: ["enum_id", "enum_type", "name_eng"],
                  where: {
                    is_deleted: false,
                  },
                },
                {
                  model: db.Timers,
                  as: "timers",
                  required: false,
                  where: {
                    is_deleted: false,
                  },
                },
              ],
            },
          ],
        },
      ],
    });

    let result = [];
    if (DataSubProject && DataSubProject.length > 0) {
      DataSubProject = parseData(DataSubProject);
      DataSubProject.map((item) => {
        if (item.Projects && item.Projects.length > 0) {
          item.Projects.map((project) => {
            if (project.Works && project.Works.length > 0) {
              project.Works.map((work) => {
                let sum_time = 0;
                let action_status = 0;
                let timestamps = 0;

                if (work.timers && work.timers.length > 0) {
                  work.timers.forEach((timer) => {
                    sum_time += timer.sum_time;
                    action_status += timer.action_status;
                    timestamps += timer.timestamps;
                  });
                }

                let data = {
                  client_id: item.client_id,
                  client_name: item.client_name,
                  project_id: project.project_id,
                  project_name: project.project_name,
                  group_id: project.group_id,
                  work_id: work.work_id,
                  work_code: work.work_code,
                  work_name: work.work_name,
                  work_type: work.work_type,
                  work_type_name: work.enum ? work.enum.name_eng : "",
                  sum_time: sum_time,
                  action_status: action_status,
                  work_level: work.work_level,
                  work_status: work.work_status,
                  detail: work.detail,
                  send_to: work.send_to,
                  total: work.total,
                  start_date: moment(work.start_date).format("DD-MM-YYYY"),
                  end_date: moment(work.end_date).format("DD-MM-YYYY"),
                  created_by: work.created_by,
                  created_date: work.created_date,
                  is_active: work.is_active,
                  is_deleted: work.is_deleted,
                  timestamps: timestamps,
                };
                result.push(data);
              });
            }
          });
        }
      });
    }
    // console.log("DataSubProject", result);
    res.json(defaultValue(true, result, ""));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json(defaultValue(false, null, "Error retrieving fetchWork data"));
  }
};
const fetchGetWorkCode = async (req, res) => {
  try {
    let DataSubProject = await db.Clients.findAll({
      where: {
        is_deleted: false,
      },
      include: [
        {
          model: db.Projects,
          required: true,
          where: {
            is_deleted: false,
          },
          include: [
            {
              model: db.Works,
              required: true,
              where: {
                is_deleted: false,
              },
              include: [
                {
                  model: db.Enum_table,
                  as: "enum",
                  required: true,
                  attributes: ["enum_id", "enum_type", "name_eng"],
                  where: {
                    is_deleted: false,
                  },
                },
                {
                  model: db.Timers,
                  as: "timers",
                  required: false,
                  where: {
                    is_deleted: false,
                  },
                },
              ],
            },
          ],
        },
      ],
    });

    let result = [];
    if (DataSubProject && DataSubProject.length > 0) {
      DataSubProject = parseData(DataSubProject);
      DataSubProject.map((item) => {
        if (item.Projects && item.Projects.length > 0) {
          item.Projects.map((project) => {
            if (project.Works && project.Works.length > 0) {
              project.Works.map((work) => {
                let sum_time = 0;
                let action_status = 0;
                let timestamps = 0;

                if (work.timers && work.timers.length > 0) {
                  work.timers.forEach((timer) => {
                    sum_time += timer.sum_time;
                    action_status += timer.action_status;
                    timestamps += timer.timestamps;
                  });
                }

                let data = {
                  client_id: item.client_id,
                  client_name: item.client_name,
                  project_id: project.project_id,
                  project_name: project.project_name,
                  group_id: project.group_id,
                  work_id: work.work_id,
                  work_code: work.work_code,
                  work_name: work.work_name,
                  work_type: work.work_type,
                  work_type_name: work.enum ? work.enum.name_eng : "",
                  sum_time: sum_time,
                  action_status: action_status,
                  work_level: work.work_level,
                  work_status: work.work_status,
                  detail: work.detail,
                  send_to: work.send_to,
                  total: work.total,
                  start_date: moment(work.start_date).format("DD-MM-YYYY"),
                  end_date: moment(work.end_date).format("DD-MM-YYYY"),
                  created_by: work.created_by,
                  created_date: work.created_date,
                  is_active: work.is_active,
                  is_deleted: work.is_deleted,
                  timestamps: timestamps,
                };
                result.push(data);
              });
            }
          });
        }
      });
    }
    // console.log("DataSubProject", result);
    res.json(defaultValue(true, result, ""));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json(defaultValue(false, null, "Error retrieving fetchWork data"));
  }
};

const fetchDataProject = async (req, res) => {
  try {
    const projectTable = await db.Projects.findAll();
    // console.log(projectTable);
    res.json(defaultValue(true, projectTable, ""));
  } catch (error) {
    // console.error(error);
    res.json(defaultValue(false, null, "Error retrieving workNo data"));
  }
};

const fetchTaskProject = async (req, res) => {
  //Use this to fetch Client
  try {
    let DataSubProject = await db.Clients.findAll({
      where: {
        is_deleted: false,
      },
      include: [
        {
          model: db.Projects,
          required: true,
          where: {
            is_deleted: false,
          },
          include: [
            {
              model: db.Groups,
              required: true,
            },
          ],
        },
      ],
    });

    let result = [];
    if (DataSubProject && DataSubProject.length > 0) {
      DataSubProject = parseData(DataSubProject);
      DataSubProject.map((item) => {
        let data = {
          client_id: item.client_id,
          client_name: item.client_name,
        };
        if (item.Projects && item.Projects.length > 0) {
          item.Projects.map((project) => {
            data = {
              ...data,
              project_id: project.project_id,
              project_code: project.project_code,
              project_name: project.project_name,
              start_date: project.start_date,
              finish_date: project.finish_date,
              due_date: project.due_date,
              created_date: project.created_date,
              group_id: project.Group.group_id,
              group_name: project.Group.group_name,
            };
            result.push(data);
          });
        }
      });
    }
    console.log("DataSubProject", result);
    res.json(defaultValue(true, result, ""));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json(defaultValue(false, null, "Error retrieving fetchWork data"));
  }
};

//------------------------------------------------------------- Create Zone -------------------------------------------------------------
const createClient = async (req, res) => {
  let t;
  try {
    t = await db.sequelize.transaction();
    const clientData = req.body.map((item) => ({
      client_code: item.client_code,
      client_name: item.client_name,
      created_by: req.user.user_id,
      updated_by: req.user.user_id,
      is_active: false,
      is_deleted: false,
    }));

    const createdRecords = await db.Clients.bulkCreate(clientData, {
      transaction: t,
    });

    const clientIds = createdRecords.map((record) => record.client_id);

    const clientSubData = req.body.map((item) => ({
      client_id: clientIds,
      client_incharge: item.client_incharge,
      client_nickname: item.client_nickname,
      email: item.email,
      client_phone: item.client_phone,
      client_detail: item.client_detail,
      created_by: req.user.user_id,
      updated_by: req.user.user_id,
      is_active: false,
      is_deleted: false,
    }));

    const createSubClients = await db.SubClients.bulkCreate(clientSubData, {
      transaction: t,
    });

    console.log("createSubClients", createSubClients);
    await t.commit();
    res.json(defaultValue(true, createdRecords, ""));
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }
    console.error(error);
    res.json(defaultValue(false, null, error.message));
  }
};

const createProject = async (req, res) => {
  let t;
  try {
    t = await db.sequelize.transaction();

    // Update the is_active field of clients
    const clientIdsToUpdate = req.body.map((item) => item.client_id);
    await db.Clients.update(
      {
        is_active: true,
        updated_by: req.user.user_id,
      },
      {
        where: { client_id: clientIdsToUpdate },
        transaction: t,
      }
    );

    await db.SubClients.update(
      {
        is_active: true,
        updated_by: req.user.user_id,
      },
      {
        where: { client_id: clientIdsToUpdate },
        transaction: t,
      }
    );

    const valuesToCreate = req.body.map((item) => ({
      client_id: item.client_id,
      group_id: item.group_id,
      project_code: item.project_code,
      project_name: item.project_name,
      mondayhd_id: item.boards_id,
      start_date: moment(item.start_date, "YYYY-MM-DD").isValid()
        ? moment(item.start_date, "YYYY-MM-DD").format("YYYY-MM-DD")
        : null,
      finish_date: moment(item.finish_date, "YYYY-MM-DD").isValid()
        ? moment(item.finish_date, "YYYY-MM-DD").format("YYYY-MM-DD")
        : null,
      due_date: moment(item.due_date, "YYYY-MM-DD").isValid()
        ? moment(item.due_date, "YYYY-MM-DD").format("YYYY-MM-DD")
        : null,
      created_by: req.user.user_id,
      updated_by: req.user.user_id,
      is_active: item.is_active,
      is_deleted: item.is_deleted,
    }));

    const createdRecords = await db.Projects.bulkCreate(valuesToCreate, {
      transaction: t,
    });
    console.log(createdRecords);
    await t.commit();
    res.json(defaultValue(true, createdRecords, ""));
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }
    console.error(error);
    res.json(defaultValue(false, null, error.message));
  }
};

const createWork = async (req, res) => {
  // console.log("req.body", req.body);
  let t;
  try {
    t = await db.sequelize.transaction();

    const clientIdsToUpdate = req.body.map((item) => item.project_id);

    await db.Projects.update(
      {
        is_active: true,
        updated_by: req.user.user_id,
      },
      {
        where: { project_id: clientIdsToUpdate },
        transaction: t,
      }
    );
    const paddingLeft = (text, paddingValue) => {
      return String(paddingValue + text).slice(-paddingValue.length);
    };

    let _condition = {
      limit: 1,
      order: [["work_code", "DESC"]],
    };

    const data = await db.Works.findAll(_condition);
    let newDocNo = "";
    const date = new Date();
    const yy = date.getFullYear().toString().slice(-2);
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    if (data && data.length > 0) {
      const _docNo = data[0].dataValues["work_code"];
      if (_docNo && _docNo.split("-").length > 1) {
        let _runningNo = parseInt(_docNo.split("-")[1]) + 1;
        newDocNo = `${"WK"}${yy}${mm}-${paddingLeft(_runningNo, "00000")}`;
      }
    } else {
      newDocNo = `${"WK"}${yy}${mm}-${("00000" + 1).slice(-"00000".length)}`;
    }

    const valuesToCreate = req.body.map((item) => ({
      project_id: item.project_id,
      work_code: newDocNo,
      work_name: item.work_name,
      work_type: item.work_type,
      work_level: item.work_level,
      work_status: "assigned",
      detail: item.detail,
      start_date: item.start_date,
      end_date: item.end_date,
      stopwatch: 0,
      action_status: 0,
      total: item.total,
      send_to:
        item.send_to && item.send_to.length > 0
          ? JSON.stringify(item.send_to)
          : null,
      created_by: req.user.user_id,
      updated_by: req.user.user_id,
      in_active: true,
      is_deleted: false,
    }));

    const createdRecords = await db.Works.bulkCreate(valuesToCreate, {
      transaction: t,
    });
    console.log("valuesToCreate", valuesToCreate);
    await t.commit();
    res.json(defaultValue(true, createdRecords, ""));
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }
    console.error(error);
    res.json(defaultValue(false, null, error.message));
  }
};

const demoCreateWork = async (req, res) => {
  console.log("req.body", req.body);
  const work_id = uuidv4();
  let t;
  try {
    t = await db.sequelize.transaction();
    const paddingLeft = (text, paddingValue) => {
      return String(paddingValue + text).slice(-paddingValue.length);
    };

    let _condition = {
      limit: 1,
      order: [["work_code", "DESC"]],
    };

    const data = await db.Works.findAll(_condition);
    let newDocNo = "";
    const date = new Date();
    const yy = date.getFullYear().toString().slice(-2);
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    if (data && data.length > 0) {
      const _docNo = data[0].dataValues["work_code"];
      if (_docNo && _docNo.split("-").length > 1) {
        let _runningNo = parseInt(_docNo.split("-")[1]) + 1;
        newDocNo = `${"WK"}${yy}${mm}-${paddingLeft(_runningNo, "00000")}`;
      }
    } else {
      newDocNo = `${"WK"}${yy}${mm}-${("00000" + 1).slice(-"00000".length)}`;
    }

    // console.log('newDocNo', newDocNo)
    const valuesToCreate = {
      work_id: work_id,
      project_id: "a4a6645a-db0b-4b5e-b78b-a19d7fa5bcc5",
      work_code: newDocNo,
      work_name: "1",
      work_type: "assigned",
      work_level: "hard",
      work_status: "assigned",
      detail: "",
      start_date: "2023-09-22 00:00:00.000",
      end_date: "2023-09-29 00:00:00.000",
      total: 541,
      send_to: "a88b42df-e8b5-4817-9042-fd54dd52d4cf",
      created_by: "6d19d4c0-a025-41cf-a898-8a6c78d1d7a3",
      updated_by: "6d19d4c0-a025-41cf-a898-8a6c78d1d7a3",
      in_active: true,
      is_deleted: false,
    };

    const createdRecords = await db.Works.bulkCreate(valuesToCreate, {
      transaction: t,
    });
    console.log("valuesToCreate", valuesToCreate);
    await t.commit();
    res.json(defaultValue(true, createdRecords, ""));
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }
    console.error(error);
    res.json(defaultValue(false, null, error.message));
  }
};

//------------------------------------------------------------- Delete Zone -------------------------------------------------------------
const deleteClient = async (req, res) => {
  let t;
  try {
    t = await db.sequelize.transaction();
    const valuesToUpdate = Array.isArray(req.body) ? req.body : [req.body];

    const updatedRecords = await Promise.all(
      valuesToUpdate.map((item) =>
        db.Clients.update(
          {
            is_deleted: true,
            updated_by: req.user.user_id,
          },
          {
            where: { client_id: item.client_id },
            transaction: t,
          }
        )
      )
    );
    const updateRecords2 = await Promise.all(
      valuesToUpdate.map((item) =>
        db.SubClients.update(
          {
            is_deleted: true,
            updated_by: req.user.user_id,
          },
          {
            where: { client_id: item.client_id },
            transaction: t,
          }
        )
      )
    );

    await t.commit();
    res.json(
      defaultValue(
        true,
        { clients: updatedRecords, subclients: updateRecords2 },
        req.body
      )
    );
    console.log("valuesToUpdate", updatedRecords);
    console.log("updateRecords2", updateRecords2);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }
    console.error(error);
    res.json(defaultValue(false, null, error.message));
  }
};

const deleteProject = async (req, res) => {
  let t;
  try {
    t = await db.sequelize.transaction();
    const valuesToUpdate = Array.isArray(req.body) ? req.body : [req.body];

    console.log("อะไรครับเนี้ย : ", req.body);

    const updatedRecords = await Promise.all(
      valuesToUpdate.map(async (item) => {
        // Check if the client has any other related projects
        const relatedProjectsCount = await db.Projects.count({
          where: { client_id: item.client_id, is_deleted: false },
        });

        if (relatedProjectsCount === 1) {
          // If there are no other related projects, update the client
          await db.Clients.update(
            {
              is_active: false,
              updated_by: req.user.user_id,
            },
            {
              where: { client_id: item.client_id },
              transaction: t,
            }
          );
          await db.SubClients.update(
            {
              is_active: false,
              updated_by: req.user.user_id,
            },
            {
              where: { client_id: item.client_id },
              transaction: t,
            }
          );
        }

        // Update the current project
        return db.Projects.update(
          {
            is_deleted: true,
            updated_by: req.user.user_id,
          },
          {
            where: { project_id: item.project_id },
            transaction: t,
          }
        );
      })
    );

    await t.commit();
    res.json(defaultValue(true, { projects: updatedRecords }, req.body));
    console.log("valuesToUpdate", updatedRecords);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }
    console.error(error);
    res.json(defaultValue(false, null, error.message));
  }
};

const deleteWork = async (req, res) => {
  let t = await db.sequelize.transaction();
  try {
    t = await db.sequelize.transaction();
    const valuesToUpdate = Array.isArray(req.body) ? req.body : [req.body];

    console.log("อะไรครับเนี้ย : ", req.body);

    const updatedRecords = await Promise.all(
      valuesToUpdate.map(async (item) => {
        // Check if the client has any other related projects
        const relatedProjectsCount = await db.Works.count({
          where: { project_id: item.project_id, is_deleted: false },
        });

        if (relatedProjectsCount === 1) {
          // If there are no other related projects, update the client
          await db.Projects.update(
            {
              is_active: false,
              updated_by: req.user.user_id,
            },
            {
              where: { project_id: item.project_id },
              transaction: t,
            }
          );
        }

        // Update the current project
        return db.Works.update(
          {
            is_deleted: true,
            updated_by: req.user.user_id,
          },
          {
            where: { work_id: item.work_id },
            transaction: t,
          }
        );
      })
    );

    await t.commit();
    res.json(defaultValue(true, { works: updatedRecords }, req.body));
    console.log("valuesToUpdate", updatedRecords);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }
    console.error(error);
    res.json(defaultValue(false, null, error.message));
  }
};

//------------------------------------------------------------- Update Zone -------------------------------------------------------------
const updateClient = async (req, res) => {
  let t;
  try {
    t = await db.sequelize.transaction();
    const valuesToUpdate = Array.isArray(req.body) ? req.body : [req.body];

    const updatedRecords = await Promise.all(
      valuesToUpdate.map((item) =>
        db.Clients.update(
          {
            client_code: item.client_code,
            client_name: item.client_name,
            updated_by: req.user.user_id,
          },
          {
            where: { client_id: item.client_id },
            transaction: t,
          }
        )
      )
    );

    const updateRecords2 = await Promise.all(
      valuesToUpdate.map((item) =>
        db.SubClients.update(
          {
            client_incharge: item.client_incharge,
            client_nickname: item.client_nickname,
            email: item.email,
            client_phone: item.client_phone,
            client_detail: item.client_detail,
            updated_by: req.user.user_id,
          },
          {
            where: { client_id: item.client_id },
            transaction: t,
          }
        )
      )
    );

    await t.commit();
    res.json(
      defaultValue(
        true,
        { clients: updatedRecords, subclients: updateRecords2 },
        req.body
      )
    );
    console.log("valuesToUpdate", updatedRecords);
    console.log("updateRecords2", updateRecords2);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }
    console.error(error);
    res.json(defaultValue(false, null, error.message));
  }
};

const updateProject = async (req, res) => {
  let t;
  try {
    t = await db.sequelize.transaction();
    const valuesToUpdate = Array.isArray(req.body) ? req.body : [req.body];
    const projectIdsToUpdate = valuesToUpdate.map((item) => item.project_id);

    // Step 1: Identify old client IDs
    const oldClientIds = await db.Projects.findAll({
      attributes: ["client_id"],
      where: { project_id: projectIdsToUpdate },
      transaction: t,
    });
    const oldGroupIds = await db.Projects.findAll({
      attributes: ["group_id"],
      where: { project_id: projectIdsToUpdate },
      transaction: t,
    });

    // Extract unique old client IDs
    const uniqueOldClientIds = [
      ...new Set(oldClientIds.map((item) => item.client_id)),
    ];
    const uniqueOldGroupIds = [
      ...new Set(oldGroupIds.map((item) => item.group_id)),
    ];

    // Step 2: Update project records
    const updatedRecords = await Promise.all(
      valuesToUpdate.map((item) =>
        db.Projects.update(
          {
            client_id: item.client_id,
            project_code: item.project_code,
            project_name: item.project_name,
            group_id: item.group_id,
            start_date: item.start_date,
            finish_date: item.finish_date,
            due_date: item.due_date,
            updated_by: req.user.user_id,
          },
          {
            where: { project_id: item.project_id },
            transaction: t,
          }
        )
      )
    );

    // Step 3: Update is_active for new client IDs
    const newClientIds = valuesToUpdate.map((item) => item.client_id);
    const newGroupIds = valuesToUpdate.map((item) => item.group_id);

    // Check if old clients are associated with other projects
    for (const oldClientId of uniqueOldClientIds) {
      const isAssociatedWithOtherProjects = await db.Projects.findOne({
        where: {
          client_id: oldClientId,
          project_id: { [db.Sequelize.Op.notIn]: projectIdsToUpdate },
        },
        transaction: t,
      });

      if (!isAssociatedWithOtherProjects) {
        // Clear is_active for old client if it's not associated with other projects
        await db.Clients.update(
          {
            is_active: false,
            updated_by: req.user.user_id,
          },
          {
            where: { client_id: oldClientId },
            transaction: t,
          }
        );
        await db.SubClients.update(
          {
            is_active: false,
            updated_by: req.user.user_id,
          },
          {
            where: { client_id: oldClientId },
            transaction: t,
          }
        );
      }
    }

    for (const oldGroupId of uniqueOldGroupIds) {
      const isAssociatedWithOtherProjects = await db.Projects.findOne({
        where: {
          group_id: oldGroupId,
          project_id: { [db.Sequelize.Op.notIn]: projectIdsToUpdate },
        },
        transaction: t,
      });

      if (!isAssociatedWithOtherProjects) {
        // Clear is_active for old client if it's not associated with other projects
        await db.Groups.update(
          {
            is_active: false,
            updated_by: req.user.user_id,
          },
          {
            where: { group_id: oldGroupId },
            transaction: t,
          }
        );
      }
    }

    // Set is_active to true for new client IDs
    await db.Clients.update(
      {
        is_active: true,
        updated_by: req.user.user_id,
      },
      {
        where: { client_id: newClientIds },
        transaction: t,
      }
    );
    await db.SubClients.update(
      {
        is_active: true,
        updated_by: req.user.user_id,
      },
      {
        where: { client_id: newClientIds },
        transaction: t,
      }
    );
    await db.Groups.update(
      {
        is_active: true,
        updated_by: req.user.user_id,
      },
      {
        where: { group_id: newGroupIds },
        transaction: t,
      }
    );

    await t.commit();
    res.json(
      defaultValue(
        true,
        {
          projects: updatedRecords,
        },
        req.body
      )
    );
    console.log("valuesToUpdate", updatedRecords);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }
    console.error(error);
    res.json(defaultValue(false, null, error.message));
  }
};

const updateWork = async (req, res) => {
  console.log("req.body", req.body);
  let t;
  try {
    t = await db.sequelize.transaction();
    const valuesToUpdate = Array.isArray(req.body) ? req.body : [req.body];
    const workIdsToUpdate = valuesToUpdate.map((item) => item.work_id);

    const oldProjectIds = await db.Works.findAll({
      attributes: ["project_id"],
      where: { work_id: workIdsToUpdate },
      transaction: t,
    });
    const oldUsersIds = await db.Works.findAll({
      attributes: ["send_to"],
      where: { project_id: workIdsToUpdate },
      transaction: t,
    });

    // Extract unique old client IDs
    const uniqueOldProjectIds = [
      ...new Set(oldProjectIds.map((item) => item.project_id)),
    ];
    const uniqueOldUsersIds = [
      ...new Set(oldUsersIds.map((item) => item.send_to)),
    ];

    const updatedRecords = await Promise.all(
      valuesToUpdate.map((item) =>
        db.Works.update(
          {
            project_id: item.project_id,
            work_code: item.work_code,
            work_name: item.work_name,
            work_type: item.work_type,
            work_level: item.work_level,
            detail: item.detail,
            start_date: item.start_date,
            end_date: item.end_date,
            total: item.total,
            send_to:
              item.send_to && item.send_to.length > 0
                ? JSON.stringify(item.send_to)
                : null,
            updated_by: req.user.user_id,
          },
          {
            where: { work_id: item.work_id },
            transaction: t,
          }
        )
      )
    );

    // Step 3: Update is_active for new client IDs
    const newProject = valuesToUpdate.map((item) => item.project_id);
    const newUsers = valuesToUpdate.map((item) => item.send_to);

    // Check if old clients are associated with other projects
    for (const oldProjectIds of uniqueOldProjectIds) {
      const isAssociatedWithOtherProjects = await db.Works.findOne({
        where: {
          project_id: oldProjectIds,
          work_id: { [db.Sequelize.Op.notIn]: workIdsToUpdate },
        },
        transaction: t,
      });

      if (!isAssociatedWithOtherProjects) {
        // Clear is_active for old client if it's not associated with other projects
        await db.Projects.update(
          {
            is_active: false,
            updated_by: req.user.user_id,
          },
          {
            where: { project_id: oldProjectIds },
            transaction: t,
          }
        );
      }
    }

    for (const oldUsersIds of uniqueOldUsersIds) {
      const isAssociatedWithOtherProjects = await db.Works.findOne({
        where: {
          send_to: oldUsersIds,
          work_id: { [db.Sequelize.Op.notIn]: workIdsToUpdate },
        },
        transaction: t,
      });

      if (!isAssociatedWithOtherProjects) {
        // Clear is_active for old client if it's not associated with other projects
        await db.Users.update(
          {
            is_active: false,
            updated_by: req.user.user_id,
          },
          {
            where: { user_id: oldUsersIds },
            transaction: t,
          }
        );
      }
    }

    // Set is_active to true for new client IDs
    await db.Projects.update(
      {
        is_active: true,
      },
      {
        where: { project_id: newProject },
        transaction: t,
      }
    );
    await db.Users.update(
      {
        is_active: true,
      },
      {
        where: { user_id: newUsers },
        transaction: t,
      }
    );

    await t.commit();
    res.json(
      defaultValue(
        true,
        {
          works: updatedRecords,
        },
        req.body
      )
    );
    console.log("valuesToUpdate", updatedRecords);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }
    console.error(error);
    res.json(defaultValue(false, null, error.message));
  }
};

const updateStatusSuccess = async (req, res) => {
  let t;
  try {
    t = await db.sequelize.transaction();
    const valuesToUpdate = Array.isArray(req.body) ? req.body : [req.body];

    const updatedRecords = await Promise.all(
      valuesToUpdate.map((item) =>
        db.Works.update(
          {
            work_status: "success",
            updated_by: req.user.user_id,
          },
          {
            where: { work_id: item.work_id },
            transaction: t,
          }
        )
      )
    );

    await t.commit();
    res.json(defaultValue(true, { works: updatedRecords }, req.body));
    console.log("valuesToUpdate", updatedRecords);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }
    console.error(error);
    res.json(defaultValue(false, null, error.message));
  }
};

// const updateStatusInprogress = async (req, res) => {
//   console.log("req.req.req", req.body);
//   let t;
//   try {
//     t = await db.sequelize.transaction();
//     const valuesToUpdate = Array.isArray(req.body) ? req.body : [req.body];

//     const updatedRecords = await Promise.all(
//       valuesToUpdate.map((item) =>
//         db.Works.update(
//           {
//             work_status: "inprogress",
//             action_status: 1,
//             stopwatch: Date.now(),
//             updated_by: req.user.user_id,
//           },
//           {
//             where: { work_id: item.work_id },
//             transaction: t,
//           }
//         )
//       )
//     );

//     await t.commit();
//     res.json(defaultValue(true, { works: updatedRecords }, req.body));
//     console.log("valuesToUpdate", updatedRecords);
//   } catch (error) {
//     if (t && !t.finished) {
//       await t.rollback();
//     }
//     console.error(error);
//     res.json(defaultValue(false, null, error.message));
//   }
// };

const updateStatusInprogress = async (req, res) => {
  console.log("req.req.req", req.body);
  let t;
  try {
    t = await db.sequelize.transaction();
    const valuesToUpdate = Array.isArray(req.body) ? req.body : [req.body];

    const updatedRecords = await Promise.all(
      valuesToUpdate.map(async (item) => {
        // const existingTimer = await Timers.findOne({
        //   where: { work_id: item.work_id },
        // });

        await db.Works.update(
          { work_status: "inprogress" },
          { where: { work_id: item.work_id }, transaction: t }
        );
      })
    );

    // const updatedRecords = await Promise.all(
    //   valuesToUpdate.map(async (item) => {
    //     const existingTimer = await Timers.findOne({
    //       where: { work_id: item.work_id },
    //     });

    //     if (existingTimer) {
    //       // Update the existing record in Timers
    //       console.log("This is true!");
    //       await existingTimer.update(
    //         {
    //           action_status: 1,
    //           stopwatch: db.sequelize.literal("NOW()"),
    //           timestamps: Date.now(),
    //           updated_by: req.user.user_id,
    //         },
    //         { transaction: t }
    //       );

    //       // Update the work_status in Works
    //       await db.Works.update(
    //         { work_status: "inprogress" },
    //         { where: { work_id: item.work_id }, transaction: t }
    //       );
    //     } else {
    //       // Create a new record in Timers
    //       console.log("This is false!");
    //       await Timers.create(
    //         {
    //           work_id: item.work_id,
    //           action_status: 1,
    //           stopwatch: db.sequelize.literal("NOW()"),
    //           timestamps: Date.now(),
    //           updated_by: req.user.user_id,
    //         },
    //         { transaction: t }
    //       );

    //       // Update the work_status in Works
    //       await db.Works.update(
    //         { work_status: "inprogress" },
    //         { where: { work_id: item.work_id }, transaction: t }
    //       );
    //     }
    //   })
    // );

    await t.commit();
    res.json(defaultValue(true, { works: updatedRecords }, req.body));
    console.log("valuesToUpdate", updatedRecords);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }
    console.error(error);
    res.json(defaultValue(false, null, error.message));
  }
};

const updateStopwatch = async (req, res) => {
  console.log("req.req.req", req.body);
  let t;
  try {
    t = await db.sequelize.transaction();
    const valuesToUpdate = Array.isArray(req.body) ? req.body : [req.body];

    const updatedRecords = await Promise.all(
      valuesToUpdate.map(async (item) => {
        const existingTimer = await db.Timers.findOne({
          where: { work_id: item.work_id },
        });

        if (existingTimer) {
          // Update the existing record in Timers
          console.log("This is true!");
          await existingTimer.update(
            {
              action_status: 1,
              stopwatch: db.sequelize.literal("NOW()"),
              timestamps: Date.now(),
              updated_by: req.user.user_id,
            },
            { transaction: t }
          );

          // Update the work_status in Works
          await db.Works.update(
            { work_status: "inprogress" },
            { where: { work_id: item.work_id }, transaction: t }
          );
        } else {
          // Create a new record in Timers
          console.log("This is false!");
          await db.Timers.create(
            {
              work_id: item.work_id,
              action_status: 1,
              stopwatch: db.sequelize.literal("NOW()"),
              timestamps: Date.now(),
              updated_by: req.user.user_id,
              created_by: req.user.user_id,
              is_deleted: false,
            },
            { transaction: t }
          );

          // Update the work_status in Works
          await db.Works.update(
            { work_status: "inprogress" },
            { where: { work_id: item.work_id }, transaction: t }
          );
        }
      })
    );

    await t.commit();
    res.json(defaultValue(true, { works: updatedRecords }, req.body));
    console.log("valuesToUpdate", updatedRecords);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }
    console.error(error);
    res.json(defaultValue(false, null, error.message));
  }
};

const updateStopwatchStop = async (req, res) => {
  console.log("req.req.req", req.body);
  let t;
  try {
    t = await db.sequelize.transaction();
    const valuesToUpdate = Array.isArray(req.body) ? req.body : [req.body];

    const updatedRecords = await Promise.all(
      valuesToUpdate.map(async (item) => {
        // Fetch the current record to get the current sum_time
        const currentRecord = await db.Timers.findOne({
          attributes: ["sum_time", "stopwatch"],
          where: { work_id: item.work_id },
          transaction: t,
        });

        const newTimeResult = await db.sequelize.query(
          "SELECT NOW() AS currentTime",
          {
            type: db.sequelize.QueryTypes.SELECT,
          }
        );

        // Format the current time as HH:mm:ss
        const currentTimestamp =
          newTimeResult[0].currentTime.toLocaleTimeString("en-US", {
            hour12: false,
          });
        const newTimeUpdate = currentTimestamp.replace(/:/g, "");
        const oldTime = currentRecord.stopwatch.replace(/:/g, "");
        const totalOfTime = newTimeUpdate - oldTime;

        console.log("currentRecord", totalOfTime);

        const currentSumTime = currentRecord ? currentRecord.sum_time : 0;

        // Calculate the updated sum_time
        const updatedSumTime = currentSumTime + totalOfTime;

        // Update the record with the new sum_time value
        return db.Timers.update(
          {
            stopwatch: newTimeUpdate,
            action_status: 0,
            updated_by: req.user.user_id,
            sum_time: updatedSumTime,
          },
          {
            where: { work_id: item.work_id },
            transaction: t,
          }
        );
      })
    );

    await t.commit();
    res.json(defaultValue(true, { works: updatedRecords }, req.body));
    // console.log("valuesToUpdate", updatedRecords);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }
    console.error(error);
    res.json(defaultValue(false, null, error.message));
  }
};

module.exports = {
  fetchDataClient,
  fetchSubDataClient,
  fetchSubDataProject,
  fetchDataProject,
  fetchDataWork,
  fetchGetWorkCode,
  createClient,
  createProject,
  createWork,
  demoCreateWork,
  deleteClient,
  deleteProject,
  deleteWork,
  updateClient,
  updateProject,
  updateWork,
  updateStatusSuccess,
  updateStatusInprogress,
  updateStopwatch,
  updateStopwatchStop,
  fetchTaskProject,
};
