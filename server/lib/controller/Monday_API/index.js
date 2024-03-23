const axios = require("axios");
const db = require("../../../models");
const { create, bulk_create, destroy, update } = require("../../repositories");
const { defaultValue } = require("../../../services/defaultValue");
const service = require("undefined-service-api");
const moment = require("moment");

const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjI2Mjc2ODQyMywiYWFpIjoxMSwidWlkIjozNjk4NDYwNSwiaWFkIjoiMjAyMy0wNi0xNVQwNzo0NToxMC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTQzMTk2NzMsInJnbiI6InVzZTEifQ.bYfS0zjDKP1J-SdEp2B_Zi0U2NE9JkwRKuSN-_kjo9k";
const apiUrl = "https://api.monday.com/v2";

const getMondayData = async (req, res) => {
  const boardId = req.body;
  console.log("This is sparta", boardId);

  try {
    const response = await axios.post(
      apiUrl,
      {
        query: `
          query GetBoardData($ids: [Int]) {
            boards(ids: $ids) {
              name
              items {
                id
                name
                column_values(ids : ["status", "person"]){
                  id
                  title
                  value
                  text
                }
              }
            }
          }
        `,
        variables: {
          ids: Object.keys(boardId).map(Number),
        },
      },
      {
        headers: {
          Authorization: apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;

    console.log(data);
    res.json(defaultValue(true, data, ""));
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, null, "Error retrieving Monday data"));
  }
};

const getDataAll = async (req, res) => {
  const boardIds = req.body; // Expect an array of board IDs
  const newIds = boardIds.map((board) => parseInt(board.boards_id));
  const projectName = boardIds.map((board) => board.project_name).toString();
  const groups = boardIds.map((board) => board.group);
  const newGroups = groups.map((board) => board.data.users);

  console.log("Project Name:", newGroups);
  try {
    const response = await axios.post(
      apiUrl,
      {
        query: `
          query {
            boards(ids: ${JSON.stringify(newIds)}) {
              name
              items {
                id
                name
                column_values {
                  id
                  title
                  value
                  text
                }
              }
            }
          }
        `,
      },
      {
        headers: {
          Authorization: apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    const boards = response.data.data.boards;

    // Create or update the project header
    const [mondayHeader, created] = await db.Monday_header.findOrCreate({
      where: { mondayhd_id: newIds[0] }, // Use the first ID (or another appropriate value)
      defaults: {
        mondayhd_id: newIds[0],
        mondayhd_name: projectName,
        created_by: req.user.user_id,
        updated_by: req.user.user_id,
        is_active: 0,
        is_deleted: 0,
      },
    });

    for (const board of boards) {
      for (const item of board.items) {
        const paddingLeft = (text, paddingValue) => {
          return String(paddingValue + text).slice(-paddingValue.length);
        };

        let _condition = {
          limit: 1,
          order: [["work_code", "DESC"]],
        };

        const data = await db.Mondays.findAll(_condition);
        let newDocNo = "";
        let newDocNo2 = "";
        let newDocNo3 = "";
        const date = new Date();
        const yy = date.getFullYear().toString().slice(-2);
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        if (data && data.length > 0) {
          const _docNo = data[0].dataValues["work_code"];
          if (_docNo && _docNo.split("-").length > 1) {
            let _runningNo = parseInt(_docNo.split("-")[1]) + 1;
            newDocNo = `${"MN"}${yy}${mm}-${paddingLeft(_runningNo, "00000")}`;
            newDocNo2 = `${"MN"}${yy}${mm}-${paddingLeft(
              _runningNo + 1,
              "00000"
            )}`;
            newDocNo3 = `${"MN"}${yy}${mm}-${paddingLeft(
              _runningNo + 2,
              "00000"
            )}`;
          }
        } else {
          newDocNo = `${"MN"}${yy}${mm}-${("00000" + 1).slice(-5)}`;
          newDocNo2 = `${"MN"}${yy}${mm}-${("00000" + 2).slice(-5)}`;
          newDocNo3 = `${"MN"}${yy}${mm}-${("00000" + 3).slice(-5)}`;
        }

        // Initialize variables for email, Point Dev, and Point QA
        let email_front = [];
        let email_back = [];
        let email_qa = [];
        let pointDevFront = 0;
        let pointDevBack = 0;
        let pointQA = 0;
        let person_front = "";
        let person_back = "";
        let person_qa = "";
        let monday_status = "";
        let start_date = "";
        let end_date = "";
        let priority = "";
        let status = "";

        for (const column of item.column_values) {
          const columnValue = JSON.parse(column.value);
          // console.log("columnValue123", item);

          if (column.title === "Front End") {
            person_front = column.text;
            if (columnValue && columnValue.personsAndTeams) {
              const personsAndTeams = columnValue.personsAndTeams;
              const ids = personsAndTeams.map((person) => person.id);

              for (const group of newGroups[0]) {
                if (ids.includes(group.id)) {
                  email_front.push(group.email);
                }
              }
            }
          } else if (column.title === "QA") {
            person_qa = column.text;
            if (columnValue && columnValue.personsAndTeams) {
              const personsAndTeams = columnValue.personsAndTeams;
              const ids = personsAndTeams.map((person) => person.id);

              for (const group of newGroups[0]) {
                if (ids.includes(group.id)) {
                  email_qa.push(group.email);
                }
              }
            }
          } else if (column.title === "Back End") {
            person_back = column.text;
            if (columnValue && columnValue.personsAndTeams) {
              const personsAndTeams = columnValue.personsAndTeams;
              const ids = personsAndTeams.map((person) => person.id);

              for (const group of newGroups[0]) {
                if (ids.includes(group.id)) {
                  email_back.push(group.email);
                }
              }
            }
          } else if (column.title === "Point Front (Day)") {
            pointDevFront = parseFloat(column.text) || 0;
          } else if (column.title === "Point Back (Day)") {
            pointDevBack = parseFloat(column.text) || 0;
          } else if (column.title === "Point QA (Day)") {
            pointQA = parseFloat(column.text) || 0;
          } else if (column.title === "Status") {
            monday_status = column.text;
          } else if (column.title === "Timeline") {
            if (columnValue && columnValue.from && columnValue.to) {
              start_date = columnValue.from;
              end_date = columnValue.to;
            }
          } else if (column.title === "Priority") {
            priority = column.text;
          } else if (column.title === "Status") {
            status = column.text;
          }
        }

        // Debug logging to check email_front information
        console.log("email_front.length:", email_front.length);

        // Debug logging to check if an existing record for Front End is found

        //This is test other
        if (item.name !== "Subitem") {
          // Check if an existing record exists for email_front
          const existingRecord = await db.Mondays.findOne({
            where: {
              monday_id: item.id,
              project_subid: mondayHeader.project_subid,
              users_type: "Dev",
            },
          });
          if (email_front.length > 0) {
            if (existingRecord) {
              console.log("Front End Person:", person_front);
              console.log("Front End Email:", email_front);
              await existingRecord.update({
                email: email_front.join(","),
                monday_name: item.name,
                monday_status: monday_status,
                point: pointDevFront * 8 * 60,
                updated_by: req.user.user_id,
                owner: person_front,
                start_date: start_date,
                end_date: end_date,
                work_level: priority,
                monday_status: status,
                is_active: 0,
                is_deleted: 0,
              });
            } else {
              await db.Mondays.create({
                work_code: newDocNo,
                monday_id: item.id,
                email: email_front.join(","),
                monday_name: item.name,
                monday_status: monday_status,
                owner: person_front,
                users_type: "Dev",
                point: pointDevFront * 8 * 60,
                project_subid: mondayHeader.project_subid,
                created_by: req.user.user_id,
                updated_by: req.user.user_id,
                start_date: start_date,
                end_date: end_date,
                work_level: priority,
                monday_status: status,
                is_active: 0,
                is_deleted: 0,
              });
            }
          }
          if (email_back.length > 0) {
            console.log("email_back.length:", email_back.length);
            if (existingRecord) {
              await existingRecord.update({
                email: email_back.join(","),
                monday_name: item.name,
                monday_status: monday_status,
                point: pointDevBack * 8 * 60,
                updated_by: req.user.user_id,
                owner: person_back,
                start_date: start_date,
                end_date: end_date,
                work_level: priority,
                monday_status: status,
                is_active: 0,
                is_deleted: 0,
              });
            } else {
              await db.Mondays.create({
                work_code: newDocNo2,
                monday_id: item.id,
                email: email_back.join(","),
                monday_name: item.name,
                monday_status: monday_status,
                owner: person_back,
                users_type: "Dev",
                point: pointDevBack * 8 * 60,
                project_subid: mondayHeader.project_subid,
                created_by: req.user.user_id,
                updated_by: req.user.user_id,
                start_date: start_date,
                end_date: end_date,
                work_level: priority,
                monday_status: status,
                is_active: 0,
                is_deleted: 0,
              });
            }
          }

          // Check if an existing record exists for email_qa
          if (email_qa.length > 0) {
            console.log("email_qa", email_qa.length);
            const emailQaRecord = await db.Mondays.findOne({
              where: {
                monday_id: item.id,
                project_subid: mondayHeader.project_subid,
                users_type: "QA",
              },
            });

            if (emailQaRecord) {
              await emailQaRecord.update({
                email: email_qa.join(","),
                monday_name: item.name,
                monday_status: monday_status,
                point: pointQA * 8 * 60,
                updated_by: req.user.user_id,
                owner: person_qa,
                work_level: priority,
                monday_status: status,
                start_date: start_date,
                end_date: end_date,
                is_active: 0,
                is_deleted: 0,
              });
            } else {
              await db.Mondays.create({
                work_code: newDocNo3,
                monday_id: item.id,
                email: email_qa.join(","),
                monday_name: item.name,
                monday_status: monday_status,
                owner: person_qa,
                point: pointQA * 8 * 60,
                users_type: "QA",
                work_level: priority,
                project_subid: mondayHeader.project_subid,
                created_by: req.user.user_id,
                updated_by: req.user.user_id,
                start_date: start_date,
                end_date: end_date,
                is_active: 0,
                is_deleted: 0,
              });
            }
          }
        }
      }
    }

    res.json(
      defaultValue(true, boards, "Records created or updated in the database")
    );
  } catch (error) {
    console.error("Error:", error);
    res.json(defaultValue(false, null, "Error retrieving Monday data"));
  }
};

const getBoardId = async (req, res) => {
  try {
    const response = await axios.post(
      apiUrl,
      {
        query: `
          query {
            boards (limit : 500){
              id
              name
            }
          }
        `,
      },
      {
        headers: {
          Authorization: apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;

    console.log(data);
    res.json(defaultValue(true, data, ""));
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, null, "Error retrieving Monday data"));
  }
};

const parseData = (data) => {
  if (data) {
    const _data = JSON.parse(JSON.stringify(data));
    data = _data;
  }
  return data;
};

const fetchMondayUser = async (req, res) => {
  try {
    const response = await axios.post(
      apiUrl,
      {
        query: `
          query {
            users{
              id
              name
             email
            }
          }
        `,
      },
      {
        headers: {
          Authorization: apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;

    console.log(data);
    res.json(defaultValue(true, data, ""));
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, null, "Error retrieving Monday data"));
  }
};

const createMonday = async (req, res) => {
  let t;
  try {
    t = await db.sequelize.transaction();

    const valuesToCreate = req.body.map((item) => ({
      mondayId: item.id,
      mondayProName: item.projectName,
      startDate: item.startDate,
      endDate: item.endDate,
      userId: req.user.userId,
      sumTime: item.sumTime,
      mondaySubName: item.subitemName,
      owner: item.owner,
      email: item.email,
      mondayStatus: item.status,
      statusOnHand: item.statusOnHand,
      timer: item.timer,
    }));

    const createdRecords = await db.Mondays.bulkCreate(valuesToCreate, {
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

const fetchMonday = async (req, res) => {
  try {
    let Monday_headers = await db.Monday_header.findAll({
      where: {
        is_deleted: false,
      },
      include: [
        {
          model: db.Mondays,
          required: false,
        },
      ],
    });

    let result = [];
    if (Monday_headers && Monday_headers.length > 0) {
      Monday_headers = parseData(Monday_headers);
      Monday_headers.map((item) => {
        if (item.Mondays && item.Mondays.length > 0) {
          item.Mondays.map((work) => {
            let sum_time = 0;
            let action_status = 0;
            let timestamps = 0;
            if (work.Timers && work.Timers.length > 0) {
              work.Timers.map((timer) => {
                sum_time += timer.sum_time;
                action_status += timer.action_status;
                timestamps += timer.timestamps;

                let data = {
                  mondayhd_id: work.mondayhd_id,
                  work_id: work.work_id,
                  work_code: work.work_code,
                  work_name: work.monday_name,
                  work_level: work.work_level,
                  sum_time: sum_time,
                  action_status: action_status,
                  timestamps: timestamps,
                  send_to: timer.email,
                  total: timer.point,
                  start_date: moment(timer.start_date).format("DD-MM-YYYY"),
                  end_date: moment(timer.end_date).format("DD-MM-YYYY"),
                  created_by: timer.created_by,
                  created_date: timer.created_date,
                  is_active: timer.is_active,
                  is_deleted: timer.is_deleted,
                };
                result.push(data);
              });
            }
          });
        }
      });
    }
    // console.log("Monday_headers", result);
    res.json(defaultValue(true, result, ""));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json(defaultValue(false, null, "Error retrieving fetchWork data"));
  }
};

const getProjectName = async (req, res) => {
  try {
    const responsePname = await axios.post(
      apiUrl,
      {
        query: `
        query {
          boards {
            id
            name
            items {
              id
              column_values {
                id
                title
                value
              }
            }
          }
          users {
            name
            id
          }
        }
        `,
      },
      {
        headers: {
          Authorization: apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    const data = responsePname.data;

    console.log(data);
    res.json(defaultValue(true, data, ""));
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, null, "Error retrieving Monday data"));
  }
};

module.exports = {
  getMondayData,
  getBoardId,
  fetchMondayUser,
  getDataAll,
  createMonday,
  fetchMonday,
  getProjectName,
};
