import { useState, useEffect, useMemo } from 'react';
import api from '_api';
import moment from 'moment';
import { format } from 'date-fns';
import config from 'config';

const useGroupPerson = (datanow) => {
  const [data, setData] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [amphures, setAmphures] = useState([]);
  const [tambons, setTambons] = useState([]);

  console.log('datanow', datanow);

  const fetchData = (url, setter) => {
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setter(result);
      });
  };
  
  useEffect(() => {
    // Fetch provinces data
    fetchData('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json', setProvinces);
  }, []);

  useEffect(() => {
    // Fetch amphures data
    fetchData('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json', setAmphures);
  }, []);

  useEffect(() => {
    // Fetch sub-district data
    fetchData('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json', setTambons);
  }, []);

  const convertBufferToBase64 = (buffer) => {
    const uint8Array = new Uint8Array(buffer);
    const binary = uint8Array.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    return btoa(binary);
  };

  const formattedData = useMemo(() => {
    const rows = [];
    const formatDateToLongString = (date) => {
      if (!date) return '';
      return format(new Date(date), 'dd MMMM yyyy');
    };

    const calculateDateDifference = (startingWorkingDate) => {
      const currentDate = new Date();
      const examDate = new Date(startingWorkingDate); // Replace with your desired exam date
      const timeDifference = Math.abs(examDate - currentDate);
      const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      if (examDate && currentDate && examDate <= currentDate) {
        const years = Math.floor(daysRemaining / 365);
        const remainingDaysAfterYears = daysRemaining % 365;
        const months = Math.floor(remainingDaysAfterYears / 30);
        const days = remainingDaysAfterYears % 30;

        let result = '';
        if (years > 0) {
          result += `${years} Year${years !== 1 ? 's' : ''} `;
        }
        if (months > 0) {
          result += `${months} Month${months !== 1 ? 's' : ''} `;
        }
        if (days > 0) {
          result += `${days} Day${days !== 1 ? 's' : ''} `;
        }

        return result.trim();
      } else if (examDate && currentDate && examDate > currentDate) {
        return `${daysRemaining} D Remaining`;
      } else {
        return null;
      }
    };

    if (datanow) {
      let counter = 0;
      datanow.forEach((person) => {
        counter++;
        console.log('datanow person', person);
        if (datanow.length > 0) {
          // const provincess = provinces.find((province) => province.name_en === person.Addresses[0]?.province)?.id || '';
          // const districts = amphures.find((amphure) => amphure.name_en === person.Addresses[0]?.district)?.id || '';
          // const subdistricts = tambons.find((tambon) => tambon.name_en === person.Addresses[0]?.sub_district)?.id || '';
          const row = {
            //=========================Person Data============================//
            // super_img: superImageBase64,

            fullname: `${person.User.first_name} ${person.User.last_name}`,
            firstname: person.User.first_name,
            lastname: person.User.last_name,
            nickname: person.User.nick_name,
            birthday: formatDateToLongString(person.User.birthday),
            // age: calculateDateDifference(person.User.birthday),

            //=========================Working Data============================//
            email: person.User.username,
            department: person.Department.department_name,
            position: person.Position.position_name,
            group: person.Group.group_name,
            gender: person.gender,
            level: person.level,
            phone: person.User.user_phone,
            startworkdate: formatDateToLongString(person.User.starting_working_date),
            yearexp: calculateDateDifference(person.User.starting_working_date),

            //=====================Address Fetch===========================//
            address: person.Addresses[0]?.information,
            province: parseInt(person.Addresses[0]?.province?.trim(), 10) || 0,
            district: parseInt(person.Addresses[0]?.district?.trim(), 10) || 0,
            subdistrict: parseInt(person.Addresses[0]?.sub_district?.trim(), 10) || 0,
            postcode: person.Addresses[0]?.postcode
          };

          rows.push(row);
        }
      });
    }
    console.log('group data', rows);
    return rows;
  }, [datanow]);

  return formattedData; // Return sortedData instead of formattedData
};

export default useGroupPerson;
