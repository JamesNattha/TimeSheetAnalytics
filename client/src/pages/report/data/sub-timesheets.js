import profile from "_api/profile";
import {useState, useEffect, useMemo} from "react";
// import api from '_api';

const useNewPerson = (DatafromIndex) => {
  const [data, setData] = useState([]);
  const [work, setWork] = useState([]);

  console.log("v", DatafromIndex);
  useEffect(() => {
    setData(DatafromIndex);
    // setData(DatafromIndex);
    setWork(DatafromIndex);
  }, [DatafromIndex]);

  console.log("data in subbb", data);
  //   console.log(
  //     "data in work",
  //     work.map((item) => item.TimeSheetDTs)
  //   );
  //--------------------------------------------Real--------------------------------//
  const formattedData = useMemo(() => {
    const rows = [];
    if (data.timesheets) {
      if (Array.isArray(data.timesheets)) {
        console.log("data in work", data.timesheets);
        const row = {
          work_code: data.timesheets.work_code,
          work_name: data.timesheets.work_name
        };
        rows.push(row) 
        // if (Array.isArray(data.timesheets.TimeSheetDTs)) {
        //   console.log("data in work", data.timesheets.TimeSheetDTs);
          
        // } else {
        //   console.error("work is not an array");
        // }
      } else {
        console.error("work is not an array");
      }
    }
    return rows;
  }, [data]);

  return formattedData;
};

export default useNewPerson;
