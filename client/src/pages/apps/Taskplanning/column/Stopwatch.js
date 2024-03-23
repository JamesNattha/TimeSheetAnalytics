import React, { useEffect, useState } from 'react';
import { Stack, Tooltip } from '@mui/material';
import IconButton from 'components/@extended/IconButton';
import Pause from './Pause';
import Start from './Start';
import api from '_api';
// import { set } from 'lodash';

const Stopwatch = ({ values, fetchWorkTable }) => {
  console.log('values.values.values', values);

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerInstance, setTimerInstance] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [pauseTime, setPauseTime] = useState(null);

  const currentTime = new Date();
  const hr = currentTime.getHours();
  const mn = currentTime.getMinutes();
  const sec = currentTime.getSeconds();

  const formattedTime = `${hr}:${mn}:${sec}`;
  const digitsOnly = formattedTime.replace(/:/g, '');
  const intValue = parseInt(digitsOnly, 10);

  console.log('Current Time:', intValue);

  async function updateStopwatch(values) {
    try {
      const updateStatus = await api.work.updateStopwatch({ work_id: values.work_id });
      // const updateStatus = await api.work.updateStopwatch({ work_id: values.work_id, intValue });
      console.log('values', updateStatus);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateStopwatchStop(values) {
    try {
      const updateStatus = await api.work.updateStopwatchStop({ work_id: values.work_id });
      // const updateStatus = await api.work.updateStopwatchStop({ work_id: values.work_id, sum_time: newestData, intValue });
      console.log('values', updateStatus);
    } catch (error) {
      console.error(error);
    }
  }

  const handleStartTimer = async () => {
    if (!isTimerRunning) {
      setIsTimerRunning(true);
      try {
        if (!timerInstance) {
          if (values.work_status === 'assigned') {
            await updateStopwatch(values).then(() => {
              fetchWorkTable();
            });
          } else {
            await updateStopwatch(values);
          }
          let startTime = Date.now() - elapsedTime * 1000;
          if (pauseTime) {
            startTime = Date.now() - (Date.now() - pauseTime);
          }

          const newTimerInstance = setInterval(() => {
            setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
          }, 1000);

          setTimerInstance(newTimerInstance);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handlePauseTimer = async () => {
    try {
      if (isTimerRunning) {
        setIsTimerRunning(false);

        if (timerInstance) {
          await updateStopwatchStop(values);
          clearInterval(timerInstance);
          setTimerInstance(null);

          // Save the pause datetime
          setPauseTime(Date.now());
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Add a cleanup function for clearing the interval when the component unmounts
  useEffect(() => {
    return () => {
      if (timerInstance) {
        clearInterval(timerInstance);
      }
    };
  }, [timerInstance]);

  // Calculate elapsed time in minutes and seconds

  return (
    <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
      {isTimerRunning ? (
        <>
          <Tooltip title="Pause">
            <IconButton color="secondary" onClick={handlePauseTimer}>
              <Pause />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>
          <Tooltip title="Start">
            <IconButton color="secondary" onClick={handleStartTimer} disabled={isTimerRunning}>
              <Start />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Stack>
  );
};

export default Stopwatch;
