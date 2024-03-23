const db = require("../../../models");
const { create, bulk_create, destroy, update } = require("../../repositories");
const { defaultValue } = require("../../../services/defaultValue");
const service = require("undefined-service-api");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const moment = require("moment");

const createTimeSheet = async (req, res) => {
  console.log("new data values", req.body);
  let t = await db.sequelize.transaction();
  if (req.body.timeSheetHd) {
    let timeSheetHd = {
      timesheet_date: moment(req.body.timeSheetHd.timesheet_date).format(
        "YYYY/MM/DD"
      ),
      user_id: req.user.user_id,
      created_by: req.user.user_id,
      updated_by: req.user.user_id,
    };
    const createsHd = await create(db.TimeSheetHDs, timeSheetHd, t);
    console.log("TimeSheetHDs", createsHd);
    let timeSheetDt = [];
    req.body.timeSheetDt.map((e, i) => {
      let Value = {
        start_time: e.timeStart,
        end_time: e.timeEnd,
        detail: e.detail,
        work_id: e.work_id,
        work_code: e.work_code,
        work_name: e.work_name,
        project_name: e.project_name,
        work_type: e.work_type,
        update_by: e.updateBy,
        created_by: req.user.user_id,
        updated_by: req.user.user_id,
        timesheethd_id: createsHd.dataValues.timesheethd_id,
        is_deleted: false,
        total: e.total,
      };

      timeSheetDt.push(Value);
    });
    const createsDt = await bulk_create(db.TimeSheetDTs, timeSheetDt, t);
    console.log("CreatesDt in timesheet", createsDt);
    // console.log(t)
    t.commit();
    res.json(defaultValue(true, createsHd, ""));
  } else {
    res.json(defaultValue(false, null, "Error to save"));
  }
};

const deleteTimeSheet = async (req, res) => {
  console.log("oHHHH NOoooo", req.body);
  let t = await db.sequelize.transaction();
  if (req.body.timesheetdt_id) {
    const deleteUpdate = await update(
      db.TimeSheetDTs,
      { is_deleted: true },
      { timesheetdt_id: req.body.timesheetdt_id }, // Update the property name here
      t
    );
  }
  const dataTimeSheet = await db.TimeSheetHDs.findAll({
    where: {
      user_id: req.user.user_id,
      timesheet_date: moment(req.body.timesheet_date).format("YYYY/MM/DD"),
    },
    include: [
      {
        model: db.TimeSheetDTs,
        required: false,
      },
    ],
  });
  t.commit();
  res.json(defaultValue(true, null, ""));
};

// const updateTimeSheet = async (req, res) => {
//   let t = await db.sequelize.transaction();
//   if (req.body) {
//     let timeSheetDt = [];
//     req.body.timeSheetDt.map(async (e, i) => {
//       console.log("eeeeeeee", req.body.timeSheetHd.timesheethd_id);
//       if (e.timesheetdt_id) {
//         const updateDt = await update(
//           db.TimeSheetDTs,
//           {
//             start_time: e.timeStart,
//             end_time: e.timeEnd,
//             detail: e.detail,
//             // work_id: e.work_id,
//             work_code: e.work_code,
//             work_name: e.work_name,
//             project_name: e.project_name,
//             work_type: e.work_type,
//             created_by: req.user.user_id,
//             updated_by: req.user.user_id,
//             is_deleted: false,
//             total: e.total,
//           },
//           { timesheetdt_id: e.timesheetdt_id },
//           t
//         );
//       } else {
//         let Value = {
//           start_time: e.timeStart,
//           end_time: e.timeEnd,
//           detail: e.detail,
//           work_id: e.work_id,
//           work_code: e.work_code,
//           work_name: e.work_name,
//           project_name: e.project_name,
//           work_type: e.work_type,
//           created_by: req.user.user_id,
//           updated_by: req.user.user_id,
//           is_deleted: false,
//           timesheethd_id: req.body.timeSheetHd.timesheethd_id,
//           total: e.total,
//         };
//         timeSheetDt.push(Value);
//         console.log("Value", Value);
//       }
//     });
//     if (timeSheetDt.length > 0) {
//       const createsDt = await bulk_create(db.TimeSheetDTs, timeSheetDt, t);
//     }
//   }
//   t.commit();
//   res.json(defaultValue(true, null, ""));
// };

