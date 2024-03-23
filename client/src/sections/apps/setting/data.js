import { useState, useEffect, useMemo } from 'react';
import api from '_api';
import moment from 'moment';

const useDepartmentPerson = (datanow) => {
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

  const formattedData = useMemo(() => {
    const rows = [];

    if (datanow) {
      let counter = 0;
      datanow.forEach((person) => {
        counter++;
        console.log('person', person);
        if (datanow.length > 0) {
          const row = {
            // no: counter,
            email: person.User.username,
            name: person.User.first_name ? `${person.User.first_name} ${person.User.last_name}` : 'Pending',
            nickname: person.User.nick_name ? person.User.nick_name : 'Pending',
            exp: calculateDateDifference(person.User.starting_working_date),
            active: person.invite,
            status: person.is_deleted
              ? { delete: person.is_deleted }
              : person.is_active && person.invite
              ? { join: person.invite }
              : !person.is_active && person.invite
              ? { active: person.is_active }
              : !person.is_active && !person.invite
              ? { join: person.invite }
              : {},
            person: person,
            created_date: person.created_date
          };

          rows.push(row);
        }
        console.log('row', rows);
      });
    }

    return rows;
  }, [datanow]);

  const sortedData = formattedData.slice().sort((a, b) => {
    // Convert the date strings to Date objects for comparison
    const dateA = new Date(a.created_date);
    const dateB = new Date(b.created_date);

    // Compare the dates in descending order
    return dateA - dateB;
  });

  // Set autoNumber based on the sorted order
  sortedData.forEach((row, index) => {
    row.autoNumber = index + 1;
  });

  console.log('sort po meung', sortedData);
  return sortedData; // Return sortedData instead of formattedData
  // return formattedData;
};

export default useDepartmentPerson;
