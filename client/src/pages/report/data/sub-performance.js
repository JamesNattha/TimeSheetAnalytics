import profile from '_api/profile';
import { useState, useEffect, useMemo } from 'react';
// import api from '_api';

const useNewPerson = (DatafromIndex) => {
  const [data, setData] = useState([]);
  const [work, setWork] = useState([]);

  console.log('DatafromIndex', DatafromIndex);
  useEffect(() => {
    setData(DatafromIndex.position);
    // setData(DatafromIndex);
    setWork(DatafromIndex);
  }, [DatafromIndex]);

  console.log('data in subbb', data);
  console.log('data in work', work);
  //--------------------------------------------Real--------------------------------//
  const formattedData = useMemo(() => {
    const rows = [];
    if (data) {
      data.map((person, index) => {
        ///---------------------------Check Manday---------------------------///
        const checkReturni = (sendto, user) => {
          let count = [];
          if (sendto.length > 0) {
            const converted_send_to = sendto.map((value) => JSON.parse(value));
            if (converted_send_to.length > 0) {
              for (let i = 0; i < converted_send_to.length; i++) {
                if (converted_send_to[i].length > 0) {
                  for (let j = 0; j < converted_send_to[i].length; j++) {
                    for (let g = 0; g < user.length; g++) {
                      const checkisid = converted_send_to[i][j] === user[g];
                      if (checkisid) {
                        console.log('ihere i ngai1', converted_send_to[i][j]);
                        console.log('ihere i ngai2', user[g]);
                        console.log('profile', checkisid);
                        console.log('ihere i ngai', i);
                        count.push(i);
                      }
                    }
                  }
                } else {
                  for (let g = 0; g < person.profile.length; g++) {
                    const checkid = converted_send_to[i] === person.profile[g];
                    if (checkid) {
                      console.log('profile', checkid);
                      count.push(i);
                    }
                  }
                }
              }
            }
            return count;
          }
        };

        //----------------------------Check Timesheets------------------------//
        const checkReturniTimesheet = (sendto, user) => {
          let count = [];
          // console.log('sendto', sendto);
          if (sendto.length > 0) {
            // const converted_send_to = sendto.map((value) => JSON.parse(value));
            if (sendto.length > 0) {
              for (let i = 0; i < sendto.length; i++) {
                if (sendto[i].length > 0) {
                  for (let j = 0; j < sendto[i].length; j++) {
                    for (let g = 0; g < user.length; g++) {
                      console.log('sendto', sendto[i]);
                      const checkisid = sendto[i][j] === user[g];
                      if (checkisid) {
                        console.log('ihere i ngai1', sendto[i][j]);
                        console.log('ihere i ngai2', user[g]);
                        console.log('profile 1', checkisid);
                        console.log('ihere i ngai', i);
                        count.push(i);
                      }
                    }
                  }
                } else {
                  for (let g = 0; g < person.profile.length; g++) {
                    const checkid = sendto[i] === person.profile[g];
                    if (checkid) {
                      console.log('profile', checkid);
                      count.push(i);
                    }
                  }
                }
              }
            }
            console.log('is count', count);
            return count;
          }
        };

        //-------------------------------------Summary Project-------------------------------------//
        const plusData = (sendto, user, assign) => {
          const iValues = checkReturni(sendto, user);
          let total = 0;

          // console.log('iValues', iValues);
          if (iValues && iValues.length > 0) {
            for (const i of iValues) {
              const send_to = assign?.map((value) => JSON.parse(value));
              // console.log('send_to', send_to);
              if (send_to && send_to !== undefined && send_to[i].length > 1) {
                // console.log('assign', send_to);
                // console.log('assign[i].length', send_to[i].length);
                total += work.total[i] / send_to[i].length;
                // console.log('total', total);
              } else {
                total += work.total[i] || 0;
                // console.log('total', total);
                // console.log('assign', assign[i]);
              }
            }
          }

          // console.log('console.log(total):', total);
          return total;
        };

        //-------------------------------------Summary Timesheets----------------------------------//
        const plusTimesheet = (sendto, user) => {
          const iValues = checkReturniTimesheet(sendto, user);
          let total = 0;
          console.log('iValues', iValues);
          if (iValues && iValues.length > 0) {
            for (const i of iValues) {
              total += parseInt(work.total_ts[i]) || 0;
              console.log('total', total);
            }
          }

          // console.log('console.log(total):', total);
          return total;
        };

        //------------------------data in sub row----------------------------------//
        if (data.length > 0) {
          const row = {
            position_code: person.position_code,
            position_name: person.position_name,
            manday: plusData(work.send_to, person.profile, work.send_to),
            actual: plusTimesheet(work.timesheets, person.profile),
            total:
              plusTimesheet(work.timesheets, person.profile) === 0
                ? 0
                : plusData(work.send_to, person.profile) - plusTimesheet(work.timesheets, person.profile)
          };
          rows.push(row);
          console.log('row', row);
        }
      });
    }
    return rows;
  }, [data]);

  return formattedData;
};

export default useNewPerson;
