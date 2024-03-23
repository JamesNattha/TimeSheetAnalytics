import React, {useEffect, useState} from "react";

import {Stack, Tooltip, Popover, ListItemIcon, ListItemText, MenuItem} from "@mui/material";
import IconButton from "components/@extended/IconButton";
import {IndeterminateCheckbox} from "components/third-party/ReactTable";

import Send from "./Send";
import Complete from "./Complete";
import Cancel from "./Cancel";
import EditIcon from "@mui/icons-material/Edit";
import Pause from "./Pause";
import Start from "./Start";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import Chip from "@mui/material/Chip";

import api from "_api";
import TimeSheet from "pages/time-sheet";
import {useNavigate} from "react-router";

const useColumns = (handleAdd, setCustomer, handleDelete, updateStatus, fetchWorkTable, activeTab) => {
  // Define the timer state for each row
  // const [timerStates, setTimerStates] = useState({});
  // const [activeTimerId, setActiveTimerId] = useState(null);
  // const [stopwatchValues, setStopwatchValues] = useState({});
  // const [newValues, setNewValues] = useState();
  const navigate = useNavigate();

  const handleStart = async (row) => {};

  // async function updateStopwatch(values) {
  //   try {
  //     const updateStatus = await api.work.updateStopwatch({ work_id: values.work_id });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  async function updateStatusInprogress(values) {
    try {
      const updateStatus = await api.work.updateStatusInprogress({work_id: values.work_id}).then(() => {
        fetchWorkTable();
      });
    } catch (error) {
      console.error(error);
    }
  }

  // const handleStartTimer = async (row) => {
  //   const workId = row.values.work_id;
  //   const currentTimerState = timerStates[workId] || {};

  //   // Check if there's an active timer for any row
  //   if (activeTimerId !== null) {
  //     // If there is an active timer, do nothing
  //     return;
  //   }

  //   if (!currentTimerState.isTimerRunning) {
  //     try {
  //       if (!currentTimerState.timerInstance) {
  //         if (row.values.work_status === 'assigned') {
  //           await updateStopwatch(row.values).then(() => {
  //             fetchWorkTable();
  //           });
  //         } else {
  //           await updateStopwatch(row.values);
  //         }
  //         let startTime = Date.now() - (currentTimerState.elapsedTime || 0) * 1000;
  //         if (currentTimerState.pauseTime) {
  //           startTime = Date.now() - (Date.now() - currentTimerState.pauseTime);
  //         }

  //         const newTimerInstance = setInterval(() => {
  //           setTimerStates((prevStates) => ({
  //             ...prevStates,
  //             [workId]: {
  //               ...prevStates[workId],
  //               elapsedTime: (prevStates[workId]?.elapsedTime || 0) + 1
  //             }
  //           }));
  //           // Update the stopwatch value here
  //           setStopwatchValues((prevValues) => ({
  //             ...prevValues,
  //             [workId]: (prevValues[workId] || 0) + 1
  //           }));
  //         }, 1000);

  //         setTimerStates((prevStates) => ({
  //           ...prevStates,
  //           [workId]: {
  //             ...currentTimerState,
  //             isTimerRunning: true,
  //             timerInstance: newTimerInstance
  //           }
  //         }));
  //         setActiveTimerId(workId); // Set the active timer ID
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };

  // const handlePauseTimer = async (row) => {
  //   const workId = row.values.work_id;
  //   const currentTimerState = timerStates[workId] || {};

  //   if (currentTimerState.isTimerRunning) {
  //     try {
  //       if (currentTimerState.timerInstance) {
  //         await updateStopwatchStop(row.values);
  //         clearInterval(currentTimerState.timerInstance);

  //         // Save the pause datetime
  //         const pauseTime = Date.now();
  //         setTimerStates((prevStates) => ({
  //           ...prevStates,
  //           [workId]: {
  //             ...currentTimerState,
  //             isTimerRunning: false,
  //             timerInstance: null,
  //             pauseTime: pauseTime
  //           }
  //         }));
  //         setActiveTimerId(null);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   // Add a cleanup function for clearing the interval when the component unmounts
  //   return () => {
  //     Object.values(timerStates).forEach((state) => {
  //       if (state.timerInstance) {
  //         clearInterval(state.timerInstance);
  //       }
  //     });
  //   };
  // }, []);

  // Function to start the timer
  // const startTimer = (workId, elapsedTime) => {
  //   const newTimerInstance = setInterval(() => {
  //     setTimerStates((prevStates) => ({
  //       ...prevStates,
  //       [workId]: {
  //         ...prevStates[workId],
  //         elapsedTime: (prevStates[workId]?.elapsedTime || 0) + 1
  //       }
  //     }));
  //     // Update the stopwatch value here
  //     setStopwatchValues((prevValues) => ({
  //       ...prevValues,
  //       [workId]: (prevValues[workId] || 0) + 1
  //     }));
  //   }, 1000);

  //   setTimerStates((prevStates) => ({
  //     ...prevStates,
  //     [workId]: {
  //       ...prevStates[workId],
  //       isTimerRunning: true,
  //       timerInstance: newTimerInstance
  //     }
  //   }));
  //   setActiveTimerId(workId); // Set the active timer ID
  // };

  // // Function to restart the stopwatch if action_status is true
  // const restartStopwatchIfNeeded = (row) => {
  //   const workId = row.values.work_id;
  //   const currentTimerState = timerStates[workId] || {};

  //   if (row.values.action_status) {
  //     startTimer(workId, currentTimerState.elapsedTime || 0);
  //   }
  // };

  // // useEffect to initialize timers and check action_status
  // useEffect(() => {
  //   // Initialize timers based on localStorage data
  //   const storedTimerStates = JSON.parse(localStorage.getItem('timerStates')) || {};
  //   setTimerStates(storedTimerStates);

  //   // Check action_status and restart timers
  //   Object.values(timerStates).forEach((state, workId) => {
  //     if (state.isTimerRunning) {
  //       // Check action_status for each row with a running timer
  //       const row = { values: { work_id: workId, action_status: state.action_status } };
  //       restartStopwatchIfNeeded(row);
  //     }
  //   });
  // }, []);

  const FnTimeSheet = (values) => {
    navigate("/timesheet", {state: {data: values}});
    window.location.reload();
  };
  // useEffect to store timerStates in localStorage
  // useEffect(() => {
  //   localStorage.setItem('timerStates', JSON.stringify(timerStates));
  // }, [timerStates]);

  const columns = [
    {
      title: "Row Selection",
      accessor: "selection",
      Header: ({getToggleAllPageRowsSelectedProps}) => (
        <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} style={{display: "none"}} />
      ),
      Cell: ({row}) => {
        const handleToggle = () => {
          // Access the data associated with the row and display it in the console
          console.log("Data:", row.original);
          // You can access specific properties from row.original as needed
          row.toggleRowSelected();
        };

        return (
          <IndeterminateCheckbox
            {...row.getToggleRowSelectedProps({
              onClick: (e) => {
                e.stopPropagation();
                handleToggle();
              }
            })}
          />
        );
      },
      disableSortBy: true,
      show: false // Hide the header for this column
    },
    {
      Header: <div style={{textAlign: "center"}}>No.</div>,
      accessor: "autoNumber",
      className: "cell-right",
      width: "5%",
      disableSortBy: true
    },
    {
      Header: "Work Id",
      accessor: "work_id",
      hidden: true,
      disableSortBy: true
    },
    {
      Header: "Work Code",
      accessor: "work_code",
      truncate: 12,
      disableSortBy: true
    },
    {
      Header: "Work Name",
      accessor: "work_name",
      truncate: 15,
      disableSortBy: true
    },
    {
      Header: "Work Type",
      accessor: "work_type",
      disableSortBy: true,
      hidden: true
    },
    {
      Header: "Client Id",
      accessor: "client_id",
      disableSortBy: true,
      hidden: true
    },
    {
      Header: "Client Name",
      accessor: "client_name",
      truncate: 20,
      disableSortBy: true
    },
    {
      Header: "ProjectId",
      accessor: "project_id",
      disableSortBy: true,
      hidden: true
    },
    {
      Header: "Project Names",
      accessor: "project_name",
      truncate: 17,
      disableSortBy: true
    },

    {
      Header: "Work Type",
      accessor: "work_type_name",
      truncate: 20,
      disableSortBy: true
    },
    {
      Header: "Work Level",
      accessor: "work_level",
      truncate: 20,
      disableSortBy: true
    },
    {
      Header: "Created",
      accessor: "created_by",
      disableSortBy: true,
      hidden: true
    },
    {
      Header: "Created By",
      accessor: "name_created",
      truncate: 20,
      disableSortBy: true
      // hidden: true
    },
    {
      Header: "Assigned",
      accessor: "assign_name",
      truncate: 15,
      disableSortBy: true
      // hidden: true
    },
    {
      Header: "Details",
      accessor: "detail",
      truncate: 20,
      disableSortBy: true
    },
    {
      Header: "Send To",
      accessor: "send_to",
      disableSortBy: true,
      hidden: true
    },
    {
      Header: "Total",
      accessor: "total",
      disableSortBy: true,
      hidden: true
    },
    {
      Header: "Start Date",
      accessor: "start_date",
      disableSortBy: true
    },
    {
      Header: "End Date",
      accessor: "end_date",
      disableSortBy: true
    },
    {
      Header: "CreateDate",
      accessor: "created_date",
      disableSortBy: true,
      hidden: true
    },
    {
      Header: "Is Active",
      accessor: "is_active",
      disableSortBy: true,
      hidden: true
    },
    {
      Header: "Is Deleted",
      accessor: "is_deleted",
      disableSortBy: true,
      hidden: true
    },
    {
      Header: "Action Status",
      accessor: "action_status",
      disableSortBy: true,
      hidden: true
    },
    {
      Header: "User Login",
      accessor: "user_login",
      disableSortBy: true,
      hidden: true
    },
    {
      Header: "Time Stamps",
      accessor: "timestamps",
      disableSortBy: true,
      hidden: true
    },
    {
      Header: "Status",
      accessor: "work_status",
      className: "cell-center",
      style: {
        textAlign: "center" // Set the text alignment to center
      },
      disableSortBy: true,
      Cell: ({row}) => {
        const {values} = row;
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
                  width: "80px",
                  borderRadius: 30,
                  display: "flex",
                  justifyContent: "space-around",
                  flexWrap: "wrap"
                }}
                size="small"
                color={workStatus === "assigned" ? "primary" : workStatus === "inprogress" ? "warning" : "error"}
                label={workStatus === "assigned" ? "Assigned" : workStatus === "inprogress" ? "In Progress" : ""}
              />
            </Stack>
          );
        }
      }
    },
    // {
    //   Header: 'Stopwatch',
    //   accessor: 'stopwatch',
    //   disableSortBy: true,
    //   hidden: activeTab === 'assigned' ? true : false,
    //   Cell: ({ row }) => {
    //     const { values } = row;
    //     console.log('Check Value', values);

    //     const totalSeconds = Number(values.stopwatch);

    //     // Function to update the stopwatch in real-time
    //     const updateStopwatch = () => {
    //       if (values.action_status === 1) {
    //         const timestamps = new Date(values.timestamps);
    //         const currentTime = new Date();
    //         const elapsedMilliseconds = currentTime - timestamps;
    //         const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

    //         // Calculate the updated stopwatch value
    //         const updatedStopwatch = totalSeconds + elapsedSeconds;

    //         // Format the updated stopwatch value
    //         const hours = Math.floor(updatedStopwatch / 3600);
    //         const remainingSeconds = updatedStopwatch % 3600;
    //         const minutes = Math.floor(remainingSeconds / 60);

    //         let formattedStopwatch = '';
    //         if (hours > 0) {
    //           formattedStopwatch += `${hours} H `;
    //         } else {
    //           formattedStopwatch += `0 H `;
    //         }
    //         if (minutes > 0) {
    //           formattedStopwatch += `${minutes} M`;
    //         } else {
    //           formattedStopwatch += `0 M `;
    //         }

    //         return formattedStopwatch;
    //       }

    //       // If action_status is not equal to 1, display the original stopwatch value
    //       const hours = Math.floor(totalSeconds / 3600);
    //       const remainingSeconds = totalSeconds % 3600;
    //       const minutes = Math.floor(remainingSeconds / 60);

    //       let formattedStopwatch = '';
    //       if (hours > 0) {
    //         formattedStopwatch += `${hours} H `;
    //       } else {
    //         formattedStopwatch += `0 H `;
    //       }
    //       if (minutes > 0) {
    //         formattedStopwatch += `${minutes} M`;
    //       } else {
    //         formattedStopwatch += `0 M `;
    //       }

    //       return formattedStopwatch;
    //     };

    //     return updateStopwatch();
    //   }
    // },

    {
      Header: "Actions",
      accessor: "action",
      className: "cell-center",
      width: "10%",
      disableSortBy: true,
      Cell: ({row}) => {
        const {values} = row;
        console.log("values status of work", values);
        const workId = values.work_id;
        const workStatus = values.work_status;
        // console.log('values1121', values.user_login);
        // const currentTimerState = timerStates[workId] || {};
        const [popoverAnchor, setPopoverAnchor] = useState(null);

        const handleSeeMoreClick = (e) => {
          setPopoverAnchor(e.currentTarget);
        };

        const handlePopoverClose = () => {
          setPopoverAnchor(null);
        };

        return (
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
            {workStatus === "inprogress" ? (
              <Tooltip>
                {/* <span>
                  <IconButton color="secondary" onClick={() => handlePauseTimer(row)}>
                    <Pause />
                  </IconButton>
                </span> */}
              </Tooltip>
            ) : (
              <Tooltip title="Start">
                <span>
                  <IconButton
                    color="secondary"
                    onClick={() => {
                      updateStatusInprogress(values, fetchWorkTable);
                    }}
                  >
                    <Start />
                  </IconButton>
                </span>
              </Tooltip>
            )}
            <Tooltip title="Send">
              <IconButton onClick={() => FnTimeSheet(values)}>
                <Send />
              </IconButton>
            </Tooltip>
            <Tooltip title="See More">
              <IconButton color="secondary" onClick={handleSeeMoreClick}>
                <MoreVertIcon />
              </IconButton>
            </Tooltip>
            <Popover
              open={Boolean(popoverAnchor)}
              anchorEl={popoverAnchor}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center"
              }}
            >
              {values.user_login === values.created_by ? (
                <MenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    setCustomer(values);
                    handleAdd();
                  }}
                >
                  <ListItemIcon>
                    <EditIcon fontSize="small" sx={{color: "#0066FF"}} />
                  </ListItemIcon>
                  <ListItemText primary="Edit" />
                </MenuItem>
              ) : (
                <MenuItem disabled>
                  <ListItemIcon>
                    <EditIcon fontSize="small" sx={{color: "#0066FF"}} />
                  </ListItemIcon>
                  <ListItemText primary="Edit" />
                </MenuItem>
              )}

              <MenuItem
                disabled={values.is_active}
                onClick={() => {
                  updateStatus(values, fetchWorkTable);
                }}
              >
                <ListItemIcon>
                  <Complete />
                </ListItemIcon>
                <ListItemText primary="Complete" />
              </MenuItem>
              {values.user_login === values.created_by ? (
                <MenuItem
                  onClick={() => {
                    handleDelete(values);
                  }}
                >
                  <ListItemIcon>
                    <Cancel />
                  </ListItemIcon>
                  <ListItemText primary="Cancel" />
                </MenuItem>
              ) : (
                <MenuItem disabled>
                  <ListItemIcon>
                    <Cancel />
                  </ListItemIcon>
                  <ListItemText primary="Cancel" />
                </MenuItem>
              )}
            </Popover>
          </Stack>
        );
      }
    }
  ];

  return columns;
};

export default useColumns;
