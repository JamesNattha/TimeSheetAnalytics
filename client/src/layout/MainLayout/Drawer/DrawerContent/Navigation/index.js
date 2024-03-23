import { useSelector } from 'react-redux';
import { useRecoilState } from 'recoil';
import { roleState } from '../../../../../recoil';

// material-ui
import { Box, Typography } from '@mui/material';

// project import
import NavGroup from './NavGroup';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
  const menu = useSelector((state) => state.menu);
  const [auth, setAuth] = useRecoilState(roleState);
  const { drawerOpen } = menu;

  let menuItems = null;

  if (!auth || !auth.role) {
    menuItems = require('menu-items/index').default;
  } else if (auth.role === 'admin') {
    menuItems = require('menu-items/index-admin').default;
  } else if (auth.role === 'manager') {
    menuItems = require('menu-items/index-manager').default;
  } else if (auth.role === 'employee') {
    menuItems = require('menu-items/index-employee').default;
  } else if (auth.role === 'management') {
    menuItems = require('menu-items/index-management').default;
  }else if (auth.role === 'super_admin') {
    menuItems = require('menu-items/index-super').default;
  }

  const navGroups = menuItems && menuItems.items ? menuItems.items.map((item) => <NavGroup key={item.id} item={item} />) : null;

  return <Box sx={{pt: drawerOpen ? 2 : 0, '& > ul:first-of-type': { mt: 0 } }}>{navGroups}</Box>;
};
export default Navigation;
