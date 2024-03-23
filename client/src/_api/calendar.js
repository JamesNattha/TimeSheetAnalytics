import axiosInstance from 'utils/axios';
// import services from 'utils/mockAdapter';
import { events } from 'data/calendar';

// third-party
import { v4 as UIDV4 } from 'uuid';
import _ from 'lodash';

// ==============================|| MOCK SERVICES ||============================== //

// services.onGet('/fetch-calendar').reply(200, { events });

// services.onPost('/api/calendar/events/add').reply((request) => {
//   try {
//     const { allDay, description, color, textColor, end, start, title } = JSON.parse(request.data);
//     const event = {
//       id: UIDV4(),
//       allDay,
//       description,
//       color,
//       textColor,
//       end,
//       start,
//       title
//     };

//     events.push(event);

//     return [200, { event }];
//   } catch (err) {
//     console.error(err);
//     return [500, { message: 'Internal server error' }];
//   }
// });

// services.onPost('/api/calendar/events/update').reply((request) => {
//   try {
//     const { eventId, update } = JSON.parse(request.data);
//     let event = null;

//     _.map(events, (_event) => {
//       if (_event.id === eventId) {
//         _.assign(_event, { ...update });
//         event = _event;
//       }

//       return _event;
//     });

//     return [200, { event }];
//   } catch (err) {
//     console.error(err);
//     return [500, { message: 'Internal server error' }];
//   }
// });

// services.onPost('/api/calendar/events/delete').reply((request) => {
//   try {
//     const { eventId } = JSON.parse(request.data);
//     _.reject(events, { id: eventId });

//     return [200, { eventId }];
//   } catch (err) {
//     console.error(err);
//     return [500, { message: 'Internal server error' }];
//   }
// });

//-------------------------Fetch Data----------------------------------//
const getHoliday = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/fetch-calendar', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const createEvent = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/calendar/created', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const updateEvent = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/calendar/updated', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const deleteEvent = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/calendar/deleted', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const UploadCalendar = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/calendar/upload', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

const bankHolidayExport = async (values) => {
  try {
    const fetchvalue = await axiosInstance.post('/financail-holiday/export', values).then((response) => {
      return response.data;
    });
    return fetchvalue;
  } catch (err) {
    return { isStatus: false, data: null, message: err.message };
  }
};

export default { getHoliday, createEvent, updateEvent, deleteEvent, UploadCalendar, bankHolidayExport };
