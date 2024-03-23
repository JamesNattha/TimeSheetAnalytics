import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '_api';
import useAuth from 'hooks/useAuth';
// material-ui
import { useMediaQuery, Box, Dialog, SpeedDial, Tooltip, Menu, MenuItem, SpeedDialAction } from '@mui/material';

// third-party
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
// import agendaPlugin from '@fullcalendar/agenda';

// project import
import MainCard from 'components/MainCard';
import CalendarStyled from 'sections/apps/calendar/CalendarStyled';
import Toolbar from 'sections/apps/calendar/Toolbar';
import AddEventForm from 'sections/apps/calendar/AddEventForm';
import ImportPopup from 'sections/apps/calendar/ImportEvent';
import ExportPopup from 'sections/apps/calendar/ExportEvent';
import { getEvents, selectEvent, selectRange, toggleModal, updateCalendarView, updateEvent } from 'store/reducers/calendar';

import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
// assets
import { PlusOutlined, VerticalAlignBottomOutlined, CloudDownloadOutlined, CloudUploadOutlined, CloseOutlined } from '@ant-design/icons';
import ClearIcon from '@mui/icons-material/Clear';
import './style/calendar.css';

const selectedEventHandler = (calendarEvents, selectedEventId) => {
  // console.log('first elo');
  const data = {
    start: new Date(),
    end: new Date()
  };
  console.log('data in create', data);
  // setOpen(true);
  // setSelectedRanges(data);
};

//----------------------------Menu button------------------------
const actions = [
  { icon: <PlusOutlined />, name: 'Add New Event' },
  // { icon: <CloudUploadOutlined />, name: 'Import' },
  // { icon: <CloudDownloadOutlined />, name: 'Export' }
];

// ==============================|| CALENDAR - MAIN ||============================== //

