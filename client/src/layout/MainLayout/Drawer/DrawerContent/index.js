import { useSelector } from 'react-redux';

// material-ui
import { useMediaQuery, useTheme } from '@mui/material';

// project import
import NavCard from './NavCard';
import Navigation from './Navigation';
import SimpleBar from 'components/third-party/SimpleBar';

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  const menu = useSelector((state) => state.menu);
  const { drawerOpen } = menu;

  return (
    <SimpleBar
      sx={{
        // width: '260px', 
        '& .simplebar-content': {
          color: '#333436',
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      <div></div>
      <Navigation />
      {/* {drawerOpen && !matchDownMD && <NavCard />} */}
    </SimpleBar>
  );
};

export default DrawerContent;
