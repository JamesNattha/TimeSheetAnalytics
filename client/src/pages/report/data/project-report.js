import {useMemo} from "react";
import moment from "moment";

///เพิ่ม Position

const useNewPerson = (projectData, fetchData, positionData) => {
  const data = projectData;
  const user = fetchData;
  const positionInfo = positionData;
  // console.log("data test", data);
  // console.log("data raw", projectData);
  // console.log("data raw", positionInfo);

  const NameUser = (user, userid) => {
    let result;
    if (userid) {
      const datauser = user.filter((item) => item.user_id === userid);
      result = datauser.map((item) => item.first_name) + " " + datauser.map((item) => item.last_name);
      // console.log("result test", result);
      return result;
    }
  };

  const PositionUser = (user, userid) => {
    let result;
    if (userid) {
      const datauser = user.filter((item) => item.user_id === userid);
      result = datauser.map((item) => item.Profiles);
      let resultPosition = result[0].map((item) => item.position_id);
      // console.log("result test", resultPosition[0]);
      return resultPosition[0];
    }
  };

  const PositionNameUser = (user, positionInfo, userid) => {
    // console.log("positionData", positionInfo);
    let result;
    if (userid) {
      const datauser = user.filter((item) => item.user_id === userid);
      result = datauser.map((item) => item.Profiles);
      let resultPosition = result[0].map((item) => item.position_id);
      // console.log("result test", resultPosition[0]);
      let positiondata = positionInfo.filter((item) => item.position_id === resultPosition[0]);
      let positionname = positiondata.map((item) => item.position_name); // position_name
      return positionname[0];
    }
  };

  const mergeTimesheets = (timesheets) => {
    const mergedTimesheets = {};
    // console.log("in func timesheets", timesheets);
    timesheets.forEach((timesheet) => {
      const key = `${timesheet.work_id}_${timesheet.updated_by}`;

      if (!mergedTimesheets[key]) {
        // If work_id and updated_by combination is encountered for the first time, create a new entry
        mergedTimesheets[key] = {...timesheet};
      } else {
        // If work_id and updated_by combination is already present, update the total
        mergedTimesheets[key].total += timesheet.total;
      }
    });

    // Convert the mergedTimesheets object back to an array
    const result = Object.values(mergedTimesheets);

    return result;
  };

  function minutesToHours(minutes) {
    // Check if the input is a valid number
    if (typeof minutes !== "number" || isNaN(minutes)) {
      return "Invalid input";
    }

    // Calculate hours and remaining minutes
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    // Construct the result string
    const result = `${hours} h ${remainingMinutes} m`;

    return result;
  }

  function minutesToHoursNotRemain(minutes) {
    // Check if the input is a valid number
    if (typeof minutes !== "number" || isNaN(minutes)) {
      return "Invalid input";
    }

    // Calculate hours and remaining minutes
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    // Construct the result string
    const result = `${hours} h`;

    return result;
  }

  const summaryAssignTime = (data) => {
    let summary = 0;
    data.map((total) => {
      summary += parseInt(total.total);
    });
    return summary;
  };

  const summaryActualTime = (data) => {
    let summaryActual = 0;
    data.map((total) => {
      total.map((result) => {
        // console.log("total", result.total);
        summaryActual += parseInt(result.total);
      });
    });
    return summaryActual;
  };

  const formattedData = useMemo(() => {
    const rows = [];
    if (data && positionInfo) {
      data.map((data, i) => {
        let count = i + 1;
        let result = 0;
        const row = {
          autoNumber: count,
          no_hidden: count,
          project_code: data.project_code,
          project_name: data.project_name,
          worker_name: "",
          work_code: "",
          position_hidden: "",
          position_code: "",
          position_name: "",
          type: "project",
          work_name: "",
          start_date: moment(data.start_date).format("DD-MM-YYYY"),
          end_date: moment(data.finish_date).format("DD-MM-YYYY"),
          assign_time: minutesToHoursNotRemain(summaryAssignTime(data.Works)),
          actual_time: minutesToHours(summaryActualTime(data.Works.map((item) => item.TimeSheetDTs))),
          total: minutesToHours(summaryAssignTime(data.Works) - summaryActualTime(data.Works.map((item) => item.TimeSheetDTs)))
          // timesheets: data.Works
        };
        rows.push(row);

        if (data.Works || data.Works.lenght > 0) {
          data.Works.map((work, index) => {
            if (work) {
              const timesheetdata = mergeTimesheets(work.TimeSheetDTs);

              timesheetdata.map((timesheet, int) => {
                let counttable = index + 1;
                // counttable += 1;
                const row = {
                  autoNumber: counttable,
                  no_hidden: count,

                  project_code: "",
                  project_name: data.project_name,
                  worker_name: NameUser(user, timesheet.updated_by),
                  position_code: PositionUser(user, timesheet.updated_by),
                  position_name: PositionNameUser(user, positionInfo, timesheet.updated_by),
                  position_hidden: "",
                  type: "work",
                  work_code: work.work_code,
                  work_name: work.work_name,
                  start_date: moment(work.start_date).format("DD-MM-YYYY"),
                  end_date: moment(work.end_date).format("DD-MM-YYYY"),
                  raw_assign_time: work.total,
                  raw_actual_time: timesheet.total,
                  raw_total: work.total - timesheet.total,
                  assign_time: minutesToHoursNotRemain(work.total),
                  actual_time: minutesToHours(timesheet.total),
                  total: minutesToHours(work.total - timesheet.total)
                };
                rows.push(row);
              });
            }
          });
        }
      });
    }
    return rows;
  }, [data]);

  return formattedData; // Return sortedData instead of formattedData
};

export default useNewPerson;
