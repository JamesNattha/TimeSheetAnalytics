// third-party
import { FormattedMessage } from 'react-intl';
import App from 'components';
import { UserOutlined } from '@ant-design/icons';

const icons = { UserOutlined: UserOutlined };
// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const other = {
  id: 'other',
  type: 'group',
  children: [
    {
      id: 'task-planning',
      title: <FormattedMessage id="Task Planning" />,
      type: 'collapse',
      url: '/work-on-hand',
      icon: App.icons.iconsAntd.AppstoreAddOutlined,
      children: [
        {
          id: 'work-on-hand',
          title: <FormattedMessage id="Work On Hand" />,
          type: 'item',
          url: '/work-on-hand',
          icon: icons.UserOutlined
        },
        {
          id: 'timesheet',
          title: <FormattedMessage id="TimeSheet" />,
          type: 'item',
          url: '/timesheet',
          icon: App.icons.iconsAntd.FormOutlined,
        },
      ]
    },
    {
      id: 'report',
      title: <FormattedMessage id="Report" />,
      type: 'collapse',
      url: '/work-on-hand',
      icon: icons.UserOutlined,
      children: [
        {
          id: 'list',
          title: <FormattedMessage id="List" />,
          type: 'item',
          icon: App.icons.iconsAntd.ExceptionOutlined
        },
        {
          id: 'dashboard',
          title: <FormattedMessage id="Dashboard" />,
          type: 'item',
          icon: App.icons.iconsAntd.AreaChartOutlined,
        },
      ]
    },
    {
      id: 'setting',
      title: <FormattedMessage id="Setting" />,
      type: 'collapse',
      icon: App.icons.iconsAntd.SettingOutlined,
      children: [
        {
          id: 'role',
          title: <FormattedMessage id="Role (Invite Register)" />,
          type: 'item',
          url: '/role-invite-register',
          icon: App.icons.iconsAntd.SettingOutlined
        },
        {
          id: 'team',
          title: <FormattedMessage id="Team" />,
          type: 'item',
          url: 'team/department',
          icon: App.icons.iconsAntd.UsergroupAddOutlined,
        },
        {
          id: 'company',
          title: <FormattedMessage id="Company" />,
          type: 'item',
          url: '/company/departments',
          icon: App.icons.iconsMui.BusinessIcon
        },
        {
          id: 'calendar',
          title: <FormattedMessage id="Calendar" />,
          type: 'item',
          url: 'calendar',
          icon: App.icons.iconsAntd.CalendarOutlined,
        },
      ]
    }
  ]
};

export default other;
