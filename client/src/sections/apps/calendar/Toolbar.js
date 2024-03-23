import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useMediaQuery, Button, ButtonGroup, Grid, Stack, Tooltip, Typography } from '@mui/material';

// third-party
import { format } from 'date-fns';

// project import
import IconButton from 'components/@extended/IconButton';

// assets
import { AppstoreOutlined, LayoutOutlined, LeftOutlined, OrderedListOutlined, PicCenterOutlined, RightOutlined } from '@ant-design/icons';

import WeekIcon from 'assets/images/icon-calendar/WeekIcon';
import MonthIcon from 'assets/images/icon-calendar/MonthIcon';
import DayIcon from 'assets/images/icon-calendar/DayIcon';
import AgendaIcon from 'assets/images/icon-calendar/AgendaIcon';
import TrackIcon from 'assets/images/icon-calendar/TrackIcon';

// constant
const viewOptions = [
  {
    label: 'Month',
    value: 'dayGridMonth',
    icon: MonthIcon
  },
  {
    label: 'Week',
    value: 'timeGridWeek',
    icon: WeekIcon
  },
  {
    label: 'Day',
    value: 'timeGridDay',
    icon: DayIcon
  },
  {
    label: 'Agenda',
    value: 'listMonth',
    icon: AgendaIcon
  }
];

// ==============================|| CALENDAR - TOOLBAR ||============================== //

const Toolbar = ({ date, view, onClickNext, onClickPrev, onClickToday, onChangeView, ...others }) => {
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const [viewFilter, setViewFilter] = useState(viewOptions);

  useEffect(() => {
    if (matchDownSM) {
      const filter = viewOptions.filter((item) => item.value !== 'dayGridMonth' && item.value !== 'timeGridWeek');
      setViewFilter(filter);
    } else {
      setViewFilter(viewOptions);
    }
  }, [matchDownSM]);

  return (
    <Grid alignItems="center" container justifyContent="space-between" spacing={matchDownSM ? 1 : 3} {...others} sx={{ pb: 3 }}>
      <Grid item>
        <Button
          variant="outlined"
          onClick={onClickToday}
          size={matchDownSM ? 'small' : 'medium'}
          sx={{
            borderRadius: '40px',
            height: '48px',
            my: '24px',
            borderColor: '#393939',
            color: '#393939',
            '&:hover': {
              borderColor: '#393939', // Background color when hovering
              color: '#393939'
            }
          }}
        >
          <TrackIcon /> Today
        </Button>
      </Grid>
      <Grid item>
        <Stack direction="row" alignItems="center" spacing={matchDownSM ? 1 : 3}>
          <IconButton
            onClick={onClickPrev}
            size={matchDownSM ? 'small' : 'large'}
            sx={{
              borderRadius: '40px',
              '&:not(:hover)': {
                bgcolor: '#393939' // Background color when not hovering
              },
              '&:hover': {
                bgcolor: '#393939' // Background color when hovering
              }
            }}
          >
            <LeftOutlined style={{ color: '#ffffff' }} />
          </IconButton>
          <Typography variant={matchDownSM ? 'h5' : 'h3'} color="textPrimary">
            {format(date, 'MMMM yyyy')}
          </Typography>
          <IconButton
            onClick={onClickNext}
            size={matchDownSM ? 'small' : 'large'}
            sx={{
              borderRadius: '40px',
              '&:not(:hover)': {
                bgcolor: '#393939' // Background color when not hovering
              },
              '&:hover': {
                bgcolor: '#393939' // Background color when hovering
              }
            }}
          >
            <RightOutlined style={{ color: '#ffffff' }} />
          </IconButton>
        </Stack>
      </Grid>
      <Grid item>
        {/* <ButtonGroup variant="outlined" aria-label="outlined button group"> */}
        {viewFilter.map((viewOption) => {
          const Icon = viewOption.icon;
          return (
            <Tooltip title={viewOption.label} key={viewOption.value}>
              <IconButton
                size={matchDownSM ? 'small' : 'large'}
                // disableElevation
                spacing={10}
                variant={viewOption.value === view ? 'contained' : 'text'}
                onClick={() => onChangeView(viewOption.value)}
                sx={{
                  '& svg path': {
                    fill: viewOption.value === view ? '#ffffff' : '#393939'
                  },
                  // minWidth: '40px',
                  padding: '8px',
                  // margin: '0 10px 0 0',
                  borderRadius: '40px',
                  bgcolor: viewOption.value === view ? '#393939' : 'transparent',
                  '&:hover': {
                    '& svg path': {
                      fill: '#ffffff'
                    },
                    bgcolor: '#393939' // Background color when hovering
                  }
                }}
              >
                <Icon style={{ fontSize: '1.3rem' }} />
              </IconButton>
            </Tooltip>
          );
        })}
        {/* </ButtonGroup> */}
      </Grid>
    </Grid>
  );
};

Toolbar.propTypes = {
  date: PropTypes.object,
  view: PropTypes.string,
  onClickNext: PropTypes.func,
  onClickPrev: PropTypes.func,
  onClickToday: PropTypes.func,
  onChangeView: PropTypes.func
};

export default Toolbar;
