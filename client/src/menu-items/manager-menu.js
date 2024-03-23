// third-party
import { FormattedMessage } from 'react-intl';
import App from 'components';
import { UserOutlined } from '@ant-design/icons';
import TimesheetIcon from 'assets/images/icons-menu/timesheet';

const icons = { UserOutlined: UserOutlined };
// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const other = {
  id: 'other',
  type: 'group',
  children: [
    {
      id: 'home',
      title: <FormattedMessage id="Home" />,
      type: 'item',
      url: '/home',
      icon: App.icons.iconsMui.HouseIcon
    },
    {
      id: 'task-planning',
      title: <FormattedMessage id="Task Planning" />,
      type: 'collapse',
      icon: App.icons.iconSvg.TaskplanIcon,
      children: [
        {
          id: 'person',
          title: <FormattedMessage id="Personal" />,
          url: 'taskplanning/personal',
          type: 'item'
        },
        {
          id: 'overall',
          title: <FormattedMessage id="Overall" />,
          url: 'taskplanning/overall',
          type: 'item'
        }
      ]
    },
    {
      id: 'timesheet',
      title: <FormattedMessage id="TimeSheet" />,
      url: '/timesheet',
      type: 'item',
      icon: App.icons.iconSvg.TimesheetIcon
    },
    {
      id: 'client',
      title: <FormattedMessage id="Client" />,
      type: 'item',
      url: '/client',
      icon: App.icons.iconSvg.ClientIcon
    },
    {
      id: 'project',
      title: <FormattedMessage id="Project" />,
      type: 'item',
      url: '/project',
      icon: App.icons.iconSvg.ProjectIcon
    },
    {
      id: 'calendar',
      title: <FormattedMessage id="Calendar" />,
      type: 'item',
      url: 'calendar',
      icon: App.icons.iconsMui.CalendarMonth
    },
    {
      id: 'report',
      title: <FormattedMessage id="Report" />,
      type: 'item',
      url: '/reports',
      icon: App.icons.iconSvg.ReportIcon
    }
  ]
};

export default other;
