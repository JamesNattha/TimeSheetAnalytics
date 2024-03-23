// third-party

import { FormattedMessage } from 'react-intl';
import App from 'components';
import { UserOutlined } from '@ant-design/icons';
// import { useRecoilState } from 'recoil';
// import { authRoleState } from 'recoil/index';

// icons
const icons = { UserOutlined: UserOutlined };

// ==============================|| MENU ITEMS - SUPPORT ||========== ==================== //
const OtherMenuItems = () => {
  // const [auth, setAuth] = useRecoilState(authRoleState);
  // console.log('auth in menu',auth)
  // const { apiLogout, user } = useAuth();

  // console.log('apiLogout', apiLogout);
  // console.log('user', user);

  // const isAdmin = user.role === 'admin';
  // const isManager = user.role === 'manager';

  return {
  id: 'other',
  type: 'group',
  children: [
    {
      id: 'workonhand',
      title: <FormattedMessage id="Work On Hand" />,
      type: 'item',
      url: '/workonhand',
      icon: App.icons.iconsAntd.AppstoreAddOutlined,
      permissions: ['employee', 'manager', 'admin']
    },
    // {
    //   id: 'workotohand',
    //   title: <FormattedMessage id="Work To Hand" />,
    //   type: 'item',
    //   url: '/worktohand',
    //   icon: App.icons.iconsAntd.AppstoreAddOutlined
    // },
    {
      id: 'timesheet',
      title: <FormattedMessage id="TimeSheet" />,
      type: 'item',
      url: '/timesheet',
      icon: App.icons.iconsAntd.FormOutlined,
      permissions: ['employee', 'manager', 'admin']
    },
    {
      id: 'reports',
      title: <FormattedMessage id="Report" />,
      type: 'item',
      url: '/reports',
      icon: App.icons.iconsAntd.ExceptionOutlined
    },
    {
      id: 'assign',
      title: <FormattedMessage id="Assign" />,
      type: 'item',
      url: '/assign',
      icon: App.icons.iconsAntd.SendOutlined,
      permissions: ['employee', 'manager', 'admin']
    },
    {
      id: 'workno',
      title: <FormattedMessage id="Work_No_Beta" />,
      type: 'item',
      url: '/workno',
      icon: App.icons.iconsAntd.FileWordOutlined,
      permissions: ['employee', 'manager', 'admin']
    },
    {
      id: 'none',
      title: <FormattedMessage id="None Page" />,
      type: 'item',
      url: '/none',
      icon: App.icons.iconsAntd.FileWordOutlined,
      permissions: ['employee', 'manager', 'admin']
    },
    {
      id: 'reportassign',
      title: <FormattedMessage id="Report Assign" />,
      type: 'item',
      url: '/reportassign',
      icon: App.icons.iconsAntd.AreaChartOutlined,
      permissions: ['employee', 'manager', 'admin']
    },
    {
      id: 'export',
      title: <FormattedMessage id="Export" />,
      type: 'item',
      url: '/export',
      icon: App.icons.iconsAntd.DownloadOutlined,
      permissions: ['employee', 'manager', 'admin']
    },
    {
      id: 'role',
      title: <FormattedMessage id="Role" />,
      type: 'item',
      url: '/role',
      icon: App.icons.iconsAntd.DownloadOutlined,
      permissions: ['admin']
    },
    {
      id: 'user-list',
      title: <FormattedMessage id="user-list" />,
      type: 'item',
      url: '/user-list',
      icon: icons.UserOutlined,
      permissions: ['employee', 'manager', 'admin']
    },
    {
      id: 'user-card',
      title: <FormattedMessage id="user-card" />,
      type: 'item',
      url: '/user-card',
      icon: icons.UserOutlined,
      permissions: ['employee', 'manager', 'admin']
    },
    {
      id: 'customer-list',
      title: <FormattedMessage id="Work No" />,
      type: 'item',
      url: '/customer-list',
      icon: icons.UserOutlined,
      permissions: ['employee', 'manager', 'admin']
    },
    {
      id: 'userrole',
      title: <FormattedMessage id="Role" />,
      type: 'item',
      url: '/userrole',
      icon: App.icons.iconsAntd.DownloadOutlined,
      permissions: ['manager', 'admin']
    },
    {
      id: 'reporttimesheet',
      title: <FormattedMessage id="TimeSheet Report" />,
      type: 'item',
      url: '/reporttimesheet',
      icon: App.icons.iconsAntd.DownloadOutlined,
      permissions: ['manager', 'admin']
    },
    {
      id: 'workreport',
      title: <FormattedMessage id="Work Report" />,
      type: 'item',
      url: '/workreport',
      icon: App.icons.iconsAntd.AreaChartOutlined,
      permissions: ['manager', 'admin']
    },
  ]
};
}

export default OtherMenuItems;