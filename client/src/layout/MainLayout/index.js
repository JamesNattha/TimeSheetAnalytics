import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRecoilState } from 'recoil';
import { roleState } from '../../recoil';

// material-ui
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Box, Container, Toolbar } from '@mui/material';

// project import
import Drawer from './Drawer';
import Header from './Header';
import Footer from './Footer';

import useConfig from 'hooks/useConfig';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import { openDrawer } from 'store/reducers/menu';

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down('xl'));
  const { container, miniDrawer } = useConfig();
  const dispatch = useDispatch();
  const [auth,setAuth] = useRecoilState(roleState);
  const [navigation, setNavigation] = useState(null);

  const menu = useSelector((state) => state.menu);
  const { drawerOpen } = menu;


  useEffect(() => {
    let navigationModule = null;
    if (!auth || !auth.role) {
      navigationModule = import('menu-items');
    } else if (auth.role === 'admin') {
      navigationModule = import('menu-items/index-admin');
    } else if (auth.role === 'manager') {
      navigationModule = import('menu-items/index-manager');
    } else if (auth.role === 'employee') {
      navigationModule = import('menu-items/index-employee');
    } else if (auth.role === 'management') {
      navigationModule = import('menu-items/index-management');
    }else if (auth.role === 'super_admin') {
      navigationModule = import('menu-items/index-super');
    }

    if (navigationModule) {
      navigationModule
        .then((module) => {
          // Use the loaded navigation module here
          const navigation = module.default;
          setNavigation(navigation);
        })
        .catch((error) => {
          // Handle any error that occurs during dynamic import
          console.error('Error loading navigation module:', error);
        });
    }
  }, [auth]);

  // drawer toggler
  const [open, setOpen] = useState(!miniDrawer || drawerOpen);
  const handleDrawerToggle = () => {
    setOpen(!open);
    dispatch(openDrawer({ drawerOpen: !open }));
  };

  // set media wise responsive drawer
  useEffect(() => {
    if (!miniDrawer) {
      setOpen(!matchDownLG);
      dispatch(openDrawer({ drawerOpen: !matchDownLG }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownLG]);

  useEffect(() => {
    if (open !== drawerOpen) setOpen(drawerOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerOpen]);


  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header open={open} handleDrawerToggle={handleDrawerToggle} />
      <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
      <Box component="main" sx={{ width: 'calc(100% - 260px)', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Toolbar />
        {container && (
          <Container
            maxWidth="xl"
            sx={{ px: { xs: 0, sm: 2 }, position: 'relative', minHeight: 'calc(100vh - 110px)', display: 'flex', flexDirection: 'column' }}
          >
            <Breadcrumbs navigation={navigation} title titleBottom card={false} divider={false} />
            <Outlet />
            <Footer />
          </Container>
        )}
        {!container && (
          <Box sx={{ position: 'relative', minHeight: 'calc(100vh - 110px)', display: 'flex', flexDirection: 'column' }}>
            <Breadcrumbs navigation={navigation} title titleBottom card={false} divider={false} />
            <Outlet />
            <Footer />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MainLayout;
