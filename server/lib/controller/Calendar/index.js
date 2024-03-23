const db = require("../../../models");
const { defaultValue } = require("../../../services/defaultValue");
require("dotenv").config();
const axios = require("axios");

const apiHolidayThaiBank = async (req, res) => {
  let t;
  try {
    t = await db.sequelize.transaction();
    const apiKey = "2e983d8c-dcca-4470-99dc-44e5dcd83bec";
    const apiUrl =
      "https://apigw1.bot.or.th/bot/public/financial-institutions-holidays/";

    // Make the API request with axios
    const response = await axios.get(apiUrl, {
      headers: {
        "X-IBM-Client-Id": apiKey,
      },
    });

    // Handle the API response here
    const data = response.data.result.data;

    for (const item of data) {
      const processedData = {
        start_date: `${item.Date} 09:00:00.000`,
        end_date: `${item.Date} 18:00:00.000`,
        calendar_title: item.HolidayDescription,
        dettail: "",
        created_by: "system",
        updated_by: "system",
        calendar_type: "holiday",
        color: "#f5222d",
        text_color: "#fff",
        all_day: true,
        is_active: true,
        is_deleted: false,
      };

      const createdHoliday = await db.Calendars.create(processedData, {
        transaction: t,
      });
    }

    await t.commit();
    res.json(defaultValue(true, data, "yes wedo this"));
  } catch (error) {
    console.error("API Request Error:", error);
  }
};

const apiHolidayThaiBankExport = async (req, res) => {
  // let t;
  try {
    // t = await db.sequelize.transaction();
    const apiKey = "2e983d8c-dcca-4470-99dc-44e5dcd83bec";
    const apiUrl =
      "https://apigw1.bot.or.th/bot/public/financial-institutions-holidays/";

    // Make the API request with axios
    const response = await axios.get(apiUrl, {
      headers: {
        "X-IBM-Client-Id": apiKey,
      },
    });

    // Handle the API response here
    const data = response.data.result.data;

    let dataExport = [];

    for (const item of data) {
      const processedData = {
        start_date: `${item.Date} 09:00:00.000`,
        end_date: `${item.Date} 18:00:00.000`,
        calendar_title: item.HolidayDescription,
        dettail: "",
        created_by: "system",
        updated_by: "system",
        calendar_type: "holiday",
        color: "#f5222d",
        text_color: "#fff",
        all_day: true,
        // is_active: true,
        // is_deleted: false,
      };

      dataExport.push(processedData);
    }

    // await t.commit();
    res.json(defaultValue(true, dataExport, "yes wedo this"));
  } catch (error) {
    console.error("API Request Error:", error);
  }
};

const fetchHolidays = async (req, res) => {
  try {
    const values = await db.Calendars.findAll({
      where: {
        is_deleted: false,
      },
    });

    res.json(defaultValue(true, values, "yes wedo this"));
  } catch (error) {
    console.error("API Request Error:", error);
  }
};

const createEvent = async (req, res) => {
  let t;
  try {
    t = await db.sequelize.transaction();
    const valueEvent = {
      calendar_type: req.body.type,
      calendar_title: req.body.title,
      detail: req.body.detail,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      all_day: req.body.allday,
      color: req.body.color,
      text_color: req.body.textColor,
      created_by: req.user.user_id,
      updated_by: req.user.user_id,
      is_active: true,
      is_deleted: false,
    };

    const values = await db.Calendars.create(valueEvent, {
      transaction: t,
    });

    await t.commit();
    res.json(defaultValue(true, values, "yes wedo this"));
  } catch (error) {
    console.error("API Request Error:", error);
  }
};

const updateEvent = async (req, res) => {
  let t;
  try {
    t = await db.sequelize.transaction();
    const valueEvent = {
      calendar_type: req.body.type,
      detail: req.body.detail,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      all_day: req.body.allday,
      color: req.body.color,
      text_color: req.body.textColor,
      created_by: req.user.user_id,
      updated_by: req.user.user_id,
      is_active: true,
      is_deleted: false,
    };

    const values = await db.Calendars.update(valueEvent, {
      where: {
        calendar_id: req.body.id,
      },
      transaction: t,
    });

    await t.commit();
    res.json(defaultValue(true, values, "yes wedo this"));
  } catch (error) {
    console.error("API Request Error:", error);
  }
};

const deleteEvent = async (req, res) => {
  let t;
  try {
    t = await db.sequelize.transaction();
    const deleted = await db.Calendars.update(
      { is_deleted: true, is_active: false },
      { where: { calendar_id: req.body.id }, transaction: t }
    );

    await t.commit();
    res.json(defaultValue(true, deleted, "yes wedo this"));
  } catch (error) {
    console.error("API Request Error:", error);
  }
};

const createEventfile = async (req, res) => {
  let t;
  try {
    t = await db.sequelize.transaction();
    console.log(req.body);
    const data = req.body;
    for (const item of data) {
      let type = item.Type.toLowerCase();
      console.log("type", type);
      const Enumcalendar = await db.Enum_table.findAll({
        where: {
          enum_code: type,
          is_deleted: false,
          enum_type: "CalendarType",
        },
      }).catch((error) => {
        console.error("Error while querying the database:", error);
      });

      console.log("enumcalendar", Enumcalendar.map((i) => i.enum_id)[0]);

      const colorset =
        type === "holiday"
          ? type === "weekend"
            ? "#818181"
            : "#FF4446"
          : "#166CFF";
      const processedData = {
        start_date: `${item.StartDatetime}:00.000`,
        end_date: `${item.EndDatetime}:00.000`,
        calendar_title: item.Title,
        detail: item.Description,
        created_by: req.user.user_id,
        updated_by: req.user.user_id,
        calendar_type: Enumcalendar.map((i) => i.enum_id)[0],
        color: colorset,
        text_color: "#fff",
        all_day: item.Allday,
        is_active: true,
        is_deleted: false,
      };

      console.log("processedData", processedData);
      const createdHoliday = await db.Calendars.create(processedData, {
        transaction: t,
      });
    }

    await t.commit();
    res.json(defaultValue(true, req.body, "yes wedo this"));
  } catch (error) {
    console.error("API Request Error:", error);
  }
};

module.exports = {
  apiHolidayThaiBank,
  fetchHolidays,
  createEvent,
  updateEvent,
  deleteEvent,
  createEventfile,
  apiHolidayThaiBankExport,
};