const updateTimeSheet = async (req, res) => {
  let t = await db.sequelize.transaction();
  if (req.body) {
    let timeSheetDt = [];
    req.body.timeSheetDt.map(async (e, i) => {
      console.log("eeeeeeee", req.body.timeSheetHd.timesheethd_id);
      if (e.timesheetdt_id) {
        // Update existing time entry
        const start_time = new Date(e.timeStart);
        const end_time = new Date(e.timeEnd);
        const total = (end_time - start_time) / 1000 / 60; // Calculate total in minutes
        const updateDt = await update(
          db.TimeSheetDTs,
          {
            start_time: e.timeStart,
            end_time: e.timeEnd,
            detail: e.detail,
            work_code: e.work_code,
            work_name: e.work_name,
            project_name: e.project_name,
            work_type: e.work_type,
            created_by: req.user.user_id,
            updated_by: req.user.user_id,
            is_deleted: false,
            total: total,
          },
          { timesheetdt_id: e.timesheetdt_id },
          t
        );
      } else {
        // Insert new time entry
        let Value = {
          start_time: e.timeStart,
          end_time: e.timeEnd,
          detail: e.detail,
          work_id: e.work_id,
          work_code: e.work_code,
          work_name: e.work_name,
          project_name: e.project_name,
          work_type: e.work_type,
          created_by: req.user.user_id,
          updated_by: req.user.user_id,
          is_deleted: false,
          timesheethd_id: req.body.timeSheetHd.timesheethd_id,
          total: e.total,
        };
        timeSheetDt.push(Value);
        console.log("Value", Value);
      }
    });

    if (timeSheetDt.length > 0) {
      const createsDt = await bulk_create(db.TimeSheetDTs, timeSheetDt, t);
    }
  }
  t.commit();
  res.json(defaultValue(true, null, ""));
};

const fetchTimeSheetByDate = async (req, res) => {
  console.log("req.user.userId", req.user.user_id);
  const dataTimeSheet = await db.TimeSheetHDs.findAll({
    where: {
      user_id: req.user.user_id,
      timesheet_date: moment(req.body.timesheet_date).format("YYYY/MM/DD"), // Use the correct column name
      is_deleted: false,
    },
    include: [
      {
        model: db.TimeSheetDTs,
        required: false,
        where: { is_deleted: false },
      },
    ],
    order: [["TimeSheetDTs", "start_time", "ASC"]],
  });
  console.log(dataTimeSheet);

  res.json(defaultValue(true, dataTimeSheet, ""));
};

const parseData = (data) => {
  if (data) {
    const _data = JSON.parse(JSON.stringify(data));
    data = _data;
  }
  return data;
};

const dataReport = async (req, res) => {
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
                  model: db.TimeSheetDTs,
                  required: true,
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
        let data = {
          client_id: item.client_id,
          client_name: item.client_name,
        };
        if (item.Projects && item.Projects.length > 0) {
          item.Projects.map((project) => {
            data = {
              ...data,
              project_id: project.project_id,
              project_name: project.project_name,
              group_id: project.group_id,
            };
            if (project.Works && project.Works.length > 0) {
              project.Works.map((work) => {
                data = {
                  ...data,
                  work_id: work.work_id,
                  work_code: work.work_code,
                  work_name: work.work_name,
                  send_to: work.send_to,
                  total: work.total,
                  start_date: moment(work.start_date).format("DD-MM-YYYY"),
                  end_date: moment(work.end_date).format("DD-MM-YYYY"),
                  created_by: work.created_by,
                  created_date: work.created_date,
                  is_active: work.is_active,
                  is_deleted: work.is_deleted,
                  sum_time: work.sum_time,
                };
                if (work.TimeSheetDTs && work.TimeSheetDTs.length > 0) {
                  work.TimeSheetDTs.map((timesheet) => {
                    data = {
                      ...data,
                      start_time: timesheet.start_time,
                      end_time: timesheet.end_time,
                      total_timesheet: timesheet.total,
                    };
                    result.push(data);
                  });
                }
              });
            }
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

module.exports = {
  createTimeSheet,
  fetchTimeSheetByDate,
  deleteTimeSheet,
  updateTimeSheet,
  dataReport,
};