const Calendar = () => {
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const calendar = useSelector((state) => state.calendar);
  const { calendarView, events, isModalOpen, selectedRange } = calendar;
  const { user } = useAuth();
  const [selectedRanges, setSelectedRanges] = useState([]);
  const [open, setOpen] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [openExport, setOpenExport] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState(null);
  // const selectedEvent = useSelector(selectedEventHandler);
  const [day, setDay] = useState([]);
  const [holiday, setHoliday] = useState([]);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);

  console.log('user user', user);
  const fetchHoliday = async () => {
    try {
      const { data, isStatus } = await api.calendar.getHoliday();
      if (isStatus) setDay(data);

      console.log('data profile', data);
    } catch (error) {
      console.error(error);
    }
  };

  const refetch = async () => {
    const { data, isStatus } = await api.calendar.getHoliday();
    if (isStatus) {
      const formattedHolidayData = formatHolidayData(data);
      setHoliday(formattedHolidayData);
    }
  };

  console.log('daydayday', day);

  const formatHolidayData = (holidayData) => {
    console.log('run si isus');
    return holidayData.map((holiday) => ({
      id: holiday.calendar_id,
      title: holiday.calendar_title,
      detail: holiday.detail,
      start: holiday.start_date,
      end: holiday.end_date,
      color: holiday.color,
      textColor: holiday.text_color,
      type: holiday.calendar_type
    }));
  };

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  useEffect(() => {
    if (holiday.length === 0) {
      fetchHoliday().then(() => {
        const formattedHolidayData = formatHolidayData(day);
        setHoliday(formattedHolidayData);
      });
    }
    dispatch(getEvents());
  }, [dispatch, holiday]);

  console.log('holiday', day);
  console.log('holiday', holiday);
  // console.log('dispatch', dispatch);
  const calendarRef = useRef(null);

  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = matchDownSM ? 'listWeek' : 'dayGridMonth';
      calendarApi.changeView(newView);
      dispatch(updateCalendarView(newView));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownSM]);

  const [date, setDate] = useState(new Date());

  // calendar toolbar events
  const handleDateToday = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };

  const handleViewChange = (newView) => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.changeView(newView);
      dispatch(updateCalendarView(newView));
    }
  };

  const handleDatePrev = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleDateNext = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };

  //--------------------------------------------------Main Button----------------------------------------------------------//
  const handleMenu = (action) => {
    // console.log('action.name ', action);
    if (action.name === 'Import') {
      selectedImportPage();
    } else if (action.name === 'Export') {
      selectedExportPage();
    } else if (action.name === 'Add New Event') {
      selectedEventHandler();
    } else {
      console.log('error ja');
    }
  };
  //-------------------------------------------------- button added events --------------------------------------------------//

  const selectedEventHandler = () => {
    // console.log('first elo');
    const data = {
      start: new Date(),
      end: new Date()
    };
    console.log('data in create', data);
    setOpen(true);
    setSelectedRanges(data);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setMenuAnchor(null);
  };

  //------------------------------------------------------Button import------------------------------------------------------------//
  const selectedImportPage = () => {
    setOpenImport(true);
    // setSelectedRanges(data);
  };

  const selectedImportPageClose = () => {
    setOpenImport(false);
    // setSelectedRanges(data);
  };

  //------------------------------------------------------Button Export------------------------------------------------------------//
  const selectedExportPage = () => {
    setOpenExport(true);
    // setSelectedRanges(data);
  };

  const selectedExportPageClose = () => {
    setOpenExport(false);
    // setSelectedRanges(data);
  };

  //-------------------------------------------------- calendar added events --------------------------------------------------//
  const handleRangeSelect = (arg) => {
    console.log('first elo');
    const data = {
      start: arg.start,
      end: arg.end
    };
    console.log('data in create', data);
    setOpen(true);
    setSelectedRanges(data);
  };

  //-------------------------------------------calendar updated events----------------------------------------------------------

  const handleEventSelect = (arg) => {
    const clickedEvent = arg.event;
    console.log('clicked', clickedEvent);
    let data;
    if (clickedEvent) {
      data = {
        id: clickedEvent.id,
        title: clickedEvent.title,
        allDay: clickedEvent.allDay,
        start: clickedEvent.start,
        end: clickedEvent.end,
        color: clickedEvent.backgroundColor,
        textColor: clickedEvent.textColor,
        description: holiday.find((item) => item.id === clickedEvent.id).detail,
        type: holiday.find((item) => item.id === clickedEvent.id).type
      };
      console.log('data in update', data);
      setOpen(true);
      setSelectedEvents(data);
      console.log('selectedEvents', selectedEvents);
    } else {
      console.log('hello is else');
      setOpen(true);
    }
  };

  //--------------------------------------------------------------------------------------------------------------

  const handleEventUpdate = async ({ event }) => {
    try {
      dispatch(
        updateEvent(event.id, {
          allDay: event.allDay,
          start: event.start,
          end: event.end
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleModal = () => {
    setOpen(false);
    setSelectedRanges(null);
    setSelectedEvents(null);
    dispatch(toggleModal());
  };

  const handleModalClose = () => {
    setOpen(false);
    setSelectedRanges(null);
    setSelectedEvents(null);
  };

  return (
    <div>
      <MainCard border={false} boxShadow sx={{ borderRadius: '10px', pb: '40px' }}>
        <Box sx={{ position: 'relative' }}>
          <CalendarStyled view={calendarView}>
            <Toolbar
              date={date}
              view={calendarView}
              onClickNext={handleDateNext}
              onClickPrev={handleDatePrev}
              onClickToday={handleDateToday}
              onChangeView={handleViewChange}
            />

            <FullCalendar
              weekends
              editable
              droppable
              selectable
              fixedWeekCount={false}
              // className={calendarView === 'listMonth' ? '& .fc-theme-standard td, .fc-theme-standard th ' : null}
              eventColor="color"
              events={holiday}
              ref={calendarRef}
              allDaySlot={calendarView === 'timeGridWeek' ? true : false}
              rerenderDelay={10}
              initialDate={date}
              // titleFormat={''}
              initialView={calendarView}
              dayMaxEventRows={3}
              eventDisplay="block"
              headerToolbar={false}
              allDayMaintainDuration
              eventResizableFromStart
              select={handleRangeSelect}
              eventDrop={handleEventUpdate}
              eventClick={handleEventSelect}
              eventResize={handleEventUpdate}
              height={matchDownSM ? 'auto' : 870}
              plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
              views={{
                timeGridWeek: {
                  titleFormat: { day: 'numeric', weekday: 'short' }
                }
              }}
              businessHours={[
                {
                  daysOfWeek: [1, 2, 3, 4, 5], // Monday to Friday
                  startTime: '00:00', // 09:00 AM
                  endTime: '23:59' // 06:00 PM
                }
              ]}
            />
          </CalendarStyled>
          <Dialog
            maxWidth="sm"
            fullWidth
            onClose={handleModal}
            open={user?.role === 'super_admin' || user?.role === 'admin' ? open : null}
            sx={{ '& .MuiDialog-paper': { p: 0, maxWidth: '1300px', borderRadius: '10px' } }}
          >
            {open && (user?.role === 'super_admin' || user?.role === 'admin') && (
              <AddEventForm
                event={selectedEvents}
                range={selectedRanges}
                onCancel={handleModal}
                closePop={handleModalClose}
                refetch={refetch}
              />
            )}
            {/* {open && user?.role === 'admin' && (
              <AddEventForm
                event={selectedEvents}
                range={selectedRanges}
                onCancel={handleModal}
                closePop={handleModalClose}
                refetch={refetch}
              />
            )} */}
          </Dialog>
          {/* <Dialog
            maxWidth="sm"
            fullWidth
            onClose={selectedImportPageClose}
            open={openImport}
            sx={{ '& .MuiDialog-paper': { p: 0, maxWidth: '800px', borderRadius: '10px' } }}
          >
            {openImport && <ImportPopup onCancel={selectedImportPageClose} refetch={refetch} />}
          </Dialog>
          <Dialog
            maxWidth="sm"
            fullWidth
            onClose={selectedImportPageClose}
            open={openExport}
            sx={{ '& .MuiDialog-paper': { p: 0, maxWidth: '800px', borderRadius: '10px' } }}
          >
            {openExport && <ExportPopup onCancel={selectedExportPageClose} refetch={refetch} />}
          </Dialog> */}
        </Box>
      </MainCard>
      {user?.role === 'super_admin' || user?.role === 'admin' ? (
        <SpeedDial
          ariaLabel="add-event-fab"
          sx={{ alignItems: 'end', position: 'sticky', right: 1, bottom: 0, zIndex: 1, padding: 5 }}
          icon={<SpeedDialIcon openIcon={<ClearIcon />} />}
          direction="left"
        >
          {actions.map((action) => (
            <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={() => handleMenu(action)} />
          ))}
        </SpeedDial>
      ) : null}
    </div>
  );
};

export default Calendar;
