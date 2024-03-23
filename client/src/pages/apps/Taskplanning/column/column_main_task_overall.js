import React, { useEffect, useState } from 'react';

import { Stack, Tooltip, Popover, ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import IconButton from 'components/@extended/IconButton';
import { IndeterminateCheckbox, TablePagination, TableRowSelection } from 'components/third-party/ReactTable';

import Complete from './Complete';
import Cancel from './Cancel';
import EditIcon from '@mui/icons-material/Edit';
import Edit from './Edit';
import AssignedIcon from './AssignedIcon';
import Deleted from './Deleted';

import Chip from '@mui/material/Chip';
import api from '_api';

const useColumns = (handleAdd, setCustomer, handleDelete, handleAssign) => {
  // Define the timer state for each row
  const [timerStates, setTimerStates] = useState({});
  const [activeTimerId, setActiveTimerId] = useState(null);
  const [stopwatchValues, setStopwatchValues] = useState({});

  async function updateStopwatch(values) {
    try {
      const updateStatus = await api.work.updateStopwatch({ work_id: values.work_id });
    } catch (error) {
      console.error(error);
    }
  }

  async function updateStopwatchStop(values) {
    try {
      const updateStatus = await api.work.updateStopwatchStop({ work_id: values.work_id });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    // Add a cleanup function for clearing the interval when the component unmounts
    return () => {
      Object.values(timerStates).forEach((state) => {
        if (state.timerInstance) {
          clearInterval(state.timerInstance);
        }
      });
    };
  }, []);

  // Function to start the timer
  const startTimer = (workId, elapsedTime) => {
    const newTimerInstance = setInterval(() => {
      setTimerStates((prevStates) => ({
        ...prevStates,
        [workId]: {
          ...prevStates[workId],
          elapsedTime: (prevStates[workId]?.elapsedTime || 0) + 1
        }
      }));
      // Update the stopwatch value here
      setStopwatchValues((prevValues) => ({
        ...prevValues,
        [workId]: (prevValues[workId] || 0) + 1
      }));
    }, 1000);

    setTimerStates((prevStates) => ({
      ...prevStates,
      [workId]: {
        ...prevStates[workId],
        isTimerRunning: true,
        timerInstance: newTimerInstance
      }
    }));
    setActiveTimerId(workId); // Set the active timer ID
  };

  // Function to restart the stopwatch if action_status is true
  const restartStopwatchIfNeeded = (row) => {
    const workId = row.values.work_id;
    const currentTimerState = timerStates[workId] || {};

    if (row.values.action_status) {
      startTimer(workId, currentTimerState.elapsedTime || 0);
    }
  };

  // useEffect to initialize timers and check action_status
  useEffect(() => {
    // Initialize timers based on localStorage data
    const storedTimerStates = JSON.parse(localStorage.getItem('timerStates')) || {};
    setTimerStates(storedTimerStates);

    // Check action_status and restart timers
    Object.values(timerStates).forEach((state, workId) => {
      if (state.isTimerRunning) {
        // Check action_status for each row with a running timer
        const row = { values: { work_id: workId, action_status: state.action_status } };
        restartStopwatchIfNeeded(row);
      }
    });
  }, []);

  // useEffect to store timerStates in localStorage
  useEffect(() => {
    localStorage.setItem('timerStates', JSON.stringify(timerStates));
  }, [timerStates]);

  const columns = [
    // {
    //   title: 'Row Selection',
    //   accessor: 'selection',
    //   Header: ({ getToggleAllPageRowsSelectedProps }) => (
    //     <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} style={{ display: 'none' }} />
    //   ),
    //   Cell: ({ row }) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />,
    //   disableSortBy: true,
    //   show: false // Hide the header for this column
    // },
    {
      Header: <div style={{ textAlign: 'center' }}>No.</div>,
      accessor: 'autoNumber',
      className: 'cell-right',
      width: '5%',
      disableSortBy: true
    },
    {
      Header: 'Work Id',
      accessor: 'work_id',
      hidden: true,
      disableSortBy: true
    },
    {
      Header: 'Work Code',
      accessor: 'work_code',
      truncate: 12,
      disableSortBy: true
    },
    {
      Header: 'Work Name',
      accessor: 'work_name',
      truncate: 20,
      disableSortBy: true
    },
    {
      Header: 'Work Type',
      accessor: 'work_type',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Client Id',
      accessor: 'client_id',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Client Name',
      accessor: 'client_name',
      truncate: 20,
      disableSortBy: true
    },
    {
      Header: 'ProjectId',
      accessor: 'project_id',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Project Names',
      accessor: 'project_name',
      truncate: 17,
      disableSortBy: true
    },

    {
      Header: 'Work Type',
      accessor: 'work_type_name',
      truncate: 20,
      disableSortBy: true
    },
    {
      Header: 'Work Level',
      accessor: 'work_level',
      truncate: 20,
      disableSortBy: true
    },
    {
      Header: 'Create By',
      accessor: 'name_created',
      truncate: 20,
      disableSortBy: true
    },
    {
      Header: 'Assigned',
      accessor: 'assign_name',
      truncate: 15,
      disableSortBy: true
    },

    {
      Header: 'Details',
      accessor: 'detail',
      truncate: 20,
      disableSortBy: true
    },
    {
      Header: 'Send To',
      accessor: 'send_to',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Total',
      accessor: 'total',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Start Date',
      accessor: 'start_date',
      disableSortBy: true
    },
    {
      Header: 'End Date',
      accessor: 'end_date',
      disableSortBy: true
    },
    {
      Header: 'CreateDate',
      accessor: 'created_date',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Created',
      accessor: 'created_by',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Is Active',
      accessor: 'is_active',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Is Deleted',
      accessor: 'is_deleted',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Action Status',
      accessor: 'action_status',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Status',
      accessor: 'work_status',
      className: 'cell-center',
      style: {
        textAlign: 'center' // Set the text alignment to center
      },
      disableSortBy: true,
      Cell: ({ row }) => {
        const { values } = row;
        // console.log('xxxxxxxxx', values);

        const workStatus = values.work_status;
        // console.log('data value in column', workStatus);
        if (workStatus) {
          return (
            <Stack
              direction="column"
              alignItems="center" // Center horizontally
              justifyContent="center" // Center vertically
              spacing={0}
            >
              <Chip
                sx={{
                  width: '80px',
                  borderRadius: 30,
                  display: 'flex',
                  justifyContent: 'space-around',
                  flexWrap: 'wrap'
                }}
                size="small"
                color={workStatus === 'assigned' ? 'primary' : workStatus === 'inprogress' ? 'warning' : 'error'}
                label={workStatus === 'assigned' ? 'Assigned' : workStatus === 'inprogress' ? 'In Progress' : ''}
              />
            </Stack>
          );
        }
      }
    },
    {
      Header: 'Stopwatch',
      accessor: 'stopwatch',
      disableSortBy: true,
      hidden: true,
      Cell: ({ value }) => {
        //At here

        const totalSeconds = Number(value);

        const hours = Math.floor(totalSeconds / 3600);
        const remainingSeconds = totalSeconds % 3600;
        const minutes = Math.floor(remainingSeconds / 60);

        let formattedStopwatch = '';
        if (hours > 0) {
          formattedStopwatch += `${hours} H `;
        } else {
          formattedStopwatch += `0 H `;
        }
        if (minutes > 0) {
          formattedStopwatch += `${minutes} M`;
        } else {
          formattedStopwatch += `0 M `;
        }

        return formattedStopwatch;
      }
    },
    {
      Header: 'Sum Time',
      accessor: 'sum_time',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'My Group',
      accessor: 'group_id',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'My Assigned',
      accessor: 'my_assigned',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'My Create',
      accessor: 'my_create',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Actions',
      accessor: 'action',
      className: 'cell-center',
      width: '10%',
      disableSortBy: true,
      Cell: ({ row }) => {
        const { values } = row;
        // console.log('first Values', values);

        return (
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
            {values && values.my_create ? (
              <>
                <Tooltip title="Edit">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setCustomer(values);
                      handleAdd();
                    }}
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
                {/* <Tooltip title="Assigned">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setCustomer(values);
                      handleAssign();
                    }}
                  >
                    <AssignedIcon />
                  </IconButton>
                </Tooltip> */}
                <Tooltip title="Deleted">
                  <IconButton
                    onClick={() => {
                      handleDelete(values);
                      // console.log('values.id', values);
                    }}
                  >
                    <Deleted />
                  </IconButton>
                </Tooltip>
              </>
            ) : null}
          </Stack>
        );
      }
    }
  ];

  return columns;
};

export default useColumns;
